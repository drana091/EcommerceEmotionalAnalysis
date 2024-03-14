from django.urls import path
## Import the functions from views.py
from .views import main

## Define the URL patterns
urlpatterns = [
    ## Any url, call the main function from views.py
    path('', main),
]