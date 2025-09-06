from rest_framework import serializers
from .models import OrderItem, Order

''' 
시리얼라이저: 파이썬 객체와 json 변환기 (dto 역할)
react에서 받은 json을 파이썬 객체로 변환하고 검증 후에 db에 저장
'''
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta: 
        model = OrderItem
        fields = ['id', 'name', 'price', 'quantity', 'total']
    

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many = True)

    class Meta:
        model = Order
        fields = ['id', 'created_at', 'grand_total', 'is_paid', 'items']

        # items: 역참조 이름 (데이터 아님)
        
        def create(self, validated_data):
            items_data = validated_data.pop('items')
            order = Order.objects.create(**validated_data)
            for item_data in items_data:
                OrderItem.objects.create(order=order, **item_data)
            return order