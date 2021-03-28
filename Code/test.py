import cv2
 
# 이미지 읽기
img = cv2.imread('test.jpg', 1)
 
# 이미지 화면에 표시
cv2.imshow('Test Image', img)
