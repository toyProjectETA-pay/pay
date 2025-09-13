from django.http import HttpResponse
from rest_framework import generics

from .models import Order
from .serializers import OrderSerializer



# DRF API ViewSet
class OrderViewSet(generics.ListCreateAPIView): # api 
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
