---
order: 2
description: Webpack 모듈 추출하기 - 디스코드의 숨겨진 보물찾기! 🎯
---

# Webpack 모듈 🎁

Discord Environment 가이드와 번들링 가이드를 읽으셨다면, 이미 Webpack이 무엇인지 아시겠죠! 디스코드가 Webpack을 사용한다는 것도, Webpack이 여러분의 코드 모듈들을 하나의 큰 파일로 번들링한다는 것도 말이에요. 그럼 플러그인 개발에서 Webpack 모듈에 대해 이야기할 때는 무엇을 의미하는 걸까요? 바로 디스코드의 Webpack 인스턴스를 통해 얻어오는 디스코드 자체의 모듈들을 말하는 거예요! 😊

디스코드의 webpack 모듈들을 제대로 노출시키고 플러그인에서 사용하고 수정할 수 있게 만들려면 백그라운드에서 꽤 많은 작업이 필요해요. 하지만 다행히도 BetterDiscord가 이 모든 걸 대신 처리해주고, `BdApi.Webpack` 네임스페이스 아래에 편리한 API까지 제공해준답니다! 아래에서 이 API를 어떻게 사용하는지 배워보실 거예요.

## 모듈의 종류들 🗂️

디스코드는 정말 다양한 종류의 모듈들을 내보내는데, 내부 구조는 우리가 모르는 사이에 항상 변하고 있어요. 하지만 우리는 최선을 다해 따라가고 있답니다! 그럼 디스코드에서 가장 자주 볼 수 있는 모듈 타입들은 무엇일까요?

| 타입 | 설명 |
|:-----|:------------|
|React 컴포넌트|함수형, 클래스형, 또는 메모화된 React 컴포넌트들이에요.|
|스토어(Stores)|정보를 로컬에 저장하거나 캐시하는 모듈들입니다.|
|클래스들(Classes)|**CSS 클래스 이름들**을 저장하는 모듈들이에요.|
|유틸리티들(Utilities)|보통 도움이 되는 함수들을 논리적으로 그룹화한 것들입니다.|
|상수들(Constants)|문자열이나 열거형 같은 상수 값들의 큰 목록들이에요.|
|외부 모듈들(External)|React 같은 외부에서 포함된 모듈들입니다.|

플러그인들은 BetterDiscord의 API를 통해 이 모든 타입의 모듈들에 접근할 수 있어요. 가장 자주 사용되는 두 가지는 정보를 가져오고 표시하는 데 쓰이는 `스토어`와, [다음 가이드](./react.md)에서 다룰 패칭에 사용되는 `React 컴포넌트`입니다.

## 모듈 찾기 🔍

그럼 실제로 이런 모듈들을 어떻게 찾을까요? 먼저 우리가 사용할 수 있는 도구들을 살펴보죠. 물론 [개발자 가이드](../../developers/devtools.md)에서 이야기했던 Chromium 개발자 도구가 있어요. 이건 정말 필수적인 도구죠! 하지만 BetterDiscord의 Webpack API도 있답니다. 이 네임스페이스의 전체 목록을 보고 싶으시면 [API 참조](../../api/webpack.md)를 확인해보세요. 여기서는 가장 자주 사용되는 것들을 다뤄볼 거예요.

## 필터들 🎯

모듈을 검색하는 API는 "필터"라는 개념을 사용해요. 본질적으로 필터는 모듈의 참조를 받아서 원하는 모듈이면 `true`를, 아니면 `false`를 반환하는 함수일 뿐이에요. 이런 필터들을 만드는 능력이 중요하고, API에서 이를 쉽게 만들어주는 헬퍼 함수들이 있어요.

| 필터 | 설명 |
|:-------|:------------|
|Display Name|입력값과 일치하는 `displayName` 속성을 가진 모듈을 매치해요.|
|Keys|키 목록과 일치하는 모듈을 매치합니다.|
|Prototype Keys|`prototype`을 가지고 있고 그 `prototype`이 키 목록과 일치하는 모듈을 매치해요.|
|Regex|문자열화했을 때 정규식 패턴과 일치하는 모듈을 매치합니다.|
|Store Name|주어진 내부 이름으로 스토어를 매치해요.|
|Strings|문자열화했을 때 문자열 세트를 포함하는 모듈을 매치합니다.|

물론 이런 헬퍼들을 전혀 사용하지 않아도 돼요! 완전히 커스텀 함수를 사용해서 `BdApi.Webpack.getModule`에 전달할 수 있거든요.

## 리버스 엔지니어링 🕵️‍♀️

::: warning 주의사항 ⚠️

클라이언트 모딩의 특성상, 디스코드의 내부 구조는 항상 변하고 있어서 여러분이 이걸 읽을 때쯤엔 이 섹션이 구식일 수도 있어요. 하지만 여기서 사용되고 배우는 개념들은 그대로 유지된답니다!

:::

