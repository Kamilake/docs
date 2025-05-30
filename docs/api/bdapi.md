# BdApi 🚀

`BdApi`는 전역적으로(`window.BdApi`) 접근 가능한 객체예요! 플러그인 개발자들의 삶을 편하게 만들어주는 마법 같은 존재랍니다. ✨

## 속성 (Properties)

### Components
플러그인에서 사용할 수 있는 [React 컴포넌트](./components.md) 세트예요! 정말 유용한 도구들이 가득해요! 🧰

**타입:** `Components`
___

### ContextMenu
컨텍스트 메뉴와 상호작용하기 위한 [ContextMenu](./contextmenu) 인스턴스예요. 오른쪽 클릭의 마법을 다뤄볼까요? 🖱️

**타입:** `ContextMenu`
___

### DOM
DOM과 상호작용하기 위한 [DOM](./dom) 인스턴스예요. 웹페이지의 뼈대를 만지작거릴 수 있어요! 🏗️

**타입:** `DOM`
___

### Data
데이터를 관리하기 위한 [Data](./data) 인스턴스예요. 소중한 정보들을 안전하게 보관해드려요! 💾

**타입:** `Data`
___

### Logger
정보를 로깅하기 위한 [Logger](./logger.md) 인스턴스예요. 무슨 일이 일어나고 있는지 기록해주는 충실한 비서랍니다! 📝

**타입:** `Logger`
___

### Net
네트워크 관련 도구를 사용하기 위한 [Net](./net.md) 인스턴스예요. 인터넷의 바다를 항해해볼까요? 🌐

**타입:** `Net`
___

### Patcher
함수를 몽키 패치하기 위한 [Patcher](./patcher) 인스턴스예요. 기존 함수에 새로운 기능을 슬쩍 추가할 수 있어요! 🐵

**타입:** `Patcher`
___

### Plugins
플러그인에 접근하기 위한 [AddonAPI](./addonapi) 인스턴스예요. 플러그인들의 관리자 같은 존재죠! 🔌

**타입:** `AddonAPI`
___

### React
Discord 내부에서 사용되는 React 모듈이에요. 리액트의 힘을 빌려볼까요? ⚛️

**타입:** `React`
___

### ReactDOM
Discord 내부에서 사용되는 ReactDOM 모듈이에요. DOM에 React를 연결해주는 다리 역할이에요! 🌉

**타입:** `ReactDOM`
___

### ReactUtils
React와 함께 작업하기 위한 [ReactUtils](./reactutils) 인스턴스예요. React를 더 쉽게 다룰 수 있게 도와줘요! 🛠️

**타입:** `ReactUtils`
___

### Themes
테마에 접근하기 위한 [AddonAPI](./addonapi) 인스턴스예요. Discord를 예쁘게 꾸며주는 스타일리스트 같은 친구죠! 🎨

**타입:** `AddonAPI`
___

### UI
인터페이스를 만들기 위한 [UI](./ui) 인스턴스예요. 사용자가 보게 될 화면을 디자인할 수 있어요! 🖼️

**타입:** `UI`
___

### Utils
일반적인 유틸리티 함수들을 위한 [Utils](./utils) 인스턴스예요. 만능 도구상자 같은 존재랍니다! 🧰

**타입:** `Utils`
___

### Webpack
모듈을 검색하기 위한 [Webpack](./webpack) 인스턴스예요. 필요한 모듈을 찾아주는 탐정 같은 친구죠! 🕵️

**타입:** `Webpack`
___

### emotes <Badge type="danger">사용 중단됨</Badge>
BD의 이모트에 대한 참조 객체예요. 이제는 옛날 친구가 되었네요! 😢

**타입:** `object`
___

### settings <Badge type="danger">사용 중단됨</Badge>
BD의 설정을 가져오기 위한 참조 객체예요. 이것도 추억 속으로... 📦

**타입:** `object`
___

