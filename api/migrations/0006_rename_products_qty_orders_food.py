# Generated by Django 4.1.2 on 2022-11-24 18:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_orders'),
    ]

    operations = [
        migrations.RenameField(
            model_name='orders',
            old_name='products_qty',
            new_name='food',
        ),
    ]
