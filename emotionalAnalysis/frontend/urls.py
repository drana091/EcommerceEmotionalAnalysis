from django.urls import path
from .views import index

urlpatterns = [
    # If / url, show index page
    path('', index),
]
