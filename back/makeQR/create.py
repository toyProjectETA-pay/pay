import qrcode
import os

# 배포 시 사용할 도메인
base_url = "https://어쩌구.com/order?table="

# 이미지 저장 폴더
save_dir = r"C:\payProject\back\pay\makeQR\images"
os.makedirs(save_dir, exist_ok=True)

# 1번 테이블부터 25번 테이블까지
for i in range(1, 26):
    url = f"{base_url}{i}"  # 테이블 번호 포함

    # QR 코드 생성
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)

    # 이미지 파일 만들기
    img = qr.make_image(fill_color="black", back_color="white")

    # 저장
    filename = os.path.join(save_dir, f"table_{i}.png")
    img.save(filename)

    print(f"{filename} 생성 완료")
    print(f"URL = {url}")
