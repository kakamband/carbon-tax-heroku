# Generated by Django 3.0.5 on 2020-06-27 19:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('carbontax', '0045_auto_20200627_1926'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='emissioninstance',
            name='tax_type',
        ),
    ]