이제 어떤 정보로 검색할 수 있는지 알았으니, 원하는 모듈을 실제로 어떻게 찾을까요? 그리고 찾은 다음에는 그게 실제로 접근 가능한지 어떻게 알 수 있을까요? 디스코드의 일부 모듈들은 완전히 래핑되어 있어서 이 API나 어떤 종류의 리플렉션으로도 접근할 수 없다는 점을 기억해 주세요.

하지만 이런 질문들에 답하기 위해 아주 간단한 예제를 차근차근 살펴보죠. 프로그래밍 방식으로 설정을 열고 싶다고 해봅시다. 설정 버튼이 그걸 할 수 있다는 걸 아니까, 거기서 시작해볼게요. 먼저 그 요소를 선택하고 콘솔에서 `$0`으로 출력해보세요. 자동완성에서 `__reactFiber$2oq7t5kq3k5` 같은 속성이 보일 거예요. 그걸 선택해서 출력해보세요. 이게 React가 현재 이 노드에 대해 가지고 있는 데이터예요. 이걸 사용하면 React가 어떻게 작동하는지 이해하고 디스코드에서 리버스 엔지니어링을 시작하는 좋은 방법이 될 거예요. 이걸 통해 React 트리를 걸어다니며 React가 알고 있는 모든 요소들을 볼 수 있어요. 하지만 우리는 `onClick` 리스너를 본질적으로 복제하고 싶어하므로 이 `button`의 속성들에 더 관심이 있어요.

이제 대신 `__reactProps$2oq7t5kq3k5` 같은 속성을 출력해보세요. 이 객체에서 `onClick` 함수를 포함한 이 요소에 특정한 모든 React props를 볼 수 있을 거예요. 이걸 우클릭해서 `Show Function Definition`을 선택하거나 함수를 펼쳐서 함수 위치를 클릭해서 살펴보죠.

::: details 우클릭 방법
![right_click](./img/right_click.png)
:::

::: details 함수 위치 방법
![function_location](./img/function_location.png)
:::

그러면 이해하기 어려운 큰 압축된 스크립트로 이동하게 될 거예요. 하지만 소스 패널의 왼쪽 아래에 작은 `{}` 아이콘이 보일 거예요. 그걸 클릭하면 파일이 포맷되고 아름답게 정리되어서 어느 정도 이해할 수 있게 될 거예요.

::: details 압축된 상태
![click_minified](./img/click_minified.png)
:::

::: details 정리된 상태
![click_script](./img/click_script.png)
:::

이 클릭 리스너에서 보는 걸로는 `u()` 함수가 실제로 이벤트를 받아서 처리하는 것 같아요. 이 리스너 안에 브레이크포인트를 설정하고 버튼을 클릭해보죠. 이렇게 하면 이 시점에서의 모든 값들이 표시되고 `u`의 값을 알아낼 수 있을 거예요.

![breakpoint_click](./img/breakpoint_click.png)

오른쪽 아래 패널을 보세요. `u`는 현재 클로저의 일부인 것 같고 다른 스크립트의 함수에 해당해요. 다시 한 번 그 스크립트의 소스를 보고 정리해봅시다. 이렇게 하면 `handleOpenAccountSettings`라는 함수로 이어지는데, 이 함수는 `handleOpenSettings`를 호출하고 있어요. 이 함수도 바로 거기 있답니다. 설정을 여는 것 같고, `h.Z.open`을 호출해요. 알아내는 가장 쉬운 방법은 다시 한 번 브레이크포인트를 사용하는 거예요.

![breakpoint_handle](./img/breakpoint_handle.png)

여기서 `h`는 여러 함수를 가진 객체라는 걸 발견해요. `open` 함수를 선택해서 소스를 보고 정리해보세요. 이 함수가 `m`이라는 객체의 일부라는 걸 즉시 볼 수 있어요. 그럼 이게 어딘가에서 내보내져서 접근할 수 있는지 알아내야 해요. 위로 스크롤해서 이런 패턴과 일치하는 걸 찾을 수 있는지 보죠:

```js
  9999: (e,t,n)=>{
    "use strict";
    n.d(t, {
        Z: ()=>po
        kWm: ()=>lP
        ... // 등등
    })
```

바로 위에서 그런 작은 섹션을 빠르게 찾을 수 있어요.

![exports](./img/exports.png)

그리고 `Z`가 우리의 객체 `m`에 해당하는 것 같네요. 완벽해요! 이는 우리의 객체가 내보내져서 접근 가능하다는 뜻이에요.

## 필터 만들기 🛠️

위의 모듈 내보내기를 보면, 우리의 객체 `m`이 모듈의 루트에 직접 내보내지지 않고 `Z` 키에 내보내진다는 걸 알 수 있어요. `Z`는 일반적으로 ESM 스타일 모듈에서 `default` 내보내기였다는 의미예요. 이런 일이 너무 자주 일어나서, BetterDiscord의 API는 다르게 지시하지 않는 한 자동으로 기본 내보내기를 검색하고 *그것을 반환*할 거예요.

