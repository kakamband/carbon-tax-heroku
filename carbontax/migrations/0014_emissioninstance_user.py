# Generated by Django 3.0.5 on 2020-05-15 21:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('carbontax', '0013_remove_emissioninstance_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='emissioninstance',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL),
        ),
    ]
