# Generated by Django 5.0.2 on 2024-03-27 20:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_remove_order_product_order_products'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='recepitID',
        ),
    ]