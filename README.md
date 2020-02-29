# PWA
- Let`s create PWA

## Todo
- [x] Create static pages, manifest.json
- [x] iOS Support
- [x] Register a service worker - sw.js
- [x] The install event
- [x] The activate event
- [x] Lighthouse Audit
- [x] The fetch event
- [x] Banner, Offline Mode - Set Cache
- [ ] Offline Mode - Get Cache

## Study
1. Service workers
> 서비스워커 소개
- 참고: https://developers.google.com/web/fundamentals/primers/service-workers?hl=ko
- Use background sync / Load content offline / Use push notifications
- 풍부한 오프라인 경험, 주기적 백그라운드 동기화, 푸시 알림을 웹에서 지원하도록 해주는 기능의 기술 기반을 제공한다.
> 서비스워커 소개 유의 사항
- 서비스 워커는 자바스크립트 Worker 이므로, Dom에 직접 액세스 할 수 없다. 대신에 postMessage인터페이스를 통해서 전달된 메시지에 응답하는 방식으로 제어 대상 페이지와 통신할 수 있으며, 해당 페이지는 필욯요한 경우, DOM을 조작할 수 있다.
- 서비스워커는 프로그래밍 가능한 네트워크 프록시이며, 페이지의 네트워크 요청 처리 방법을 제어할 수 있다.
> 서비스 워커의 수명주기
- 서비스 워커의 수명주기는 웹 페이지와 완전히 별개이다.
- 서비스 워커를 사이트에 설치하려면 자바스크립트를 이용해서 등록해야한다. 
  (서비스를 등록하면 브라우저가 백그라운드에서 서비스 워커 설치 단계를 시작한다.)
> 사전 요구사항
- 브라우저 지원(Chrome, FireFox, Opera가 서비스 워커를 지원함)
- HTTPS 필요(Github 페이지를 이용하여 호스팅 유용)
> example
- ex1: (app.js) register the service worker -> sw.js
- ex2: (sw.js) install event -> service worker becomes active -> active event -> service worker 'listen' for events
- ex3: (page reload) -> sw.js -> service 'listen' for events
2. Servcie wroker - fetch
- sw.js에서 fetch 이벤트는 웹 앱에서 실행되는 로드되는 것들 즉, 서버에서 fetch하는 모든 요청을 확인할 수 있다.
