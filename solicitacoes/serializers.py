from django.urls import path, include
from django.contrib.auth.models import User
from .models import *
from rest_framework import routers, serializers, viewsets

class FilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Files
        fields = ['id', 'anexo']

class PedidosSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Pedidos
        fields = [
            'id',
            'user',
            'setor',
            'ramal',
            'data',
            'local_debito_tipo',
            'local_debito_numero',
            'tipo_debito',
            'categoria',
            'tipo_de_servico',
            'prazo_pretendido',
            'descricao',
            'n_desenho',
            'grupo',
            'anexo_desenho',
            'solicitacao_semelhante',
            'n_solicitacao_executada'
        ]

class UserBoschSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserBosch
        fields = ['id', 'bosch_user', 'name', 'email', 'justificativa', 'is_active', 'is_staff', 'is_superuser']
class ResetPasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserBosch
        fields = ['id', 'bosch_user','email']

class UsersActivateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserBosch
        fields = ['id', 'bosch_user', 'name', 'email', 'justificativa', 'is_active', 'is_staff', 'is_superuser']
        
class SetorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Setor
        fields = ['id','nome_setor']

class TipoDebitoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoDebito
        fields = ['id','nome_tipo_debito']

class LocalDebitoSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocalDebito
        fields = ['id','nome_local_debito']

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id','nome_categoria']

class TipoServicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoServico
        fields = ['id','nome_tipo_servico']