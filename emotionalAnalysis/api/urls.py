from django.urls import path
## Import the functions from views.py
from .views import ProductView

## Define the URL patterns

urlpatterns = [
    ## If /product url, show products
    path('product', ProductView.as_view()),
]