# Webpack

와! `Webpack`은 내부 webpack 모듈들을 가져오는 데 정말 유용한 유틸리티 클래스예요! 🛠️ [BdApi](./bdapi)를 통해 인스턴스에 접근할 수 있어요. Discord의 내부 구조와 상호작용할 때 정말 강력한 도구랍니다.

## 속성들 (Properties)

### Filters
모듈을 찾는 데 사용할 [Filters](./filters) 시리즈예요! 정말 편리하죠? 😊

**타입:** `Filters`
___

### modules
ID로 모듈 소스를 반환하는 Proxy예요. 마법 같지 않나요? ✨

**타입:** `modules`
___


## 메서드들 (Methods)

### getAllByKeys
특정 속성들을 가진 모든 모듈을 찾아줘요! 한 번에 여러 개를 찾을 수 있어서 정말 효율적이에요.

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
props|...string|모듈을 필터링할 때 사용할 속성들

**반환값:** `Array.<Any>`
___

### getAllByPrototypeKeys
프로토타입의 특정 속성들을 가진 모든 모듈을 찾아줘요! 객체지향 프로그래밍의 매력이 느껴지죠? 😍

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
prototypes|...string|모듈을 필터링할 때 사용할 속성들

**반환값:** `Array.<Any>`
___

### getAllByRegex
정규표현식으로 모듈 코드를 검색해줘요! 정말 강력한 기능이에요. 🔍

| 매개변수 |  타입  | 선택사항 | 기본값 |       설명      |
|:----------|:------:|:--------:|:-------:|:----------------------:|
regex|RegEx|&#x274C;|*없음*|모듈을 필터링할 정규표현식
options|object|&#x2705;|*없음*|검색을 설정하는 옵션들
options.defaultExport|Boolean|&#x2705;|true|기본 export와 매칭될 때 기본 export를 반환할지 여부
options.searchExports|Boolean|&#x2705;|false|webpack exports에서 필터를 실행할지 여부

**반환값:** `Array.<Any>`
___

### getAllByStrings
특정 문자열들을 포함한 모든 모듈을 찾아줘요! 간단하면서도 효과적이죠? 💪

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
strings|...String|모듈을 필터링할 때 사용할 문자열들

**반환값:** `Array.<Any>`
___

### getBulk
여러 필터를 사용해서 한 번에 여러 모듈을 찾아줘요! 대량 처리의 황제예요! 👑

| 매개변수 |  타입  | 선택사항 | 기본값 |       설명      |
|:----------|:------:|:--------:|:-------:|:----------------------:|
queries|...object|&#x274C;|*없음*|수행할 쿼리를 나타내는 객체
queries.filter|function|&#x274C;|*없음*|모듈을 필터링할 때 사용할 함수
queries.first|boolean|&#x2705;|true|첫 번째 매칭 모듈만 반환할지 여부
queries.defaultExport|boolean|&#x2705;|true|기본 export와 매칭될 때 기본 export를 반환할지 여부
queries.searchExports|boolean|&#x2705;|false|webpack exports에서 필터를 실행할지 여부

**반환값:** `any`
___

### getByKeys
자체 속성을 사용해서 단일 모듈을 찾아줘요! 정확하고 깔끔해요. ✨

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
props|...string|모듈을 필터링할 때 사용할 속성들

**반환값:** `Any`
___

### getByPrototypeKeys
프로토타입의 속성을 사용해서 단일 모듈을 찾아줘요! 객체의 깊은 곳까지 탐험할 수 있어요! 🕵️

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
prototypes|...string|모듈을 필터링할 때 사용할 속성들

**반환값:** `Any`
___

### getByRegex
코드를 사용해서 모듈을 찾아줘요! 정규표현식의 마법을 느껴보세요! ✨

| 매개변수 |  타입  | 선택사항 | 기본값 |       설명      |
|:----------|:------:|:--------:|:-------:|:----------------------:|
regex|RegEx|&#x274C;|*없음*|모듈을 필터링할 정규표현식
options|object|&#x2705;|*없음*|검색을 설정하는 옵션들
options.defaultExport|Boolean|&#x2705;|true|기본 export와 매칭될 때 기본 export를 반환할지 여부
options.searchExports|Boolean|&#x2705;|false|webpack exports에서 필터를 실행할지 여부

