# UI (사용자 인터페이스)

`UI`는 사용자 인터페이스를 만들기 위한 유틸리티 클래스예요! 🎨 [BdApi](./bdapi)를 통해 인스턴스에 접근할 수 있어요.

## 속성들 (Properties)



## 메서드들 (Methods)

### alert
일반적이지만 정말 커스터마이즈 가능한 모달을 보여줘요! 사용자의 관심을 끌기 완벽하죠! 📢

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
title|string|모달의 제목
content|string\|ReactElement\|Array.&lt;(string\|ReactElement)&gt;|모달에 표시할 텍스트 문자열

**반환값:** `void`
___

### buildSettingItem
이름과 노트가 있는 설정 아이템으로 감싸진 단일 설정을 만들어줘요!
객체의 모양은 렌더링하고 싶은 컴포넌트의 props와 매치되어야 해요. 자세한 내용은
`BdApi.Components` 섹션을 확인해보세요! 아래는 모든 설정 타입에 공통적인 것들이에요. ⚙️

| 매개변수 |  타입  | 선택사항 | 기본값 |       설명      |
|:----------|:------:|:--------:|:-------:|:----------------------:|
setting|object|&#x274C;|*없음*|설정 객체
setting.type|string|&#x274C;|*없음*|다음 중 하나: dropdown, number, switch, text, slider, radio, keybind, color, custom
setting.id|string|&#x274C;|*없음*|콜백에 사용될 식별자
setting.name|string|&#x274C;|*없음*|표시할 시각적 이름
setting.note|string|&#x274C;|*없음*|표시할 시각적 설명
setting.value|any|&#x274C;|*없음*|설정의 현재 값
setting.children|ReactElement|&#x2705;|*없음*|"custom" 타입에만 사용
setting.onChange|CallableFunction|&#x2705;|*없음*|값이 변경될 때의 콜백 (새로운 값만 인수로 받아요)
setting.disabled|boolean|&#x2705;|false|이 설정이 비활성화되어 있는지 여부
setting.inline|boolean|&#x2705;|true|입력이 이름과 인라인으로 렌더링되어야 하는지 여부 (radio 타입은 기본적으로 false예요)

**반환값:** `void`
___

### buildSettingsPanel
JSON 같은 데이터를 기반으로 설정 패널(react element)을 만들어줘요! 정말 편리하죠! 🎛️

여기서 `settings` 배열은 위에서 `buildSetting`에 설명된 것과 같은 설정 타입들의 배열이에요.
하지만 이 API는 "category"라는 추가적인 설정 "타입"을 허용해요. 이것은 `Components` API에서 찾을 수 있는 Group React Component와 같은 속성들을 가져요.

`onChange`는 항상 3개의 인수를 받아요: category id, setting id, 그리고 setting value. 패널의 "root"에 설정들이 있는 경우, category id는 `null`이에요. 개별 설정에 첨부된 `onChange` 리스너들은 패널 레벨 변경 리스너보다 먼저 실행돼요.

`onDrawerToggle`은 2개의 인수를 받아요: category id와 현재 표시된 상태. 이걸로 드로어 상태를 저장할 수 있어요.

`getDrawerState`는 2개의 인수를 받아요: category id와 기본 표시된 상태. 이걸로 저장된 드로어 상태를 불러올 수 있어요.

| 매개변수 |  타입  | 선택사항 | 기본값 |       설명      |
|:----------|:------:|:--------:|:-------:|:----------------------:|
props|object|&#x274C;|*없음*|속성 객체
props.settings|Array.&lt;object&gt;|&#x274C;|*없음*|보여줄 설정들의 배열
props.onChange|CallableFunction|&#x274C;|*없음*|모든 변경사항에 호출되는 함수
props.onDrawerToggle|CallableFunction|&#x2705;|*없음*|드로어 상태를 저장하는 데 선택적으로 사용
props.getDrawerState|CallableFunction|&#x2705;|*없음*|드로어 상태를 불러오는 데 선택적으로 사용

**반환값:** `void`
___

### createTooltip
호버 시 자동으로 보여주는 툴팁을 만들어줘요! 정보 전달의 예술이죠! 💡

