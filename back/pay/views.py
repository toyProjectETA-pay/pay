from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView

from django.shortcuts import get_object_or_404
from .models import Order, Menu
from rest_framework import status
import datetime
from django.conf import settings
import jwt

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

        # 추가: 결제 완료 됐고 아직 처리 안 된 주문 
        queryset = queryset.filter(is_paid=True, is_done=False)

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

class MenuListAPIView(generics.ListAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer

class OrderReadyView(APIView):
    def patch(self, request, pk):
        order = get_object_or_404(Order, pk=pk)
        order.is_ready = True
        order.save()

        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)


# 보안 
SECRET_KEY = settings.SECRET_KEY


@csrf_exempt
def generate_token(request, table_id):
    exp_time = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=30)
    payload = {
        "table_id": table_id,
        "exp": exp_time
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return JsonResponse({"token": token})


def order_page(request):
    token = request.GET.get("token")
    payload = verify_token(token)
    if not payload:
        return HttpResponseForbidden("토큰이 유효하지 않습니다.")
    
    table_id = payload["table_id"]
    return JsonResponse({"table_id": payload["table_id"], "order":"sample"})