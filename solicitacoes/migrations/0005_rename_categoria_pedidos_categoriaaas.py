# Generated by Django 4.2.1 on 2023-06-20 13:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('solicitacoes', '0004_remove_pedidos_categoria_pedidos_categoria'),
    ]

    operations = [
        migrations.RenameField(
            model_name='pedidos',
            old_name='categoria',
            new_name='categoriaaas',
        ),
    ]
