from django.shortcuts import render
from rest_framework import generics, status
from .serializers import *
from .models import Product, User,Review
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
import random
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
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

# View to delete a product
class DeleteProductView(APIView):
    serializer_class = ProductSerializer
    def post(self, request):
        productID = request.data.get('productID')
        product = Product.objects.get(id=productID)
        product.delete()
        return Response({'message': 'Product deleted'}, status=status.HTTP_200_OK)


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
            stock = serializer.data.get('stock')
            product = Product(name=name, description=description, price=price, stock=stock)
            product.save()
            return Response(ProductSerializer(product).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

# View to fetch random products
class RandomProductView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        # Get product ID
        productID = list(Product.objects.values_list('id', flat=True))
        # Choose a random products
        randomID = random.sample(productID, k=3) 
        # Fetch products
        return Product.objects.filter(id__in=randomID)
    
# View to update stock of a product
class UpdateStockView(APIView):
    serializer_class = ProductSerializer
    def post(self, request):
        product = request.data.get('product')
        quantity = request.data.get('quantity')
        product = Product.objects.get(id=product)
        newStock = product.stock - quantity
        product.stock = newStock
        product.save()
        return Response(ProductSerializer(product).data, status=status.HTTP_200_OK)
    
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
class SignInView(generics.RetrieveAPIView):
    def post(self, request, format=None):
        # Extract username and password from request data
        username = request.data.get('username')
        password = request.data.get('password')

        # Check if both username and password are provided
        if not username or not password:
            return Response('400')

        try:
            # Retrieve user from database
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response('404')
        
        # Check if the password is correct
        if check_password(password, user.password):
            # Return user data if authentication succeeds
            return Response(UserSerializer(user).data, status=status.HTTP_200_OK)
        else:
            # Return error message if authentication fails
            return Response('401')


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
            username = serializer.data.get('username')
            password = make_password(serializer.data.get('password'))
            user = User(Fname=Fname, Lname=Lname, email=email, username=username, password=password)
            user.save()
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        
        # If the data is invalid, return a bad request response
        return Response('400')    

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
        cartID = request.data.get('cartID')
        cart = Cart.objects.get(id=cartID)
        cart.delete()
        return Response(CartSerializer(cart).data, status=status.HTTP_200_OK)
        
# View to update the quantity of a product in the cart
class UpdateCartQuantityView(APIView):
    serializer_class = CartSerializer
    def post(self, request):
        cartID = request.data.get('cartID')
        newQuantity = request.data.get('quantity')
        cart = Cart.objects.get(id=cartID)
        cart.quantity = newQuantity
        cart.save()
        return Response(CartSerializer(cart).data, status=status.HTTP_200_OK)
    
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
            

            # Total price calculation
            totalPrice = 0
            for product in products:
                totalPrice += product.price
            
            # Create the order instance
            order = Order.objects.create(
                user=user,
                address=address,
                city=city,
                state=state,
                zip=zip_code,
                country=country,
                paymentMethod=payment_method,
                total=totalPrice
            )
            
            # Add products to the order
            order.products.set(products)
            
            # Serialize and return the created order
            order_serializer = OrderSerializer(order)
            return Response(order_serializer.data, status=status.HTTP_201_CREATED)
        
        return Response({'Bad Request': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

class SearchProduct(APIView):
    def post(self, request):
        query = request.data.get('query')
        if query:
            products = Product.objects.filter(name__icontains=query)
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No search query provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        
class ProductUpdateView(APIView):
    def put(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            serializer = ProductSerializer(product, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        
class DeleteReviewView(APIView):
    serializer_class = ReviewSerializer
    def post(self, request):
        reviewID = request.data.get('review')
        review = Review.objects.get(id=reviewID)
        review.delete()
        return Response({'message': 'Product deleted'}, status=status.HTTP_200_OK)