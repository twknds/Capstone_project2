# Node.JS로 signaling server 구축 후 webRTC 사용

참고 사이트 : 
1. https://forest71.tistory.com/211
2. http://jmlim.github.io/spring/2019/09/30/spring-redirect-to-an-external-url/
   - spring controller에서 redirect하는 법
3. https://m.blog.naver.com/PostView.nhn?blogId=webakim&logNo=221130324766&proxyReferer=https:%2F%2Fwww.google.com%2F
   - 로컬 서버 외부 접속 허용 방법
4. http://hleecaster.com/local-web-server-ngrok/
   - 로컬 호스트 외부에서 접속 가능하게 하는법 - ngrok


## 실행법 & 설명

시작에 앞서 Node.js가 설치되어 있어야한다.

지금 이 현재폴더에서 `cmd`창을 열어서 `npm i` 입력해서 실행에 필요한 라이브러리들을 설치한다.

그 후, `node index.js`를 입력하여 웹 서버 실행.

이제 SSL을 통하지 않으면 카메라(webRTC)를 이용할 수 없으므로 NodeJS에 SSL을 적용하기 위해 SSL을 생성.
> 지금 깃허브에는 혹시몰라서 private.pem과 public.pem을 올려두지 않았지만 아래 사이트참고해서 만들면 됨.<br>
> https://blog.naver.com/PostView.nhn?blogId=baekmg1988&logNo=221454486746 <br>
> 그리고 아래와 같이 입력<Br>
> `openssl genrsa 1024 > private.pem`  => OpenSSL로 개인키 파일 생성   <br>   
> `openssl req -x509 -new -key private.pem > public.pem`  => 개인키와 쌍이 되는 공개키 생성<br>

이 파일들을 `index.js`와 같은 폴더에 넣어둠.

그 다음 현재 폴더에서 `cmd`열어서 `node index.js` 입력해서 웹 서버 실행.

그리고 `https:{ip주소}:3000`으로 pc와 휴대폰으로 접속하면 아래와 같이 둘 다 카메라 화면이 보인다.<br>

![webRTC2](./webRTC2.jpg)


## [아마존 aws에 nodeJS 웹 서버 만들기](https://blog-han.tistory.com/58)

## 2021-04-22 call, callee 추가

휴대폰(jetson nano라 생각)과 client(내 컴퓨터)에서 client에게 휴대폰의 화면만 실시간으로 보이게 함.

![call_callee](./readme_img/call_callee.JPG)