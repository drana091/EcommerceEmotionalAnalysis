from django.urls import path
## Import the functions from views.py
from .views import *

## Define the URL patterns

urlpatterns = [
    #----------------------------------------------
    # PRODUCT URLS
    #----------------------------------------------
    ## If /product url, show products
    path('product', ProductView.as_view()),
    ## If /product/<id> url, show a single product
    path('product/<pk>', SingleProductView.as_view()),
    ## If /create url, create a new product
    path('create-product', CreateProductView.as_view()),
    path('emotion-product/<emotion>', EmotionProductView.as_view()),
 
    #----------------------------------------------
    # REVIEW URLS
    #----------------------------------------------
    ### REVIEW URLS
    path('review', ReviewView.as_view()),
    path('create-review', CreateReviewView.as_view()),
    path('product-reviews/<product>', ProductReviewView.as_view()),

    #----------------------------------------------
    # USER URLS
    #----------------------------------------------
    path('user', UserView.as_view()),
    path('user/<pk>', SingleUserView.as_view()),
    path('create-user', CreateUserView.as_view()),

    #----------------------------------------------
    # CART URLS
    #----------------------------------------------
    path('cart', CartView.as_view()),
    path('create-cart', CreateCartView.as_view()),
    path('user-cart/<user>', UserCartView.as_view()),
    path('delete-product-cart', DeleteProductFromCartView.as_view()),

    #----------------------------------------------
    # ORDER URLS
    #----------------------------------------------
    path('order/<user>', OrderView.as_view()),
    path('create-order', CreateOrderView.as_view()),
]