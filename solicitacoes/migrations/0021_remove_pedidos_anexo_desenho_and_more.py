# Generated by Django 4.2.1 on 2023-07-18 11:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('solicitacoes', '0020_alter_pedidos_n_solicitacao_executada'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pedidos',
            name='anexo_desenho',
        ),
        migrations.RemoveField(
            model_name='pedidos',
            name='categoria',
        ),
        migrations.RemoveField(
            model_name='pedidos',
            name='local_debito_tipo',
        ),
        migrations.RemoveField(
            model_name='pedidos',
            name='setor',
        ),
        migrations.RemoveField(
            model_name='pedidos',
            name='tipo_de_servico',
        ),
        migrations.RemoveField(
            model_name='pedidos',
            name='tipo_debito',
        ),
        migrations.RemoveField(
            model_name='pedidos',
            name='user',
        ),
        migrations.DeleteModel(
            name='Files',
        ),
        migrations.DeleteModel(
            name='Pedidos',
        ),
    ]
