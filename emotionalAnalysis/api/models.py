from django.db import models
# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    price = models.FloatField(default=0.0)
    stock = models.IntegerField(default = 0)
    totalEmotion = models.CharField(max_length=255, blank=True, null=True)

    def getReviews(self):
        return self.review_set.all()

class User(models.Model):
    Fname = models.CharField(max_length=255)
    Lname = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)

class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.CharField(max_length=255)
    emotion = models.CharField(max_length=255, null = True, blank = True)
