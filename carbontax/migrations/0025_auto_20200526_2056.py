# Generated by Django 3.0.5 on 2020-05-26 20:56

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('carbontax', '0024_auto_20200525_2147'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='taxrate',
            unique_together={('name', 'user')},
        ),
    ]