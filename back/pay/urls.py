from django.urls import path

from . import views 
from .views import MenuListAPIView

urlpatterns = [
    path('orders/', views.OrderViewSet.as_view(), name='order_list'),
    path('menus/', MenuListAPIView.as_view(), name="menu-list")
]