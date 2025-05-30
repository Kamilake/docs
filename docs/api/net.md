# Net (네트워킹)

::: tip

이 모듈은 아직 베타 상태이고 변경될 수 있어요! 🚧 이 API는 대부분 완성되었지만, 베타 기간 중 근본적인 결함이 발견되면 API가 재작업될 수 있어요. 그런 계획이 있다면 Discord에서 미리 알려드릴게요!

:::

`Net`은 네트워킹 관련 유틸리티 함수들을 위한 네임스페이스예요! 🌐 [BdApi](./bdapi)를 통해 인스턴스에 접근할 수 있어요.

## 속성들 (Properties)



## 메서드들 (Methods)

### fetch
서버 사이드에서 네트워크 리소스를 가져와서 CORS를 피해줘요! [node-fetch](https://github.com/node-fetch/node-fetch)와 비슷하게 작동해요. 네트워킹의 구세주죠! 🚀

| 매개변수 |  타입  | 선택사항 | 기본값 |       설명      |
|:----------|:------:|:--------:|:-------:|:----------------------:|
url|string|&#x274C;|*없음*|요청할 URL
options|object|&#x2705;|{}|요청을 커스터마이즈하는 추가 옵션들
options.method|"GET" \| "PUT" \| "POST" \| "DELETE"|&#x2705;|"GET"|요청에 사용할 HTTP 메서드
options.headers|Record<string, string>|&#x2705;|*없음*|요청과 함께 보낼 헤더들의 매핑
options.redirect|"manual" \| "follow"|&#x2705;|"follow"|요청과 함께 보낼 헤더들의 매핑 (설명이 중복된 것 같네요! 리다이렉트 처리 방식이에요)
options.maxRedirects|number|&#x2705;|20|자동으로 따라갈 최대 리다이렉트 수
options.signal|AbortSignal|&#x2705;|*없음*|요청을 갑자기 취소하기 위한 시그널
options.timeout|number|&#x2705;|3000|타임아웃되기 전에 요청을 기다릴 최대 초 수
options.body|Uint8Array \| string|&#x2705;|*없음*|요청과 함께 보낼 직렬화 가능한 본문 데이터


**반환값:** [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) - 추가적인 `url`과 `redirected` 속성들로 웹 `Response`를 확장한 커스텀 fetch 응답이에요!
___
