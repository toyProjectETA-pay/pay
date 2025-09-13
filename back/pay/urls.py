from django.urls import path

from . import views 

urlpatterns = [
    path('orders/', views.OrderViewSet.as_view(), name='order_list'),

]