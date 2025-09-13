from django.http import HttpResponse
from rest_framework import generics

from .models import Order
from .serializers import OrderSerializer


class OrderViewSet(generics.ListCreateAPIView): 
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
