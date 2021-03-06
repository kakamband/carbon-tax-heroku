# Generated by Django 3.0.5 on 2020-04-22 18:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='EconomyMetric',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='EmissionInstance',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, null=True)),
                ('date', models.DateField(null=True)),
                ('travel_mode', models.CharField(max_length=30, null=True)),
                ('distance', models.FloatField(null=True)),
                ('co2_output_kg', models.FloatField(null=True)),
                ('price', models.FloatField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='FuelType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, unique=True)),
                ('unit', models.CharField(max_length=30)),
                ('co2_per_unit', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('location', models.CharField(blank=True, max_length=30)),
                ('date_of_birth', models.DateField(blank=True, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Vehicle',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('economy', models.FloatField()),
                ('economy_metric', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='carbontax.EconomyMetric')),
                ('fuel', models.ForeignKey(help_text='Select a fuel type for this vehicle.', on_delete=django.db.models.deletion.CASCADE, to='carbontax.FuelType')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='carbontax.Profile')),
            ],
        ),
    ]
