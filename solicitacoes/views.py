from django.shortcuts import render
from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser, BasePermission
from rest_framework_simplejwt.tokens import AccessToken
from . import pyxl, send_emails
from django.http import HttpResponseBadRequest
import json
import threading
import time
import os
from shutil import copyfile
from django.conf import settings
from django.shortcuts import  get_object_or_404
import sys

with open("configs.txt", "r", encoding="utf-8") as read:
        configs = json.load(read)
DATABASE = configs['DATABASE']
PASTA_MODELO = configs['PASTA_MODELO']
PASTA_DESTINO = configs['PASTA_DESTINO']

thread_list = []

# este codigo é uma thread recursiva, ela roda em paralelo verificando a thread_list
def list_to_excel():
    while True:
        try:
            databaseName = PASTA_DESTINO.split("\\")[len(PASTA_DESTINO.split("\\"))-1]
            path = PASTA_DESTINO.replace(databaseName, "")+"API-RODANDO.txt"
            
            if (len(thread_list) > 0):
                # enquanto a api esta colocando dados no banco ele acessa o caminho do banco e cria um arquivo vazio com o nome de API-RODANDO.txt
                with open(path,"+a") as create:
                    create.write("")
            else:
                # quando a api parar ele exclui o arquivo .txt se ele existir
                if os.path.isfile(path):
                    os.remove(path)
                else:
                    pass

            dados = thread_list[0]
            # se ele existir ele continua
            # chama uma funão do arquivo pyxl com os dados para adicionar na base de dados excel e retorna o id criado pela planilha
            id = pyxl.send_with_django(dados)
            try:
                # se o id existir continua
                print('entrou')
                if id == -1:
                    pass
                else:
                    # pega a pasta modelo para verificar o ano atual
                    nomes = os.listdir(PASTA_MODELO)
                    for i in nomes:
                        if i.__contains__("MODELO") and i.__contains__("-"):
                            pastaAnoAtual = i
                    
                    idAno = str(id)+pastaAnoAtual[pastaAnoAtual.find("-"):pastaAnoAtual.find(" ")]
                    
                    pasta_destino = PASTA_DESTINO+"\\"+idAno+"\\desenho"
                    # pega individualmente cada um dos arquivos criados na solicitação e manda para a copia, dentro da pasta desenho
                    for i in dados["files"]:
                        file = Files.objects.get(id= i)

                        caminho_arquivo = "media/"+str(file.anexo)
                        nome_arquivo = os.path.basename(caminho_arquivo)
                        original = os.path.join(settings.MEDIA_ROOT+settings.MEDIA_URL.replace("/","\\")+str(file.anexo).replace("/","\\"))
                        caminho_destino = os.path.join(pasta_destino, nome_arquivo)
                        copyfile(caminho_arquivo, caminho_destino)
                        # ao final deleta o arquivo do banco para que não ocupar espaço e para não alterar o nome de futuros arquivos
                        delet = Files.objects.get(id=file.id)
                        delet.delete()

                        if os.path.isfile(original):
                            os.remove(original)
                        
                    # manda um email de confirmação que a solicitação foi enviada
                    send_emails.confirmation(dados['email'], dados)
                    thread_list.pop(0)
                
            except Exception as e:
                pass
                # print(e)
        
        except Exception as e:
            pass
            
        time.sleep(2)
    # apos 2 segundos chama a thread novamente
    

# # instancia e define a thread
excel_thread = threading.Thread(target=list_to_excel)
excel_thread.start()


# pega o id da pessoa que esta logada pelo token
def get_id(request):
    token = request.META.get('HTTP_AUTHORIZATION', '').split(' ')[1]

    remetente = AccessToken(token)
    contaRemetenteId = remetente['user_id']
    return contaRemetenteId

# permissão customizada, se a pessoa estiver logada e querer apenas ver o conteudo ela tem acesso, se não apenas se for admin
class UserOnlyReadPermission(BasePermission):
    def has_permission(self, request, view):
        if view.action == 'list':
            return request.user.is_authenticated
        else:
            return request.user.is_superuser

