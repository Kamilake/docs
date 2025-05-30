# ContextMenu (컨텍스트 메뉴) 🎯

`ContextMenu`는 컨텍스트 메뉴를 패치하고 생성하는 데 도움을 주는 정말 유용한 모듈이에요! [BdApi](./bdapi)를 통해 인스턴스에 접근할 수 있답니다.

## 속성 (Properties)



## 메서드 (Methods)

### buildItem 🛠️
단일 메뉴 항목을 만들어주는 멋진 기능이에요! 여기서 보여드리는 건 타입(type) 속성뿐이지만, 나머지는 실제로 만들어지는 컴포넌트와 일치해야 해요. 각각의 옵션을 확인해보세요 - 생각보다 공통점이 적을 수도 있거든요! 😊

| 매개변수 |  타입  | 선택사항 | 기본값 |       설명      |
|:----------|:------:|:--------:|:-------:|:----------------------:|
props|object|&#x274C;|*없음*|아이템을 만들 때 사용할 속성들
props.type|string|&#x2705;|"text"|아이템의 타입이에요! 옵션: text, submenu, toggle, radio, custom, separator

**반환값:** `object` - 생성된 컴포넌트

___

### buildMenu 🏗️
`ContextMenu`를 감싸는 메뉴 *컴포넌트*를 만들어줘요! 내부적으로는 {@link ContextMenu.buildMenuChildren}를 호출한답니다. {@link ContextMenu.open}과 함께 사용하면 정말 환상적이에요!

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
setup|Array.&lt;object&gt;|아이템을 만들 때 사용할 속성들의 배열이에요. {@link ContextMenu.buildMenuChildren}를 참고하세요.

**반환값:** `function` - 유니크한 컨텍스트 메뉴 컴포넌트

___

### buildMenuChildren 👶
컨텍스트 메뉴의 모든 항목과 **그룹들**을 재귀적으로 만들어주는 놀라운 기능이에요! 그룹 안의 그룹이나 메뉴 안의 항목 수에는 하드 리미트가 없어요 - 정말 자유롭죠! ✨

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
setup|Array.&lt;object&gt;|아이템을 만들 때 사용할 속성들의 배열이에요. {@link ContextMenu.buildItem}를 참고하세요.

**반환값:** `Array.<object>` - 생성된 컴포넌트들의 배열

___

### close 🚪
현재 열려있는 컨텍스트 메뉴를 즉시 닫아줘요. 간단하지만 강력하답니다!


**반환값:** `void`
___

### open 🎉
전체 컨텍스트 메뉴를 열 수 있게 해주는 함수예요! 이 모듈로 메뉴를 만드는 걸 강력 추천해요 - 정말 편리하거든요!

| 매개변수 |  타입  | 선택사항 | 기본값 |       설명      |
|:----------|:------:|:--------:|:-------:|:----------------------:|
event|MouseEvent|&#x274C;|*없음*|컨텍스트 메뉴 이벤트예요. 에뮬레이션이 가능하며, target과 모든 X, Y 좌표가 필요해요.
menuComponent|function|&#x274C;|*없음*|렌더링할 컴포넌트예요. React 컴포넌트나 {@link ContextMenu.buildMenu}의 출력값이 될 수 있어요.
config|object|&#x274C;|*없음*|컨텍스트 메뉴의 설정/속성들
config.position|string|&#x2705;|"right"|메뉴의 기본 위치예요, 옵션: "left", "right"
config.align|string|&#x2705;|"top"|메뉴의 기본 정렬이에요, 옵션: "bottom", "top"
config.onClose|function|&#x2705;|*없음*|메뉴가 닫힐 때 실행할 함수예요

**반환값:** `void`
___

### patch 🔧
주어진 컨텍스트 메뉴를 패치할 수 있게 해줘요. `Patcher`를 감싸는 래퍼 역할을 한답니다.

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
navId|string|컨텍스트 메뉴를 식별하기 위해 Discord가 내부적으로 사용하는 `navId`예요
callback|function|React 렌더 트리를 받는 콜백 함수예요

**반환값:** `function` - 자동으로 패치를 해제하는 함수

___

### unpatch 🔓
주어진 컨텍스트 메뉴에 추가된 패치를 제거할 수 있어요.

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
navId|string|패치할 때 사용했던 원래 `navId`예요
callback|function|패치할 때 사용했던 원래 콜백 함수예요

**반환값:** `void`
___
