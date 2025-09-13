import qrcode
import os

'''
# 배포 시 정한 도메인으로
base_url = "http://localhost:3000/aehanmute/order?table="

save_dir = r"C:\payProject\back\pay\makeQR\images"
os.makedirs(save_dir, exist_ok=True)  # 폴더 없으면 자동 생성

for i in range(1, 25):
    url = f"{base_url}{i}"  # 테이블 번호 붙이기

    #QR 코드 객체 생성
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    qr.add_data(url) 
    qr.make(fit=True)

    # 이미지 생성
    img = qr.make_image(fill_color="black", back_color="white")

    # 파일 저장
    filename = os.path.join(save_dir, f"{i}.png")
    img.save(filename)

    # 로그 출력
    print(f"{filename} 생성 완료")
    print(f"URL = {url}")


'''