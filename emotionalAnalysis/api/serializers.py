from rest_framework import serializers
from .models import Product, User, Review

# Create serializers for the model here.
# This converts the data from the model into JSON format
# which is how we can interact with the data in the frontend.

#----------------------------------------------
# PRODUCT SERIALIZERS
#----------------------------------------------
# Create a serializer for the Product model to view the products.
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'price', 'stock', 'totalEmotion')

# Create a serializer for the Product model that creates a new product.
class CreateProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('name', 'description', 'price')

#----------------------------------------------
# USER SERIALIZERS
#----------------------------------------------
# Create a serializer for the User model to view the users.
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'Fname', 'Lname', 'email', 'password')

# Create a serializer for the User model that creates a new user.
class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('Fname', 'Lname', 'email', 'password')       
        
#----------------------------------------------
# REVIEW SERIALIZERS
#----------------------------------------------
# Create a serializer for the Review model to view the reviews.
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'product', 'user', 'comment', 'emotion')

# Create a serializer for the Review model that creates a new review.
class CreateReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('product', 'user', 'comment', 'emotion')