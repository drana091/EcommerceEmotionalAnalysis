# Generated by Django 5.0.2 on 2024-03-19 21:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_rename_total_emotion_product_totalemotion'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='name',
            new_name='Fname',
        ),
        migrations.RemoveField(
            model_name='user',
            name='address',
        ),
        migrations.RemoveField(
            model_name='user',
            name='phone',
        ),
        migrations.AddField(
            model_name='user',
            name='Lname',
            field=models.CharField(default='djf', max_length=255),
            preserve_default=False,
        ),
    ]