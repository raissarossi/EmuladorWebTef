# Generated by Django 4.2.1 on 2023-07-11 16:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('solicitacoes', '0017_alter_pedidos_grupo'),
    ]

    operations = [
        migrations.AddField(
            model_name='userbosch',
            name='justificativa',
            field=models.CharField(default=0, max_length=250),
            preserve_default=False,
        ),
    ]
