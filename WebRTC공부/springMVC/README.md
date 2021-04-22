# SpringMVC

## 2021-04-22

Spring Server를 실행시킨뒤, 8080포트로 접속하면 아래처럼 index 화면이 보임.

![call_callee](./readme_img/call_callee.JPG)

여기서 room test부분에서 `jetsonNano입장`버튼과 `Computer 입장`버튼이 있다.

휴대폰(jetsonNano)에서 여기에 접속해서 `jetsonNano입장` 버튼을 누르고, 내 컴퓨터에서는 `Computer입장`을 누른다.

그러면, node js를 통해 webRTC부분을 관리하는 서버로 redirect해서 휴대폰의 영상을 내 컴퓨터에 나오게된다.(즉, node js서보도 동시에 실행시켜야한다.)

### 추가적으로 생각해볼것

로그인, 로그아웃, 회원가입, jetsonNano가 켜지면 자신만의 고유한 room을 생성해서 대기하기, 로그인하면 자신의 고유 jetsonNano방에 들어가 수 있게끔하기.