| 매개변수 |  타입  | 선택사항 | 기본값 |       설명      |
|:----------|:------:|:--------:|:-------:|:----------------------:|
node|HTMLElement|&#x274C;|*없음*|모니터링하고 툴팁을 보여줄 DOM 노드
content|string\|HTMLElement|&#x274C;|*없음*|툴팁에 보여줄 문자열
options|object|&#x274C;|*없음*|툴팁을 위한 추가 옵션들
options.style|"primary"\|"info"\|"success"\|"warn"\|"danger"|&#x2705;|"primary"|Discord 스타일링/색상과 연관돼요
options.side|"top"\|"right"\|"bottom"\|"left"|&#x2705;|"top"|top, right, bottom, left 중 아무거나 가능해요
options.preventFlip|boolean|&#x2705;|false|너무 크거나 화면을 벗어날 때 툴팁이 반대편으로 이동하는 것을 방지해요
options.disabled|boolean|&#x2705;|false|호버 시 툴팁 표시를 비활성화할지 여부

**반환값:** `Tooltip` - 생성된 툴팁이에요!
___

### openDialog
[Electron Dialog](https://www.electronjs.org/docs/latest/api/dialog/) API에 접근을 제공해줘요! `boolean` cancelled와 저장용 `filePath` 문자열, 열기용 `filePaths` 문자열 배열을 가진 `object`로 해결되는 `Promise`를 반환해요. 파일 탐색의 달인이에요! 📁

| 매개변수 |  타입  | 선택사항 | 기본값 |       설명      |
|:----------|:------:|:--------:|:-------:|:----------------------:|
options|object|&#x274C;|*없음*|다이얼로그를 설정하는 옵션 객체
options.mode|"open"\|"save"|&#x2705;|"open"|다이얼로그가 파일을 열지 저장할지 결정해요
options.defaultPath|string|&#x2705;|~|다이얼로그가 시작할 때 보여줄 경로
options.filters|Array.&lt;object.&lt;string, Array.&lt;string&gt;&gt;&gt;|&#x2705;|[]|[파일 필터](https://www.electronjs.org/docs/latest/api/structures/file-filter)의 배열
options.title|string|&#x2705;|*없음*|제목 표시줄의 제목
options.message|string|&#x2705;|*없음*|다이얼로그의 메시지
options.showOverwriteConfirmation|boolean|&#x2705;|false|파일을 덮어쓸 때 사용자에게 확인을 받을지 여부
options.showHiddenFiles|boolean|&#x2705;|false|다이얼로그에서 숨겨진 파일들을 보여줄지 여부
options.promptToCreate|boolean|&#x2705;|false|존재하지 않는 폴더를 만들도록 사용자에게 프롬프트할지 여부
options.openDirectory|boolean|&#x2705;|false|사용자가 디렉토리를 타겟으로 선택할 수 있게 할지 여부
options.openFile|boolean|&#x2705;|true|사용자가 파일을 타겟으로 선택할 수 있게 할지 여부
options.multiSelections|boolean|&#x2705;|false|사용자가 여러 타겟을 선택할 수 있게 할지 여부
options.modal|boolean|&#x2705;|false|다이얼로그가 메인 윈도우에 대한 모달로 작동할지 여부

**반환값:** `Promise.<object>` - 다이얼로그의 결과예요!
___

### showChangelogModal
Discord와 비슷한 스타일로 변경로그 모달을 보여줘요! 이미지, 비디오, 색상 섹션으로 커스터마이즈 가능하고 마크다운을 지원해요. 정말 멋지죠! 📝

changes 옵션은 다음 타이핑을 가진 객체들의 배열이에요:
```ts
interface Changes {
    title: string;
    type: "fixed" | "added" | "progress" | "changed";
    items: Array<string>;
    blurb?: string;
}
```

| 매개변수 |  타입  | 선택사항 | 기본값 |       설명      |
|:----------|:------:|:--------:|:-------:|:----------------------:|
options|object|&#x274C;|*없음*|모달에 표시할 정보
options.title|string|&#x274C;|*없음*|모달 헤더에 보여줄 제목
options.subtitle|string|&#x274C;|*없음*|메인 헤더 아래에 보여줄 제목
options.blurb|string|&#x2705;|*없음*|변경사항 목록 전에 모달 본문에 보여줄 텍스트
options.banner|string|&#x2705;|*없음*|모달의 배너로 표시할 이미지의 URL
options.video|string|&#x2705;|*없음*|배너로 사용할 Youtube 링크나 비디오 파일 URL
options.poster|string|&#x2705;|*없음*|비디오 정지 프레임 포스터에 사용할 URL
options.footer|string\|ReactElement\|Array.&lt;(string\|ReactElement)&gt;|&#x2705;|*없음*|모달 푸터에 보여줄 것
options.changes|Array.&lt;Changes&gt;|&#x2705;|*없음*|보여줄 변경사항 목록 (자세한 내용은 설명 참조)

**반환값:** `string` - 이 모달에 사용된 키예요!
___

### showConfirmationModal
선택적인 확인 및 취소 콜백이 있는 일반적이지만 정말 커스터마이즈 가능한 확인 모달을 보여줘요! 결정의 순간이에요! 🤔

| 매개변수 |  타입  | 선택사항 | 기본값 |       설명      |
|:----------|:------:|:--------:|:-------:|:----------------------:|
title|string|&#x274C;|*없음*|모달의 제목
children|string\|ReactElement\|Array.&lt;(string\|ReactElement)&gt;|&#x274C;|*없음*|React 엘리먼트와 문자열의 단일 또는 혼합 배열. 모든 것이 Discord의 `TextElement` 컴포넌트로 감싸져서 문자열들이 제대로 보이고 렌더링돼요.
options|object|&#x2705;|*없음*|모달을 수정하는 옵션들
options.danger|boolean|&#x2705;|false|메인 버튼이 빨간색이어야 하는지 여부
options.confirmText|string|&#x2705;|확인|확인/제출 버튼의 텍스트
options.cancelText|string|&#x2705;|취소|취소 버튼의 텍스트
options.onConfirm|callable|&#x2705;|NOOP|제출 버튼을 클릭할 때 발생하는 콜백
options.onCancel|callable|&#x2705;|NOOP|취소 버튼을 클릭할 때 발생하는 콜백
options.onClose|callable|&#x2705;|NOOP|모달을 나갈 때 발생하는 콜백

**반환값:** `string` - 이 모달에 사용된 키예요!
___

### showNotice
Discord 채팅 레이어 위에 공지사항을 보여줘요! 사용자의 주의를 끌기 완벽해요! 📣

| 매개변수 |  타입  | 선택사항 | 기본값 |       설명      |
|:----------|:------:|:--------:|:-------:|:----------------------:|
content|string\|Node|&#x274C;|*없음*|공지사항의 내용
options|object|&#x274C;|*없음*|공지사항을 위한 옵션들
options.type|string|&#x2705;|"info" | "error" | "warning" | "success"|공지사항의 타입. 색상에 영향을 줘요.
options.buttons|Array.&lt;{label: string, onClick: function()}&gt;|&#x2705;|*없음*|공지사항 텍스트 옆에 추가될 버튼들
options.timeout|number|&#x2705;|10000|공지사항이 닫힐 때까지의 타임아웃. `0`으로 설정하면 실행되지 않아요.

**반환값:** `function` - 공지사항을 닫는 콜백. 첫 번째 매개변수로 `true`를 전달하면 전환 없이 즉시 닫혀요.
___

### showToast
화면 하단쪽으로 안드로이드와 비슷한 토스트를 보여줘요! 간단한 알림의 정석이에요! 🍞

| 매개변수 |  타입  | 선택사항 | 기본값 |       설명      |
|:----------|:------:|:--------:|:-------:|:----------------------:|
content|string|&#x274C;|*없음*|토스트에 보여줄 문자열
options|object|&#x274C;|*없음*|토스트를 위한 옵션들
options.type|string|&#x2705;|""|토스트의 타입을 스타일적으로 그리고 의미적으로 변경해요. 선택지: "", "info", "success", "danger"/"error", "warning"/"warn". 기본값: "".
options.icon|boolean|&#x2705;|true|타입에 해당하는 아이콘을 보여줄지 결정해요. 타입이 없는 토스트는 항상 아이콘이 없어요. 기본값: `true`.
options.timeout|number|&#x2705;|3000|자동으로 사라지기 전에 토스트가 보여질 시간(ms)을 조정해요. 기본값: `3000`.
options.forceShow|boolean|&#x2705;|false|토스트를 강제로 보여주고 BD 설정을 무시할지 여부

**반환값:** `void`
___
