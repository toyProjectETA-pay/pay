from django.contrib import admin
from django.urls import path, include

from pay import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('pay/', views.index),

    # 풀스택 rest api (django rest framework)
    path('api/', include('rest_framework.urls')),
]
