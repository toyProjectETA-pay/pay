from django.contrib import admin
from .models import Order, OrderItem

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "created_at", "grand_total", "is_paid", "is_done", "is_ready")
    list_filter = ("is_paid", "is_done", "is_ready")
    inlines = [OrderItemInline]