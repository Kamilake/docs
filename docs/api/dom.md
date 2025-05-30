# DOM (돔 조작) 🌐

`DOM`은 DOM 조작을 위한 간단하고 유용한 유틸리티 클래스예요! [BdApi](./bdapi)에서 인스턴스를 사용할 수 있답니다.

## 속성 (Properties)

### screenHeight 📏
사용자 화면의 현재 높이예요.

**타입:** `number`
___

### screenWidth 📐
사용자 화면의 현재 너비예요.

**타입:** `number`
___


## 메서드 (Methods)

### addStyle 🎨
주어진 ID로 문서에 `<style>`을 추가해줘요.

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
id|string|스타일 요소에 사용할 ID예요
css|string|문서에 적용할 CSS예요

**반환값:** `void`
___

### animate ✨
JavaScript를 사용해서 부드럽게 애니메이션하는 데 도움을 주는 유틸리티예요!

| 매개변수 |  타입  | 선택사항 | 기본값 |       설명      |
|:----------|:------:|:--------:|:-------:|:----------------------:|
update|function|&#x274C;|*없음*|스타일이 업데이트되어야 함을 나타내는 렌더 함수예요
duration|number|&#x274C;|*없음*|애니메이션할 시간(ms)이에요
options|object|&#x2705;|*없음*|애니메이션을 커스터마이즈할 옵션들
options.timing|function|&#x2705;|*없음*|현재 시간 비율을 기반으로 진행률을 계산하는 선택적 함수예요. 기본적으로는 선형이에요.

**반환값:** `void`
___

### createElement 🏗️
DOM 요소를 더 쉽게 만들 수 있게 해주는 유틸리티 함수예요. `React.createElement`와 비슷하게 동작한답니다!

| 매개변수 |  타입  | 선택사항 | 기본값 |       설명      |
|:----------|:------:|:--------:|:-------:|:----------------------:|
tag|string|&#x274C;|*없음*|생성할 HTML 태그 이름이에요
options|object|&#x2705;|*없음*|요소를 커스터마이즈할 옵션 객체예요
options.className|string|&#x2705;|*없음*|요소에 추가할 클래스 이름이에요
options.id|string|&#x2705;|*없음*|요소에 설정할 ID예요
options.target|HTMLElement|&#x2705;|*없음*|자동으로 추가할 대상 요소예요
child|HTMLElement|&#x2705;|*없음*|추가할 자식 노드예요

**반환값:** `HTMLElement` - 생성된 HTML 요소

___

### onRemoved 👋
노드가 문서 바디에서 제거될 때를 위한 리스너를 추가해줘요.

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
node|HTMLElement|관찰할 노드예요
callback|function|제거될 때 실행할 함수예요

**반환값:** `void`
___

### parseHTML 📖
HTML 문자열을 파싱하고 결과를 반환해줘요. 두 번째 매개변수가 true면, 파싱된 HTML은 document fragment로 반환된답니다 {@see https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment}. 최상위 레벨에 요소들의 목록이 있을 때 정말 유용해요 - 다른 노드에 한 번에 모두 추가할 수 있거든요! 두 번째 매개변수가 false면, 반환값은 파싱된 노드들의 목록이 되고, 최상위 노드가 여러 개면 그 목록을, 아니면 단일 노드를 반환해요.

| 매개변수 |  타입  | 선택사항 | 기본값 |       설명      |
|:----------|:------:|:--------:|:-------:|:----------------------:|
html|string|&#x274C;|*없음*|파싱할 HTML이에요
fragment|boolean|&#x2705;|false|반환값이 원시 `DocumentFragment`여야 하는지 여부예요

**반환값:** `DocumentFragment` - HTML 파싱의 결과

___

### removeStyle 🗑️
주어진 ID에 해당하는 `<style>`을 문서에서 제거해줘요.

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
id|string|스타일 요소에 사용된 ID예요

**반환값:** `void`
___
