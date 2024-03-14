from django.shortcuts import render
from rest_framework import generics
from .serializers import ProductSerializer
from .models import Product
# Create your views here.

# Return the different products
class ProductView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer