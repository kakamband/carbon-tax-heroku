# Generated by Django 3.0.5 on 2020-05-25 21:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('carbontax', '0023_auto_20200525_2146'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='taxrate',
            options={'ordering': ['category', 'id']},
        ),
    ]
