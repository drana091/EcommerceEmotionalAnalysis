'''
import string
import random

def generateUniqueID():
    from api.models import Product, User, Review
    length = 6
    while True:
        # Generate a random number of the given length
        id = ''.join(random.choices(string.digits, k=length))
        # Filter the database for the generated id.
        # If the total amount == 0, then the id is unique and you can break the loop.
        if (Product.objects.filter(id=id).count() == 0) and \
           (User.objects.filter(id=id).count() == 0) and \
           (Review.objects.filter(id=id).count() == 0):
            break
    return id
'''