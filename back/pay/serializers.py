from rest_framework import serializers
from .models import Order, OrderItem, Table, Menu


# 메뉴 직렬화
class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = ['id', 'name', 'desc', 'image', 'price', 'sold_out', 'category']


# 주문 아이템 직렬화
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'menu', 'quantity', 'total']


# 주문 직렬화
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order   # ✅ 반드시 model 지정
        fields = [
            'id', 'table', 'created_at', 'grand_total',
            'is_paid', 'is_done', 'is_ready', 'items'
        ]
        extra_kwargs = {
            'is_done': {'required': False},
            'is_ready': {'required': False},
        }

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order
