from django.contrib import admin
from django.urls import path, include



urlpatterns = [
    path('admin/', admin.site.urls), # 관리자용 뷰 
    path('api/', include('pay.urls')), # 데이터 확인 및 처리용 

]
