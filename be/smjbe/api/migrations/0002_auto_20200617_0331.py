# Generated by Django 3.0.7 on 2020-06-17 03:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projects',
            name='name',
            field=models.CharField(max_length=20),
        ),
    ]
