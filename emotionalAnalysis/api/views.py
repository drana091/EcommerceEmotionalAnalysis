from django.shortcuts import render
from rest_framework import generics, status
from .serializers import *
from .models import Product, User,Review
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
import random
from django.http import JsonResponse


# Create your views here. This is where you define what happends to the data.

#----------------------------------------------
# PRODUCT VIEWS
#----------------------------------------------
# View to show all products
class ProductView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# View to show a single product
class SingleProductView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'pk'

# View to show products with a specific totalEmotion
class EmotionProductView(generics.ListAPIView):
    serializer_class = ProductSerializer
    lookup_url_kwarg = 'emotion'

    def get_queryset(self):
        emotion = self.kwargs[self.lookup_url_kwarg]
        return Product.objects.filter(totalEmotion=emotion)

# View to create a new product. 
# Takes a POST request with parameters: name, description, price
class CreateProductView(APIView):
    serializer_class = CreateProductSerializer
    # Define the post method
    def post(self, request, format=None):
        # Get the data from the request
        serializer = self.serializer_class(data=request.data)
        # If the data is valid, create a new product
        if serializer.is_valid():
            name = serializer.data.get('name')
            description = serializer.data.get('description')
            price = serializer.data.get('price')
            product = Product(name=name, description=description, price=price)
            product.save()
            return Response(ProductSerializer(product).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

    # View to fetch random products
class RandomProductView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        # Get all product IDs
        all_product_ids = list(Product.objects.values_list('id', flat=True))
        # Choose a random subset of product IDs (e.g., 10 random product IDs)
        random_product_ids = random.sample(all_product_ids, k=3)  # Adjust the value of 'k' as needed
        # Fetch products corresponding to the random IDs
        return Product.objects.filter(id__in=random_product_ids)
    
#----------------------------------------------
# USER VIEWS
#----------------------------------------------
# View to show all users
class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# View to show a single user
class SingleUserView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'pk'

# View to login a user
class SignInView(APIView):
    def post(self, request):
        # Extract username/email and password from the request data
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate user
        user = authenticate(request, username=username, password=password)

        if user is not None:
            # User authentication successful
            # Return success response with user data or authentication token
            return Response({'message': 'Sign in successful', 'user_id': user.id}, status=status.HTTP_200_OK)
        else:
            # User authentication failed
            # Return error response
            return Response({'error': 'Invalid username/email or password'}, status=status.HTTP_401_UNAUTHORIZED)
        
# View to create a new user.
# Takes a POST request with parameters: name, email, password, address, phone
class CreateUserView(APIView):
    serializer_class = CreateUserSerializer
    # Define the post method
    def post(self, request, format=None):
        # Get the data from the request
        serializer = self.serializer_class(data=request.data)
        # If the data is valid, create a new user
        if serializer.is_valid():
            Fname = serializer.data.get('Fname')
            Lname = serializer.data.get('Lname')
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            user = User(Fname=Fname, Lname=Lname, email=email, password=password)
            user.save()
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)    

