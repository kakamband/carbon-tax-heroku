# Generated by Django 3.0.5 on 2020-05-28 17:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('carbontax', '0027_auto_20200528_1700'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='emissioninstance',
            options={'ordering': ['-date', 'travel_mode']},
        ),
    ]
