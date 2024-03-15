from rest_framework import serializers
from .models import Product

# Create serializers for the model here.
# This converts the data from the model into JSON format
# which is how we can interact with the data in the frontend.

# Create a serializer for the Product model to view the products.
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'price', 'stock', 'total_emotion')

# Create a serializer for the Product model that creates a new product.
class CreateProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('name', 'description', 'price')