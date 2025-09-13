from django.db import models




class Order(models.Model): # 테이블 Order 정의 
    created_at = models.DateTimeField(auto_now_add=True) # 주문 생성 시간
    grand_total = models.IntegerField() # 주점 주문 총액 
    is_paid = models.BooleanField(default=False) # 결제 여부 필드 (default: 결제 안 됨) => 수동~~!! 
    def __str__(self):
        return self.title

    
class OrderItem(models.Model): # 테이블 OrderItem 정의 (주문에 속하는 상품 테이블, 하나의 주문에 여러 상품)
    order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE) # Order과 n:1 관계
    # related_name: order.items 형태로 주문의 모든 아이템을 가져오도록 하기 위함 
    # on_delete: 주문 삭제 시 연결된 아이템도 같이 삭제 
    name = models.CharField(max_length=100) # 메뉴 이름 
    price = models.IntegerField() # 개당 가격 
    quantity = models.IntegerField() # 상품 주문 개수 (n인분)
    total = models.IntegerField() # 하나의 주문 총액 
