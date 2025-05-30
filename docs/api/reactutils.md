# ReactUtils (React 유틸리티)

`ReactUtils`는 React 내부와 상호작용하기 위한 유틸리티 클래스예요! ⚛️ [BdApi](./bdapi)를 통해 인스턴스에 접근할 수 있어요. UI의 내부와 상호작용할 때 정말 유용해요!

## 속성들 (Properties)



## 메서드들 (Methods)

### getInternalInstance
지정된 노드의 내부 React 데이터를 가져와줘요! React의 비밀을 들여다보는 거죠! 🔍

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
node|HTMLElement|내부 React 데이터를 가져올 노드

**반환값:** `object` - 찾은 데이터 또는 `undefined`예요!
___

### getOwnerInstance
현재 노드의 "owner" 노드를 찾으려고 시도해줘요! 이건 일반적으로 `stateNode`를 가진 노드 - 클래스 컴포넌트예요. 소유권의 비밀을 밝혀내는 거죠! 👑

| 매개변수 |  타입  | 선택사항 | 기본값 |       설명      |
|:----------|:------:|:--------:|:-------:|:----------------------:|
node|HTMLElement|&#x274C;|*없음*|React 인스턴스를 얻을 노드
options|object|&#x274C;|*없음*|검색을 위한 옵션들
options.include|array|&#x2705;|*없음*|검색에 포함할 항목들의 목록
options.exclude|array|&#x2705;|["Popout", "Tooltip", "Scroller", "BackgroundFlash"]|검색에서 제외할 항목들의 목록
options.filter|callable|&#x2705;|_=>_|현재 인스턴스를 체크할 필터 (boolean을 반환해야 해요)

**반환값:** `object` - owner 인스턴스 또는 찾지 못하면 `undefined`예요!
___

### wrapElement
HTML 엘리먼트를 감싸는 렌더링되지 않은 React 컴포넌트를 만들어줘요! HTML을 React로 변신시키는 마법이에요! ✨

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
element|HTMLElement|감쌀 엘리먼트 또는 엘리먼트들의 배열

**반환값:** `object` - 렌더링되지 않은 React 컴포넌트예요!
___
