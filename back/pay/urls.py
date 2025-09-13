from django.urls import path

from . import views 

urlpatterns = [
    path('', views.OrderViewSet.as_view()),
]