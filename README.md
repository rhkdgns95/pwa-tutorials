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
- [x] Offline Mode - Get Cache
- [x] Offline Mode - Cache Version
- [x] Offline Mode - Dynamic Cache
- [x] Offline Mode - Fallback page


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
3. offline 캐시 저장
- sw.js에서 offline의 경우, 페이지의 내용에 해당하는 URL을 캐시에 저장해두었다.
- 그래서 오프라인인 경우, 아래의 경우에 따라 캐시 데이터를 저장 / 로드 하도록 하였다.
- 3-1. 최초로 앱이 실행되는 경우 캐시 저장(static page)
: install event실행 -> cache에 정적인 js와 css들을 저장시켜둔다. addAll메소드 사용하며, 만약, url 하나라도 저장시킬경우 에러가 난다면, 실행되지 않는다는 점을 주의!
- 3-2. 앱의 라우팅을 통한 캐시 저장 (dynamic page)
: 정적인 페이지와 다르게, 라우팅을 통한 페이지를 로드하여 fetch 이벤트가 동작할 때, cache의 dynamic-cache를 open하여 url을 추가시키도록 한다.
- 3-3. offline의 경우, 인덱스 페이지와 UI관련 css/js파일들은 staticCache에, 이외의 나머지 페이지들은 dynamicCache에 저장이 되는데, 로드될 때(fetch 이벤트 동작)만 dynamicCache에 저장이 되는데, 만약 저장되지 않는 즉, 방문한적 없는 페이지의 URL을 입력한 경우에 대해서는 fallback.html이라는 임시의 페이지를 출력하도록 한다.
(fallback.html은 staticCache에 저장되어 있어야 하며, 방문한 적 없는 페이지가 로드 될 때, 즉 fetch 이벤트에서 caches.match()의 catch()콜백으로 호출된다.)