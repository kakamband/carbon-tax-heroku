# Generated by Django 3.0.5 on 2020-05-31 20:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('carbontax', '0031_taxrate_isdefault'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='emissioninstance',
            options={'ordering': ['-date', 'id']},
        ),
    ]
