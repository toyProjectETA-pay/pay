from django.urls import path

from . import views 
from .views import MenuListAPIView, OrderReadyView

urlpatterns = [
    path('orders/', views.OrderViewSet.as_view(), name='order_list'), # Order Table 
    path('menus/', MenuListAPIView.as_view(), name="menu-list"), # Menu Table 
    path('orders/<int:pk>/ready/', OrderReadyView.as_view(), name="order-ready"), 
    path('generate-token/<int:table_id>/', views.generate_token), # token page 
    path('order/', views.order_page, name="order-page") # token page
]