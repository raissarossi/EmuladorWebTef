# Generated by Django 4.2.1 on 2023-07-07 11:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('solicitacoes', '0015_remove_files_anexo'),
    ]

    operations = [
        migrations.AddField(
            model_name='files',
            name='anexo',
            field=models.FileField(default=0, upload_to='media'),
            preserve_default=False,
        ),
    ]