# rota para criar uma senha nova se foi esquecida
class UserForgetPassword(viewsets.ModelViewSet):
    queryset = UserBosch.objects.all()
    serializer_class = ResetPasswordSerializer
    
    def patch(self, request, *args, **kwargs):

        # tenta encontrar o usuario conforme os dados passados no formulario, se o email e o usuario existirem e pertencerem ao mesmo usuario ele continua
        get_object_or_404(UserBosch, bosch_user=request.data['bosch_user'], email=request.data['email'])
        user = UserBosch.objects.get(bosch_user=request.data['bosch_user'], email=request.data['email'])
        
        if user is None:
            # se o usuario não existir volta erro 404
            return Response({"error":"Esse usuario nao existe"}, 404)
        
        # gera uma senha aleatoria com 10 caracteres
        password = UserBosch.objects.make_random_password(length=10)
        
        # salva a nova senha
        user.set_password(password)
        user.save()

        # envia a senha para o usuario em seu email
        send_emails.reset_password(user.email, password)

        # retorna o usuario como resposta
        return Response(UsersActivateSerializer(user).data)
    
    
# rota para ativar usuario
class UsersActivate(viewsets.ModelViewSet):
    permission_classes = (IsAdminUser,)
    queryset = UserBosch.objects.all()
    serializer_class = UsersActivateSerializer
    
    def update(self, request, *args, **kwargs):
        user = UserBosch.objects.get(id=get_id(request))

         # se for o proprio usuario tentando alterar suas informações ele não permite
        if (user.id == int(self.kwargs['pk'])):
            print('não pode')
            return Response({"error":"o usuario não pode alterar essas informações"}, 400)

        # essa rota é utilizada para alterar tanto o is_active quanto o is_superuser entao se is_active não for mandado ele apenas ignora
        try:
            if request.data['is_active']:
                user = UserBosch.objects.get(id=self.kwargs['pk'])
                password = UserBosch.objects.make_random_password(length=10)
                # apenas apos a contar ser ativada é enviada a senha por email
                send_emails.send_password(user.email, password)
                
                user.set_password(password)
                user.save()
        except Exception as e:
            pass
        return super().update(request, *args, **kwargs)
    
    def list(self, request, *args, **kwargs):
        # retorna os dados do list separando por is_active e is_superuser, ira ser mostrado nessa ordem inativos, admins, e usuarios normal
        id_user = get_id(request)
        usuarios = UserBosch.objects.all().order_by("is_active","-is_superuser")
        return Response(UsersActivateSerializer(usuarios,many=True).data)
    
    def destroy(self, request, *args, **kwargs):
        # deleta um usuario, um usuario não pode deletar a si proprio
        user = UserBosch.objects.get(id=get_id(request))
        if (user.id == int(self.kwargs['pk'])):
            print('não pode')
            return Response({"error":"o usuario não pode alterar essas informações"}, 403)
        else:
            return super().destroy(request, *args, **kwargs)
    

