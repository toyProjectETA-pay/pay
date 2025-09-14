from django.http import HttpResponse
from rest_framework import generics

from .models import Order, Menu
from .serializers import OrderSerializer, MenuSerializer


class OrderViewSet(generics.ListCreateAPIView): 
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class MenuListAPIView(generics.ListAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer