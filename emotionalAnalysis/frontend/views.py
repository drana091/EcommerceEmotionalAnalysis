from django.shortcuts import render

# Create your views here.

# Renders the index.html file
def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')