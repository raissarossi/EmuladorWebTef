from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django import forms
from multiupload.fields import MultiFileField
# from multiupload.utils import handle_upload


# Create your models here.

# ======================================== Criação do user ========================================

class UserBoschManager(BaseUserManager):
    def create_user(self, bosch_user, password, **extra_fields):

        user = self.model(bosch_user=bosch_user, **extra_fields)
        """
        *cria a senha

        *manda por email
        """
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, bosch_user, password, **extra_fields):

        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))
        return self.create_user(bosch_user, password, **extra_fields)
    
class UserBosch(AbstractUser):
    # username define o login, no caso como não sera utilizado o padrao ele é desativado
    username = None

    # bosch_user sera definido como o novo login, por isso ele precisa ser unique=True
    bosch_user = models.CharField(max_length=6, unique=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    justificativa = models.CharField(max_length=250)

    # para evitar erros esses 3 parametros são inicializados aqui mesmo
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    date_joined = models.DateTimeField(default=timezone.now)

    # define o username do login como bosch_user, precisa estar entre aspas
    USERNAME_FIELD = "bosch_user"
    # todos os campos que serão necessarios para criar um usuario deve ser colocado aqui
    REQUIRED_FIELDS = ['name', 'email', 'justificativa']

    # para criar o usuario, sera utilizado esse manager, qualquer tratamento pode ser feito dentro dele, e recusar ou aceitar a criação
    objects = UserBoschManager()

    # quando for usado como fk retornara o bosch_user e não um objeto com nome generico
    def __str__(self):
        return self.bosch_user
    
# ======================================== Criação da solicitação ========================================


class Setor(models.Model):
    nome_setor = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return self.nome_setor

class TipoDebito(models.Model):
    nome_tipo_debito = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.nome_tipo_debito

class LocalDebito(models.Model):
    nome_local_debito = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.nome_local_debito

class Categoria(models.Model):
    nome_categoria = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return self.nome_categoria
    
class TipoServico(models.Model):
    nome_tipo_servico = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return self.nome_tipo_servico

# Files são salvos como um só, porem pedidos recebe uma lista de files, os arquivos chegam junto com a solicitação e é criado um dado no banco para cada arquivo,
#           esses dados são enviados posteriormente para anexo_desenho do Pedido
class Files(models.Model):
    anexo = models.FileField(upload_to='media')
    def __str__(self):
        return str(self.anexo)

class Pedidos(models.Model):

    user = models.ForeignKey(UserBosch, on_delete=models.CASCADE)
    setor = models.ForeignKey(Setor, on_delete=models.CASCADE)
    ramal = models.CharField(max_length=10)
    data = models.DateField(auto_now_add=True)
    local_debito_tipo = models.ForeignKey(LocalDebito, on_delete=models.CASCADE)
    local_debito_numero = models.IntegerField()
    tipo_debito = models.ForeignKey(TipoDebito, on_delete=models.CASCADE)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    tipo_de_servico = models.ForeignKey(TipoServico, on_delete=models.CASCADE)
    prazo_pretendido = models.DateField()
    descricao = models.TextField()
    n_desenho = models.CharField(max_length=10)
    grupo = models.CharField(max_length=10, blank=True)
    anexo_desenho = models.ManyToManyField(Files)
    solicitacao_semelhante = models.BooleanField(default=False)
    n_solicitacao_executada = models.IntegerField(null=True, blank=True)
    
    # não deixa criar uma solicitação se essas informações forem conflitantes
    def clean(self):
        if self.solicitacao_semelhante and self.n_solicitacao_executada is None:
            raise ValidationError("O numero da solicitação deve ser preenchido se existe uma semelhante")
    
    def __str__(self):
        return str(self.id)
    