#----------------------------------------------
# REVIEW VIEWS
#----------------------------------------------
# View to show all reviews of a product
class ReviewView(generics.ListAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

# View to show reviews of a single product
class ProductReviewView(generics.ListAPIView):
    serializer_class = ReviewSerializer
    lookup_url_kwarg = 'product'

    def get_queryset(self):
        product_id = self.kwargs[self.lookup_url_kwarg]
        return Review.objects.filter(product_id=product_id)
    
                        
# View to create a new review for a product
# Takes a POST request with parameters: product, name, rating, comment, emotion
class CreateReviewView(APIView):
    serializer_class = CreateReviewSerializer
    # Define the post method
    def post(self, request, format=None):
        # Get the data from the request
        serializer = self.serializer_class(data=request.data)
        # If the data is valid, create a new review
        if serializer.is_valid():
            product = Product.objects.get(id=serializer.data.get('product'))
            user = User.objects.get(id=serializer.data.get('user'))
            comment = serializer.data.get('comment')
            review = Review(product=product, user=user, comment=comment)
            review.save()
            return Response(ReviewSerializer(review).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
    
#----------------------------------------------
# CART VIEWS
#----------------------------------------------
# View to show all cart items
class CartView(generics.ListAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

# View to all products in the cart
class UserCartView(generics.ListAPIView):
    serializer_class = CartSerializer
    lookup_url_kwarg = 'user'

    def get_queryset(self):
        user_id = self.kwargs[self.lookup_url_kwarg]
        return Cart.objects.filter(user_id=user_id)

    
# View to create a new cart item
# Takes a POST request with parameters: user, product, quantity
class CreateCartView(APIView):
    serializer_class = CreateCartSerializer
    # Define the post method
    def post(self, request, format=None):
        # Get the data from the request
        serializer = self.serializer_class(data=request.data)
        # If the data is valid, create a new cart item
        if serializer.is_valid():
            user = User.objects.get(id=serializer.data.get('user'))
            product = Product.objects.get(id=serializer.data.get('product'))
            quantity = serializer.data.get('quantity')
            cart = Cart(user=user, product=product, quantity=quantity)
            cart.save()
            return Response(CartSerializer(cart).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

# View to delete a product from the cart
class DeleteProductFromCartView(APIView):
    serializer_class = CartSerializer
    def post(self, request):
        user_id = request.data.get('user')
        product_id = request.data.get('product')
        cart_item = Cart.objects.filter(user_id=user_id, product_id=product_id)
        cart_item.delete()
        return Response({'message': 'Product deleted from cart'}, status=status.HTTP_200_OK)

#----------------------------------------------
# ORDER VIEWS
#----------------------------------------------
# View to show all orders of a user
class OrderView(generics.ListAPIView):
    serializer_class = OrderSerializer
    lookup_url_kwarg = 'user'

    def get_queryset(self):
        user_id = self.kwargs[self.lookup_url_kwarg]
        return Order.objects.filter(user_id=user_id)    


# View to create a new order
# Takes a POST request with parameters: user, product, address, city, state, zip, country, paymentMethod, quantity
class CreateOrderView(APIView):
    serializer_class = CreateOrderSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            user = serializer.validated_data.get('user')
            products = serializer.validated_data.get('products')
            address = serializer.validated_data.get('address')
            city = serializer.validated_data.get('city')
            state = serializer.validated_data.get('state')
            zip_code = serializer.validated_data.get('zip')
            country = serializer.validated_data.get('country')
            payment_method = serializer.validated_data.get('paymentMethod')
            
            # Create the order instance
            order = Order.objects.create(
                user=user,
                address=address,
                city=city,
                state=state,
                zip=zip_code,
                country=country,
                paymentMethod=payment_method,
            )
            
            # Add products to the order
            order.products.set(products)
            
            # Serialize and return the created order
            order_serializer = OrderSerializer(order)
            return Response(order_serializer.data, status=status.HTTP_201_CREATED)
        
        return Response({'Bad Request': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

class SearchProduct(generics.ListAPIView):
    
    def post(self, request):
        query = request.data.get('query')  # Get the search query from the request data
        if query:
            # Query the database for products containing the search query in their name
            products = Product.objects.filter(name__icontains=query)
            # Serialize the queryset into JSON format
            data = [{
                'id': product.id,
                'name': product.name,
                'description': product.description,
                'price': product.price,
                'stock': product.stock,
                'totalEmotion': product.totalEmotion,
                'image_url': product.image_url
            } for product in products]
            # Return the JSON response
            return JsonResponse(data, safe=False)
        else:
            # If no search query is provided, return a bad request response
            return JsonResponse({'error': 'No search query provided'}, status=400)
        
class ProductDeleteView(APIView):
   def delete(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            product.delete()
            return JsonResponse({'message': 'Product deleted successfully'}, status=204)
        except Product.DoesNotExist:
            return JsonResponse({'error': 'Product not found'}, status=404)
        
class ProductUpdateView(APIView):
    def post( self, request, pk):
        query = request.data.get('query')