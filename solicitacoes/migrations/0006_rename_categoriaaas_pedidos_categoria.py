# Generated by Django 4.2.1 on 2023-06-20 13:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('solicitacoes', '0005_rename_categoria_pedidos_categoriaaas'),
    ]

    operations = [
        migrations.RenameField(
            model_name='pedidos',
            old_name='categoriaaas',
            new_name='categoria',
        ),
    ]