**반환값:** `Any`
___

### getByStrings
문자열 집합을 사용해서 단일 모듈을 찾아줘요! 간단하지만 강력해요! 💪

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
props|...String|모듈을 필터링할 때 사용할 문자열들

**반환값:** `Any`
___

### getModule
필터 함수를 사용해서 모듈을 찾아줘요! 가장 유연한 방법이에요! 🎯

| 매개변수 |  타입  | 선택사항 | 기본값 |       설명      |
|:----------|:------:|:--------:|:-------:|:----------------------:|
filter|function|&#x274C;|*없음*|모듈을 필터링할 때 사용할 함수. exports, module, moduleID가 주어져요. 매치되면 `true`를 반환하세요!
options|object|&#x2705;|*없음*|검색을 설정하는 옵션들
options.first|boolean|&#x2705;|true|첫 번째 매칭 모듈만 반환할지 여부
options.defaultExport|boolean|&#x2705;|true|기본 export와 매칭될 때 기본 export를 반환할지 여부
options.searchExports|boolean|&#x2705;|false|webpack exports에서 필터를 실행할지 여부

**반환값:** `any`
___

### getModules
필터 함수와 매칭되는 모든 모듈을 찾아줘요! 전체 목록이 필요할 때 완벽해요! 📋

| 매개변수 |  타입  | 선택사항 | 기본값 |       설명      |
|:----------|:------:|:--------:|:-------:|:----------------------:|
filter|function|&#x274C;|*없음*|모듈을 필터링할 때 사용할 함수
options|object|&#x2705;|*없음*|검색을 설정하는 옵션들
options.defaultExport|Boolean|&#x2705;|true|기본 export와 매칭될 때 기본 export를 반환할지 여부
options.searchExports|Boolean|&#x2705;|false|webpack exports에서 필터를 실행할지 여부

**반환값:** `Array.<any>`
___

### getStore
이름을 사용해서 내부 Store 모듈을 찾아줘요! Discord의 상태 관리의 핵심이에요! 🏪

| 매개변수 |  타입  |       설명      |
|:----------|:------:|:----------------------:|
name|String|찾을 store의 이름 (보통 "Store"를 포함해요)

**반환값:** `Any`
___

### getWithKey
값으로 모듈을 검색하고, 모듈과 매칭된 키를 반환해줘요! Patcher와 함께 사용하면 정말 유용해요! 🔧

| 매개변수 |  타입  | 선택사항 | 기본값 |       설명      |
|:----------|:------:|:--------:|:-------:|:----------------------:|
filter|function|&#x274C;|*없음*|모듈을 필터링할 때 사용할 함수. exports, module, moduleID가 주어져요.
options|object|&#x2705;|*없음*|검색을 커스터마이즈하는 옵션들
options.target|any|&#x2705;|*없음*|내부를 살펴볼 선택적 모듈 타겟
options.defaultExport|Boolean|&#x2705;|true|기본 export와 매칭될 때 기본 export를 반환할지 여부
options.searchExports|Boolean|&#x2705;|false|webpack export getter에서 필터를 실행할지 여부

**반환값:** `Array.<any, string>`
___

### waitForModule
지연 로드되는 모듈을 찾아줘요! 기다림의 미학이에요! ⏰

| 매개변수 |  타입  | 선택사항 | 기본값 |       설명      |
|:----------|:------:|:--------:|:-------:|:----------------------:|
filter|function|&#x274C;|*없음*|모듈을 필터링할 때 사용할 함수. exports가 주어져요. 매치되면 `true`를 반환하세요!
options|object|&#x2705;|*없음*|리스너를 설정하는 옵션들
options.signal|AbortSignal|&#x2705;|*없음*|Promise를 취소하기 위한 AbortController의 AbortSignal
options.defaultExport|boolean|&#x2705;|true|기본 export와 매칭될 때 기본 export를 반환할지 여부
options.searchExports|boolean|&#x2705;|false|webpack exports에서 필터를 실행할지 여부

**반환값:** `Promise.<any>` - 기다린 보람이 있을 거예요! 💝
___