하지만 어떻게 이걸 위한 필터를 만들까요? 돌아가서 우리의 `m` 객체를 보세요. `open` 외에도 더 많은 키들이 있을 거예요. 그래서 `getByKeys`가 우리의 최선의 선택일 가능성이 높아요. `open`과 함께 갈 다른 키 하나 둘을 선택해서 `BdApi.Webpack.getByKeys`를 사용해보죠. 우리는 `updateAccount`를 사용할 거예요.

![webpack_bykeys](./img/webpack_bykeys.png)

바로 거기 있어요! 우리가 원했던 객체와 우리가 원했던 함수가 말이에요. 또한 `Z`에 래핑된 객체가 아닌 객체 자체를 반환했다는 것도 눈치채셨을 거예요. 학습을 위해 이 기능을 비활성화하고 어떤 일이 일어나는지 보죠.

![default_export](./img/default_export.png)

이제 `Z`가 다시 나타났고 BetterDiscord는 기본 내보내기만이 아닌 전체 모듈을 반환했어요. 그럼 객체를 직접 사용하고 싶으니까 첫 번째 버전을 고수하죠. 그리고 `open` 함수 정의를 보고 어떻게 작동하는지 알아내서 사용할 수 있게 해봅시다.

![open](./img/open.png)

이 함수는 가변 개수의 인수(최대 3개)를 받을 수 있는 것 같지만, 일반적으로 2개 `e`와 `t`를 예상해요. 사용되는 곳을 보면 각각 `section`과 `subsection`에 해당해요. 이제 여러분은 브레이크포인트의 전문가가 되셨을 테니, 한 번 더 해보고 설정 버튼을 클릭했을 때 여기서 어떤 값들이 나오는지 기록해봅시다.

결과적으로 인수 `t`는 우리 사용 사례에서는 전혀 사용되지 않고, `e`는 `My Account`로 설정되어 있어요. 영어로 디스코드를 사용하는 분들에게는 설정을 처음 열 때 활성 탭의 이름이죠. 그럼 이제 프로그래밍 방식으로 설정을 쉽게 열 수 있다는 뜻이에요!

```js
const SettingsOpener = BdApi.Webpack.getByKeys("open", "updateAccount");
SettingsOpener.open("My Account");
```

콘솔에서 이걸 실행해보면 설정 패널이 나타날 거예요! 여기까지 오셨다면 축하드려요. 디스코드에서의 리버스 엔지니어링에 대한 속성 과정이었거든요! 더 많은 정보에 관심이 있으시면 계속 읽어보세요. 그렇지 않으면 언제든지 다음 가이드로 넘어가셔도 좋아요.

## 추가 정보 💡

### getWithKey

앞에서 본 이 패턴을 기억하시나요?

```js
  9999: (e,t,n)=>{
    "use strict";
    n.d(t, {
        Z: ()=>po
        kWm: ()=>lP
        ... // 등등
    })
```

`Z`가 여기서 유일한 옵션이 아니라는 걸 눈치채셨나요? `kWm`도 있고, 이는 모듈의 다른 잠재적 내보내기들을 나타내요. 디스코드는 [SWC](https://swc.rs/)를 사용해서 코드를 트랜스파일하고 내보내기의 이름을 이런 식으로 읽을 수 없는 것들로 망글링해요. 키가 가리키는 내보내기가 객체라면 괜찮아요. 하지만 키가 함수를 직접 가리킬 때는, [함수 패칭](./patching.md)을 수행하기 위해 키의 이름도 필요할 거예요.

다행히도 BetterDiscord에는 수동으로 하기에는 너무 답답할 수 있는 이런 경우를 위한 API가 있어요. `BdApi.Webpack.getWithKey`라고 하는데, 이름에서 알 수 있듯이 해당 키와 함께 모듈/값을 가져와요. 간단한 사용 예제를 볼까요:

```js
const [ctxMenuModule, openKey] = BdApi.Webpack.getWithKey(m => m?.toString?.()?.includes(`n?n(e()):n`), {searchExports: true});
Patcher.after(ctxMenuModule, openKey, ...);
```

여기서는 디스코드에서 컨텍스트 메뉴를 여는 함수를 찾고 즉시 이 값들을 사용해서 함수를 패치하고 있어요. 타겟팅하는 모듈에 맞는 어떤 필터와도 함께 `getWithKey`를 사용할 수 있어요.

### searchExports

바로 위 예제에서 `{searchExports: true}`를 사용한 걸 아마 눈치채셨을 거예요. 이는 모든 Webpack API에서 사용할 수 있는 옵션인데, BetterDiscord가 전체 모듈을 한 번에 테스트하는 대신 모든 모듈의 모든 내보내기를 반복해서 필터와 일치하는지 확인하게 해줘요. 키를 사용한 패칭이 중요하지 않기 때문에 객체, 클래스, 인스턴스화를 검색할 때 플러그인에서 많이 사용돼요.