### version
BD의 버전에 대한 참조 문자열이에요. 현재 어떤 버전을 쓰고 있는지 궁금할 때! 🏷️

**타입:** `string`
___


## 메서드 (Methods)

::: danger 주의하세요! ⚠️

`BdApi` 객체의 모든 직접 메서드들은 오랫동안 사용 중단되었으며 제거 예정이에요! 새로운 프로젝트에서는 사용하지 마세요!

:::

### alert <Badge type="danger">사용 중단됨</Badge>
일반적이지만 매우 커스터마이징 가능한 모달을 보여줘요. 

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
title|string|모달의 제목
content|string\|ReactElement\|Array.&lt;(string\|ReactElement)&gt;|모달에 표시할 텍스트 문자열

**반환값:** `void`
___

### clearCSS <Badge type="danger">사용 중단됨</Badge>
주어진 ID에 해당하는 `<style>`을 문서에서 제거해요.

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
id|string|스타일 요소에 사용되는 ID

**반환값:** `void`
___

### deleteData <Badge type="danger">사용 중단됨</Badge>
저장된 데이터의 일부를 삭제해요. `null`이나 `undefined`를 저장하는 것과는 달라요.

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
pluginName|string|데이터를 삭제하는 플러그인 이름
key|string|삭제할 데이터의 키

**반환값:** `void`
___

### disableSetting <Badge type="danger">사용 중단됨</Badge>
ID로 BetterDiscord 설정을 비활성화해요.

| 매개변수 |  타입  | Optional | Default |       설명      |
|:----------|:------:|:--------:|:-------:|:----------------------:|
collection|string|&#x2705;|"settings"|컬렉션 ID
category|string|&#x274C;|*none*|컬렉션 내 카테고리 ID
id|string|&#x274C;|*none*|카테고리 내 설정 ID

**반환값:** `void`
___

### enableSetting <Badge type="danger">사용 중단됨</Badge>
ID로 BetterDiscord 설정을 활성화해요.

| 매개변수 |  타입  | Optional | Default |       설명      |
|:----------|:------:|:--------:|:-------:|:----------------------:|
collection|string|&#x2705;|"settings"|컬렉션 ID
category|string|&#x274C;|*none*|컬렉션 내 카테고리 ID
id|string|&#x274C;|*none*|카테고리 내 설정 ID

**반환값:** `void`
___

### findAllModules <Badge type="danger">사용 중단됨</Badge>
필터를 사용하여 여러 개의 웹팩 모듈을 찾아요.

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
filter|function|모듈의 exports, module, moduleId를 기준으로 주어진 필터. 모듈이 일치하면 `true`를 반환해야 해요.

**반환값:** `Array` - 일치하는 모듈의 배열 또는 빈 배열
___

### findModule <Badge type="danger">사용 중단됨</Badge>
필터를 사용하여 웹팩 모듈을 찾아요.

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
filter|function|모듈의 exports, module, moduleId를 기준으로 주어진 필터. 모듈이 일치하면 `true`를 반환해야 해요.

**반환값:** `any` - 일치하는 모듈 또는 `undefined`
___

### findModuleByDisplayName <Badge type="danger">사용 중단됨</Badge>
`displayName` 속성으로 웹팩 모듈을 찾아요.

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
name|string|원하는 `displayName` 속성

**반환값:** `any` - 일치하는 모듈 또는 `undefined`
___

### findModuleByProps <Badge type="danger">사용 중단됨</Badge>
자신의 속성으로 웹팩 모듈을 찾아요.

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
props|...string|원하는 속성들

**반환값:** `any` - 일치하는 모듈 또는 `undefined`
___

### findModuleByPrototypes <Badge type="danger">사용 중단됨</Badge>
자신의 프로토타입으로 웹팩 모듈을 찾아요.

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
protos|...string|원하는 프로토타입 속성들

**반환값:** `any` - 일치하는 모듈 또는 `undefined`
___

