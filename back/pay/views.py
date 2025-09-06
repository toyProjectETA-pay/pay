from django.http import HttpResponse
from rest_framework import viewsets
from .models import Order
from .serializers import OrderSerializer



# 확인용 index 페이지
def index(request):
    return HttpResponse("pay/views.py의 index()")

# DRF API ViewSet
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
