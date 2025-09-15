from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView

from django.shortcuts import get_object_or_404
from .models import Order, Menu
from rest_framework import status

from .serializers import OrderSerializer, MenuSerializer


class OrderViewSet(generics.ListCreateAPIView): 
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    #OMS(Order Management System) 구현 중,,
    #is_paid가 true고 나머지는 다 false인 주문을 가지고 오려고 포맷하는 코드
    #파포자인 나는 하겅이가 자고 있을 때 아무 것도 할 수가 없어 지피티의 힘을 빌렸다오
    # 귯결~^^ 
    def get_queryset(self):
        queryset = super().get_queryset()
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

