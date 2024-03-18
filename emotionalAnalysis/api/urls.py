from django.urls import path
## Import the functions from views.py
from .views import ProductView, CreateProductView, ReviewView, CreateReviewView, UserView, CreateUserView

## Define the URL patterns

urlpatterns = [
    ## If /product url, show products
    path('product', ProductView.as_view()),
    ## If /create url, create a new product
    path('create-product', CreateProductView.as_view()),
    path('review', ReviewView.as_view()),
    path('create-review', CreateReviewView.as_view()),
    path('user', UserView.as_view()),
    path('create-user', CreateUserView.as_view()),
]