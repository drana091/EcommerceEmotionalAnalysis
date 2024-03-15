from django.urls import path
from .views import index

urlpatterns = [
    # If the user goes to root URL, go to the index.js file
    path('', index),
    # If the user goes to /view, go to the index.js file
    path('view', index),
    # If the user goes to /create, go to the index.js file
    path('create', index),
    path('all', index),
]
