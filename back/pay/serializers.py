from rest_framework import serializers
from .models import Order, OrderItem, Table, Menu


class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = ['id', 'name', 'price', 'sold_out']


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'menu', 'quantity', 'total']
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
         class Meta:
            model = Order
            fields = ['id', 'table', 'created_at', 'grand_total',
                    'is_paid', 'is_done', 'is_ready','items']
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

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = ['id', 'name', 'desc', 'image', 'price', 'sold_out', 'category']
        