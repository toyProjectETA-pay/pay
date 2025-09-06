from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from pay.views import OrderViewSet, index   
router = DefaultRouter()
router.register(r'orders', OrderViewSet)

urlpatterns = [
    path('admin/', admin.site.urls), # 관리자용 뷰 
    path('', index), # front 화면 경로 
    path('api/', include(router.urls)), # 데이터 확인 및 처리용 

]
