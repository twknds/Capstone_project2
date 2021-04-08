# 개발환경
Jetson Nano에 관련된 개발환경 설정을 기록해놓는다.

<hr>

~~### 파이참~~

~~#### 파이썬 버전 및 패키지 관리 용이를 위해 파이참을 사용한다.~~

 ~~경로 :  &#126;/Download/pycharm-2020.3.5/bin/~~

~~./pycharm.sh(실행)~~

~~venv python 버전 : python3.7 & python3.8~~

~~python3.7 & python3.8 경로 : /usr/local/bin~~

~~설치 모듈(패키지) : Robot(예정)~~


### 파이썬
#### Jetson Nano오류로 인해 파이썬 3.6 인터프리터 사용.
 - ~~설치 List~~
   - ~~pip3~~
   - ~~pytorch~~
   - ~~OpenCV~~
   - ~~[csi-camera설치](https://blog.daum.net/ejleep1/1010)~~

WaveShare Jetbot 이미지 파일에 이미 포함되어 있음

<hr>

### Robotics
#### Jetson Nano + JetBot 관련 정보 기록
JetBot AI Kit Waveshare wiki : [공식위키](https://www.waveshare.com/wiki/JetBot_AI_Kit)

조립 설명서 : [공식홈페이지](https://www.waveshare.com/wiki/JetBot_AI_Kit_Assemble_Manual) 

학교 와이파이 연결 : [블로그](https://csj000714.tistory.com/129)

<hr>

### OpenCV
#### 미정
CSI 사용 : [Nvidia 지원 홈페이지](https://developer.nvidia.com/embedded/learn/tutorials/first-picture-csi-usb-camera#CameraGuide-SupportedCameras)

<hr>

### jupyter notebook(jupyter lab)
#### 파이썬 원격 실행
참고 : [블로그](https://austcoconut.tistory.com/entry/%EB%AC%B4%EC%9E%91%EC%A0%95-%EB%94%B0%EB%9D%BC-%ED%95%98%EA%B8%B0-LinuxUbuntu%EC%97%90%EC%84%9C-Jupyer-Notebook-%EC%84%9C%EB%B2%84-%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%B6%95) 

~~커맨드 : python -m notebook~~

참조홈페이지 : [Jupyter Lab](https://evergrow.tistory.com/96)설정

노트북에 jupyter lab 설치 완료
- terminal (jupyter lab)
- web browser에 (jet bot ip address):8888로 연결 -> jupyter

<hr>


### ~~Django~~
#### ~~파이썬 웹 연동(ReactJS * NodeJS)~~
~~공식 홈페이지 : [Djano](https://docs.djangoproject.com/ko/3.1/intro/)~~


<hr>

### 파이썬 셀레니움
#### 파이썬으로 웹브라우저 자동 open 및 권한 부여 (webRTC 브라우저 open에 사용)
참조 블로그 : [블로그](https://greeksharifa.github.io/references/2020/10/30/python-selenium-usage/)

<hr>

### Github
Capstone_project2 폴더 

<hr>

### 문제점
#### JetsonNano 사용에 있어서 문제점을 기록해놓는다.
- ~~충전지(구입예정)~~
  - 구입 완료
- ~~트랙 재료(구입예정)~~
  - 구입 완료
- ~~터치 스크린(사용불가)~~
  - 터치스크린 사용 X
- ~~Jetbot 조립~~
  - 조립 완료
- OpenCV -> 설치는 되지만 CSI-Camera 인식이 안됨(Pipeline 설정을 해줘야함)
	- Jupyter Lab사용할거면 신경안써도 되지만 Jetson Nano 자체에서 사용하기 위해선 설정 완료해줘야함