### getBDData <Badge type="danger">사용 중단됨</Badge>
BetterDiscord의 기타 데이터에서 일부 데이터를 가져와요.

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
key|string|가져올 데이터의 키

**반환값:** `any` - 저장된 데이터
___

### getInternalInstance <Badge type="danger">사용 중단됨</Badge>
지정된 노드의 내부 React 데이터를 가져와요.

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
node|HTMLElement|내부 React 데이터를 가져올 노드

**반환값:** `object` - 찾은 데이터 또는 `undefined`
___

### injectCSS <Badge type="danger">사용 중단됨</Badge>
주어진 ID로 `<style>`을 문서에 추가해요.

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
id|string|스타일 요소에 사용할 ID
css|string|문서에 적용할 CSS

**반환값:** `void`
___

### isSettingEnabled <Badge type="danger">사용 중단됨</Badge>
BD에서 특정 설정의 상태를 가져와요.

| 매개변수 |  타입  | Optional | Default |       설명      |
|:----------|:------:|:--------:|:-------:|:----------------------:|
collection|string|&#x2705;|"settings"|컬렉션 ID
category|string|&#x274C;|*none*|컬렉션 내 카테고리 ID
id|string|&#x274C;|*none*|카테고리 내 설정 ID

**반환값:** `boolean` - 설정이 활성화되어 있는지 여부
___

### linkJS <Badge type="danger">사용 중단됨</Badge>
원격 JS 스크립트를 자동으로 생성하고 링크해요.

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
id|string|스크립트 요소의 ID
url|string|원격 스크립트의 URL

**반환값:** `Promise` - onload 이벤트가 발생할 때까지 대기
___

### loadData <Badge type="danger">사용 중단됨</Badge>
이전에 저장된 데이터를 불러와요.

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
pluginName|string|데이터를 불러오는 플러그인 이름
key|string|불러올 데이터의 키

**반환값:** `any` - 저장된 데이터
___

### monkeyPatch <Badge type="danger">사용 중단됨</Badge>
객체의 메서드를 몽키 패치해요. 패치 콜백은 대상 메서드의 이전, 이후 또는 대신에 실행될 수 있어요.

 - 몽키 패치를 할 때는 주의가 필요해요. 대상 메서드의 원래 기능과 당신의 변경 사항뿐만 아니라, 다른 플러그인의 개발자들도 이 메서드를 패치할 수 있다는 점을 고려해야 해요. 가능하면 대상 메서드의 동작을 최소한으로 변경하고, 메서드 시그니처를 변경하지 않는 것이 좋아요.
 - 패치된 메서드의 이름은 변경되므로, 디버깅이나 스택 추적 시에 함수가 패치되었는지(그리고 몇 번 패치되었는지) 확인할 수 있어요. 또한, 패치된 메서드에는 `__monkeyPatched` 속성이 `true`로 설정되어 있어요. 프로그램matically 확인하고 싶다면 이 속성을 체크하면 돼요.

| 매개변수 |  타입  | Optional | Default |       설명      |
|:----------|:------:|:--------:|:-------:|:----------------------:|
what|object|&#x274C;|*none*|패치할 객체. 클래스 프로토타입도 전달하여 모든 클래스 인스턴스를 패치할 수 있어요.
methodName|string|&#x274C;|*none*|패치할 함수의 이름
options|object|&#x274C;|*none*|패치를 설정하기 위한 옵션 객체
options.after|function|&#x2705;|*none*|원래의 대상 메서드 호출 후에 호출되는 콜백. 여기서 반환 값을 수정할 수 있어요.
options.before|function|&#x2705;|*none*|원래의 대상 메서드 호출 전에 호출되는 콜백. 여기서 인자를 수정할 수 있어요.
options.instead|function|&#x2705;|*none*|원래의 대상 메서드 호출 대신에 호출되는 콜백. 원래 메서드에 접근하려면 `originalMethod` 매개변수를 사용하면 돼요.
options.once|boolean|&#x2705;|false|첫 번째 호출 후에 자동으로 언패치되도록 설정할 수 있어요
options.silent|boolean|&#x2705;|false|패치 및 언패치에 대한 로그 메시지를 억제하도록 설정할 수 있어요

