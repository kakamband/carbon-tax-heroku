# Generated by Django 3.0.5 on 2020-05-12 19:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('carbontax', '0007_auto_20200511_1904'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='location',
            field=models.CharField(blank=True, max_length=60),
        ),
        migrations.AlterField(
            model_name='vehicle',
            name='fuel',
            field=models.CharField(max_length=30),
        ),
    ]
