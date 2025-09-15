from django.urls import path

from . import views 
from .views import MenuListAPIView, OrderReadyView

urlpatterns = [
    path('orders/', views.OrderViewSet.as_view(), name='order_list'),
    path('menus/', MenuListAPIView.as_view(), name="menu-list"),
    path('orders/<int:pk>/ready/', OrderReadyView.as_view(), name="order-ready")
]