**반환값:** `function` - 몽키 패치를 취소하는 함수
___

### onRemoved <Badge type="danger">사용 중단됨</Badge>
노드가 문서 본문에서 제거될 때의 리스너를 추가해요.

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
node|HTMLElement|관찰할 노드
callback|function|제거될 때 실행될 함수

**반환값:** `void`
___

### openDialog <Badge type="danger">사용 중단됨</Badge>
[Electron Dialog](https://www.electronjs.org/docs/latest/api/dialog/) API에 접근할 수 있어요. `Promise`를 반환하며, 이 `Promise`는 `boolean` 타입의 `cancelled`와 `filePath` 문자열, `filePaths` 문자열 배열을 포함하는 `object`로 해결돼요.

| 매개변수 |  타입  | Optional | Default |       설명      |
|:----------|:------:|:--------:|:-------:|:----------------------:|
options|object|&#x274C;|*none*|다이얼로그를 설정하기 위한 옵션 객체
options.mode|"open"\|"save"|&#x2705;|"open"|다이얼로그가 파일을 열지 저장할지를 결정
options.defaultPath|string|&#x2705;|~|다이얼로그가 시작할 때 보여줄 경로
options.filters|Array.&lt;object.&lt;string, Array.&lt;string&gt;&gt;&gt;|&#x2705;|[]|[파일 필터](https://www.electronjs.org/docs/latest/api/structures/file-filter) 배열
options.title|string|&#x2705;|*none*|타이틀바 제목
options.message|string|&#x2705;|*none*|다이얼로그 메시지
options.showOverwriteConfirmation|boolean|&#x2705;|false|파일 덮어쓸 때 사용자에게 확인을 요청할지 여부
options.showHiddenFiles|boolean|&#x2705;|false|다이얼로그에서 숨겨진 파일을 보여줄지 여부
options.promptToCreate|boolean|&#x2705;|false|존재하지 않는 폴더를 생성할지 사용자에게 요청할지 여부
options.openDirectory|boolean|&#x2705;|false|대상을 디렉토리로 선택할 수 있을지 여부
options.openFile|boolean|&#x2705;|true|대상을 파일로 선택할 수 있을지 여부
options.multiSelections|boolean|&#x2705;|false|여러 대상을 선택할 수 있을지 여부
options.modal|boolean|&#x2705;|false|다이얼로그가 메인 윈도우에 모달로 작용할지 여부

**반환값:** `Promise.<object>` - 다이얼로그 결과
___

### saveData <Badge type="danger">사용 중단됨</Badge>
JSON 직렬화 가능한 데이터를 저장해요.

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
pluginName|string|데이터를 저장하는 플러그인 이름
key|string|저장할 데이터의 키
data|any|저장할 데이터

**반환값:** `void`
___

### setBDData <Badge type="danger">사용 중단됨</Badge>
BetterDiscord의 기타 데이터에 데이터를 설정해요.

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
key|string|저장할 데이터의 키

**반환값:** `any` - 저장된 데이터
___

### showConfirmationModal <Badge type="danger">사용 중단됨</Badge>
확인 및 취소 콜백이 선택 사항인 일반적이지만 매우 커스터마이징 가능한 확인 모달을 보여줘요.

| 매개변수 |  타입  | Optional | Default |       설명      |
|:----------|:------:|:--------:|:-------:|:----------------------:|
title|string|&#x274C;|*none*|모달의 제목
children|string\|ReactElement\|Array.&lt;(string\|ReactElement)&gt;|&#x274C;|*none*|React 요소와 문자열의 혼합 배열. 모든 요소는 Discord의 `TextElement` 컴포넌트에 래핑되어 제대로 표시되고 렌더링돼요.
options|object|&#x2705;|*none*|모달을 수정하기 위한 옵션
options.danger|boolean|&#x2705;|false|주 버튼의 색상을 빨간색으로 할지 여부
options.confirmText|string|&#x2705;|Okay|확인/제출 버튼의 텍스트
options.cancelText|string|&#x2705;|Cancel|취소 버튼의 텍스트
options.onConfirm|callable|&#x2705;|NOOP|제출 버튼 클릭 시 호출되는 콜백
options.onCancel|callable|&#x2705;|NOOP|취소 버튼 클릭 시 호출되는 콜백

**반환값:** `string` - 이 모달에 사용된 키
___

### showNotice <Badge type="danger">사용 중단됨</Badge>
Discord의 채팅 레이어 위에 공지를 보여줘요.

| 매개변수 |  타입  | Optional | Default |       설명      |
|:----------|:------:|:--------:|:-------:|:----------------------:|
content|string\|Node|&#x274C;|*none*|공지의 내용
options|object|&#x274C;|*none*|공지에 대한 옵션
options.type|string|&#x2705;|"info" | "error" | "warning" | "success"|공지의 유형. 색상에 영향을 미쳐요.
options.buttons|Array.&lt;{label: string, onClick: function()}&gt;|&#x2705;|*none*|공지 텍스트 옆에 추가될 버튼들
options.timeout|number|&#x2705;|10000|공지 닫힐 때까지의 시간 초과. `0`으로 설정하면 발생하지 않아요.

**반환값:** `function` - 공지를 닫기 위한 콜백. 첫 번째 매개변수로 `true`를 전달하면 즉시 닫혀요.
___

### showToast <Badge type="danger">사용 중단됨</Badge>
화면 하단에 안드로이드처럼 토스트를 보여줘요.

| 매개변수 |  타입  | Optional | Default |       설명      |
|:----------|:------:|:--------:|:-------:|:----------------------:|
content|string|&#x274C;|*none*|토스트에 표시할 문자열
options|object|&#x274C;|*none*|옵션 객체. 선택 사항
options.type|string|&#x2705;|""|토스트의 유형을 스타일과 의미적으로 변경해요. 선택지: "", "info", "success", "danger"/"error", "warning"/"warn". 기본값: "".
options.icon|boolean|&#x2705;|true|유형에 따라 아이콘을 표시할지 여부. 유형이 없는 토스트는 항상 아이콘이 없어요. 기본값: `true`.
options.timeout|number|&#x2705;|3000|토스트가 자동으로 사라지기 전까지의 시간(ms). 기본값: `3000`.
options.forceShow|boolean|&#x2705;|false|토스트를 강제로 표시하고 BD 설정을 무시할지 여부

**반환값:** `void`
___

### suppressErrors <Badge type="danger">사용 중단됨</Badge>
주어진 함수를 `try..catch` 블록으로 감싸요.

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
method|function|감쌀 함수
message|string|오류 발생 시 출력할 추가 메시지

**반환값:** `function` - 새로 감싼 함수
___

### testJSON <Badge type="danger">사용 중단됨</Badge>
주어진 객체가 유효한 JSON인지 테스트해요.

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
data|object|테스트할 데이터

**반환값:** `boolean` - 테스트 결과
___

### toggleSetting <Badge type="danger">사용 중단됨</Badge>
ID로 BetterDiscord 설정을 토글해요.

| 매개변수 |  타입  | Optional | Default |       설명      |
|:----------|:------:|:--------:|:-------:|:----------------------:|
collection|string|&#x2705;|"settings"|컬렉션 ID
category|string|&#x274C;|*none*|컬렉션 내 카테고리 ID
id|string|&#x274C;|*none*|카테고리 내 설정 ID

**반환값:** `void`
___

### unlinkJS <Badge type="danger">사용 중단됨</Badge>
원격으로 링크된 JS 스크립트를 제거해요.

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
id|string|스크립트 요소의 ID

**반환값:** `void`
___
