from django.db import models
import os
# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    price = models.FloatField(default=0.0)
    stock = models.IntegerField(default = 0)
    totalEmotion = models.CharField(max_length=255, blank=True, null=True)
    image_url = models.CharField(max_length=255, blank=True, null=True)

    def getReviews(self):
        return self.review_set.all()
    
    def generate_image_url(self):
        # Replace spaces in product name with underscores and add .jpg extension
        filename = f"{self.name.replace(' ', '_')}.jpg"
        # Assuming images are stored in a folder named 'product_images' within MEDIA_URL
        return os.path.join('media/productImages', filename)

    def save(self, *args, **kwargs):
        if not self.image_url:
            # Generate image URL if not already set
            self.image_url = self.generate_image_url()
        super().save(*args, **kwargs)

        
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
