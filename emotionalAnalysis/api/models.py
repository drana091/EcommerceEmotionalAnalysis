from django.db import models
from .functions.reviewEmotion import reviewEmotion
from .functions.generateImageUrl import generateImageUrl

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

    # Save the total emotion of the product
    # This does not calculate the total emotion based on how many reviews there are.
    # But based on how many times a certain emotion is mentioned in the all reviews.
    # So intensity over quantity.
    def productEmotion(self):
        # Get all reviews for the product
        reviews = self.review_set.all()
        
        # Initialize emotions dictionary with counts
        emotions_count = {
            'love': 0,
            'joy': 0,
            'surprise': 0,
            'anger': 0,
            'sadness': 0,
            'fear': 0,
        }
        
        # Count the number of occurrences of each emotion in reviews
        for review in reviews:
            if review.emotion:
                emotions_count[review.emotion] += 1
        
        # Find the emotion with the highest count
        max_emotion = max(emotions_count, key=emotions_count.get)
        self.totalEmotion = max_emotion
        self.save()

    # Run when a product is saved
    def save(self, *args, **kwargs):
            # Generate image URL 
            self.image_url = generateImageUrl(self)
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

    # Run when a review is saved
    def save(self, *args, **kwargs):
        # Generate emotion for the review
        self.product.productEmotion()
        self.emotion = reviewEmotion(self.comment)
        super().save(*args, **kwargs)