class FilesListarDetalhar(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Files.objects.all()
    serializer_class=FilesSerializer

class PedidosListarDetalhar(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Pedidos.objects.all()
    serializer_class=PedidosSerializer

    def create(self, request, *args, **kwargs):
        _mutable = request.POST._mutable
        """
        user, setor, ramal, data, local_debito_tipo, local_debito_numero, tipo_debito, 

        categoria, tipo_de_servico, prazo_pretendido, 

        descricao, n_desenho, grupo, solicitacao_semelhante, n_solicitacao_executada, 

        bloco_k, nome_do_projeto, blank_area
        """
        id = get_id(request)
        user = UserBosch.objects.get(id = id)
        
        try:
            # tenta ver se existe um arquivos, se houver continua, se não houver retorna erro
            anexos = request.FILES.getlist('anexos[]')
        except:
            return Response({"ERROR":"Deve existir ao menos 1 desenho anexado"},401)

        idList = []
        for file in anexos:
            # cria um dado no banco para cada anexo, e retorna o id dele em uma lista
            idList.append(Files.objects.create(anexo=file).id)

        # pega os dados individuais de cada um dos valores para colocar em dados
        setor = Setor.objects.get(id = request.data['setor'])
        local_debito_tipo = LocalDebito.objects.get(id = request.data['local_debito_tipo'])
        tipo_debito = TipoDebito.objects.get(id = request.data['tipo_debito'])
        categoria = Categoria.objects.get(id = request.data['categoria'])
        tipo_de_servico = TipoServico.objects.get(id = request.data['tipo_de_servico'])
        
        # tratamento de dados
        # print(request.data['n_solicitacao_executada'].strip() == '-')
        if request.data['n_solicitacao_executada'].strip() == '-':
            solicitacao = 'NA'
            semelhante = 'Não'
        else:
            solicitacao = request.data['n_solicitacao_executada']
            semelhante = 'Sim'
        # print(request.data['grupo'] == '')
        # print(request.data['grupo'])
        if request.data['grupo'].strip() == '':
            grupo = request.data['grupo']
        else:
            grupo = 'NA'

        if request.data['ramal'].strip() == "":
            ramal = '-'
        else:
            ramal = request.data['ramal']

        if request.data['local_debito_numero'].strip() == '':
            numero_debito = '-'
        else:
            numero_debito = request.data['local_debito_numero']

        if request.data['n_desenho'].strip() == "":
            numero_desenho = 'NA'
        else:
            numero_desenho = request.data['n_desenho']
        # set to mutable
        
        request.POST._mutable = True

        request.data['user'] = user.id
        request.data['data'] = timezone.datetime.now().date()

        formatedTime = timezone.datetime.strptime(request.data['prazo_pretendido'], '%Y-%m-%d')
        formatedTime = formatedTime.strftime("%d/%m/%Y")

        request.POST._mutable = False
        request.POST._mutable = _mutable
        fkFiles = 1
        listaDeFiles = [fkFiles]
        
        
        dados = {
            "user": user.bosch_user ,
            "setor": setor.nome_setor ,
            "ramal": ramal,
            "data": request.data['data'] ,
            "local_debito_tipo": local_debito_tipo.nome_local_debito,
            "local_debito_numero": numero_debito,
            "tipo_debito": tipo_debito.nome_tipo_debito,
            "categoria": categoria.nome_categoria ,
            "tipo_de_servico": tipo_de_servico.nome_tipo_servico,
            "prazo_pretendido": formatedTime ,
            "descricao": request.data['descricao'] ,
            "n_desenho": numero_desenho,
            "grupo": grupo ,
            "solicitacao_semelhante": semelhante ,
            "n_solicitacao_executada": solicitacao ,
            "files":idList,
            "email":user.email,
            }
        print(dados)

        # adiciona na lista global que a thread esta monitorando
        thread_list.append(dados)

        

        return Response({"success":"files was send to list"},200)
    
class UserBoschActivate(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAdminUser,)
    queryset = UserBosch.objects.all()
    serializer_class=UserBoschSerializer

class SetorListarDetalhar(viewsets.ModelViewSet):
    permission_classes = ( UserOnlyReadPermission,)
    queryset = Setor.objects.all()
    serializer_class=SetorSerializer

class TipoDebitoListarDetalhar(viewsets.ModelViewSet):
    permission_classes = (UserOnlyReadPermission,)
    queryset = TipoDebito.objects.all()
    serializer_class=TipoDebitoSerializer

class LocalDebitoListarDetalhar(viewsets.ModelViewSet):
    permission_classes = (UserOnlyReadPermission,)
    queryset = LocalDebito.objects.all()
    serializer_class=LocalDebitoSerializer

class CategoriaListarDetalhar(viewsets.ModelViewSet):
    permission_classes = (UserOnlyReadPermission,)
    queryset = Categoria.objects.all()
    serializer_class=CategoriaSerializer

class TipoServicoListarDetalhar(viewsets.ModelViewSet):
    permission_classes = (UserOnlyReadPermission,)
    queryset = TipoServico.objects.all()
    serializer_class=TipoServicoSerializer


# Create your views here.
