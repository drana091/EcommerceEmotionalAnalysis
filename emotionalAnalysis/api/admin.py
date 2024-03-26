from django.contrib import admin
from .models import Product, User, Review, Cart, Order
# Register your models here.

admin.site.register(Product)
admin.site.register(User)
admin.site.register(Review)
admin.site.register(Cart)
admin.site.register(Order)