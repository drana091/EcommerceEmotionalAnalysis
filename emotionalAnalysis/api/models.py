from django.db import models

# Create your models here.

class Product(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    price = models.FloatField(default=0.0)
    stock = models.IntegerField()
    total_emotion = models.CharField(max_length=255, blank=True, null=True)

class User(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)

class Review(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # Adding choices for rating field
    RATING_CHOICES = [
        (1, '1 Star'),
        (2, '2 Stars'),
        (3, '3 Stars'),
        (4, '4 Stars'),
        (5, '5 Stars'),
    ]
    rating = models.IntegerField(choices=RATING_CHOICES)
    comment = models.CharField(max_length=255)
    emotion = models.CharField(max_length=255)
