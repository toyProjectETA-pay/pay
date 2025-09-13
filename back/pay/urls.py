from django.urls import path
from . import views 

urlpatterns = [
    path('', views.Order.as_view()),
]