# Generated by Django 4.2.1 on 2023-06-22 13:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('solicitacoes', '0010_remove_pedidos_blank_area_remove_pedidos_bloco_k_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pedidos',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]