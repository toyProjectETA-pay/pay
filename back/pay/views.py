from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Order, Menu, OrderItem
from rest_framework import status
import datetime
from django.conf import settings
import jwt
from django.core.cache import cache

from django.contrib.auth.models import User
from datetime import datetime, timedelta


from .serializers import OrderSerializer, MenuSerializer

from .utils import verify_token
from django.http import JsonResponse, HttpResponseForbidden
from django.views.decorators.csrf import csrf_exempt

class OrderViewSet(generics.ListCreateAPIView): 
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    #OMS(Order Management System) 구현 중,,
    #is_paid가 true고 나머지는 다 false인 주문을 가지고 오려고 포맷하는 코드
    #파포자인 나는 하겅이가 자고 있을 때 아무 것도 할 수가 없어 지피티의 힘을 빌렸다오
    # 귯결~^^ 
    def get_queryset(self):
        queryset = super().get_queryset()
        permission_classes = [IsAuthenticated]

        # 쿼리스트링으로 받은 값 가져오기
        is_paid = self.request.query_params.get('is_paid')
        is_done = self.request.query_params.get('is_done')
        is_ready = self.request.query_params.get('is_ready')

        # BooleanField 필터링 (string -> boolean 변환)
        if is_paid is not None:
            queryset = queryset.filter(is_paid=is_paid.lower() == 'true')
        if is_done is not None:
            queryset = queryset.filter(is_done=is_done.lower() == 'true')
        if is_ready is not None:
            queryset = queryset.filter(is_ready=is_ready.lower() == 'true')

        return queryset

# 동시 접근 lock 우려 => 메뉴는 DB 접근 X 캐시로 get 
class MenuListAPIView(APIView):
    def get(self, request):
        # 캐시 확인
        menus = cache.get("menu_list")
        if not menus:
            # 없으면 DB에서 읽고 캐시에 저장
            queryset = Menu.objects.all()
            serializer = MenuSerializer(queryset, many=True)
            menus = serializer.data
            cache.set("menu_list", menus, timeout=60*60)  # 1시간 캐시
        return Response(menus)

class OrderReadyView(APIView):
    def patch(self, request, pk):
        order = get_object_or_404(Order, pk=pk)
        order.is_ready = True
        order.save()

        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)


class KitchenOrderView(generics.ListAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(is_paid=True, is_done=False, is_ready=False)


# 보안 
SECRET_KEY = settings.SECRET_KEY


def generate_token(request, table_id):
    try:
        user = User.objects.get(username=f"table_{table_id}")
    except User.DoesNotExist:
        user = User.objects.create_user(username=f"table_{table_id}", password="dummy1234")

    refresh = RefreshToken.for_user(user)
    refresh["table_id"] = table_id 
    return JsonResponse({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    })


def create(self, request, *args, **kwargs):
    # 1. Authorization 헤더에서 토큰 꺼내기
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return Response({"error": "토큰 없음"}, status=401)

    try:
        token = auth_header.split(" ")[1]
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        table_id = payload["table_id"]
    except jwt.ExpiredSignatureError:
        return Response({"error": "토큰 만료"}, status=401)
    except jwt.InvalidTokenError:
        return Response({"error": "잘못된 토큰"}, status=401)

    # 2. request.data 안의 table 값 무시하고 토큰에서 table_id 사용
    data = request.data.copy()
    data["table"] = table_id

    serializer = self.get_serializer(data=data)
    serializer.is_valid(raise_exception=True)
    self.perform_create(serializer)
    return Response(serializer.data, status=201)
