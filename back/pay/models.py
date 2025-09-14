from django.db import models


# 주문 단위 (테이블별 주문 1건)
class Order(models.Model): # 테이블 Order 정의 
    table = models.ForeignKey('Table', related_name="orders", on_delete=models.SET_NULL, null=True, blank=True) # 외래키 
    created_at = models.DateTimeField(auto_now_add=True) # 주문 생성 시간
    grand_total = models.IntegerField() # 주점 주문 총액 
    is_paid = models.BooleanField(default=False) # 결제 여부 필드 (default: 결제 안 됨) => 수동~~!! 
    is_done = models.BooleanField(default=False) # 주문 처리 완료 여부 


# 주점 실제 메뉴 
class Menu(models.Model):
    CATEGORY_CHOICES = [
        ('main', '메인'),
        ('side', '사이드'),
        ('beverage', '음료'),
        ('etc', '기타'),
    ]
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    name = models.CharField(max_length=100) # 메뉴 이름 
    desc = models.CharField(max_length=255, blank=True, null=True)  # 메뉴 설명 (짧게)
    image = models.CharField(max_length=255, blank=True, null=True)
    price = models.IntegerField() # 개당 가격
    sold_out = models.BooleanField(default=False) # 품절 여부  

# 고객 측 주문 1건 안의 개별 항목 
class OrderItem(models.Model): # 테이블 OrderItem 정의 (주문에 속하는 상품 테이블, 하나의 주문에 여러 상품)
    order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE) # Order과 n:1 관계
    # related_name: order.items 형태로 주문의 모든 아이템을 가져오도록 하기 위함 
    # on_delete: 주문 삭제 시 연결된 아이템도 같이 삭제 
    quantity = models.IntegerField() # 상품 주문 개수 (n인분)
    total = models.IntegerField() # 하나의 주문 총액 
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE, null=True, blank=True)
    



class Table(models.Model):
    number = models.CharField(max_length=10, unique=True)
    is_taken = models.BooleanField(default=False)
    last_order_time = models.DateTimeField(blank=True, null=True)

