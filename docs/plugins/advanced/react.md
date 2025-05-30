---
order: 3
description: 기존 React 트리에 요소 추가하기 - 디스코드 UI에 나만의 컴포넌트 심기! 🌱
---

# React 주입 💉

이 가이드는 [함수 패칭](./patching.md)과 관련이 있어요. 그 가이드를 아직 읽지 않으셨다면 계속하기 전에 먼저 살펴보세요!

## 배경 지식 📚

### React 주입이 무엇을 의미하나요?

React 주입이라고 하면, 디스코드가 사용하는 React 렌더 트리에서 컴포넌트를 추가/제거/변경하는 것을 말해요. 가이드의 [React](../intermediate/react.md) 섹션에서는 `ReactDOM`을 사용해서 우리 자신의 컴포넌트를 렌더링하는 걸 다뤘는데, 이는 디스코드 트리 외부에서 렌더링되는 우리만의 React 트리를 만드는 거였어요. 주입을 사용하면 우리 자신의 요소로 디스코드 트리의 일부가 되거나, 렌더링이 완료되기 전에 디스코드의 트리를 수정할 수 있어요.

### 왜 이게 필요할까요?

1. [Webpack 검색](./webpack.md)을 통해 찾은 디스코드 자체의 컴포넌트들을 활용하고 싶다면, 그 중 많은 것들이 서로 다른 React Context에 의존하기 때문에 디스코드 트리 내부에서 렌더링되어야 해요.
2. UI에 컴포넌트를 추가하면서 요소를 지속적으로 다시 추가하기 위해 `onRemoved`나 `MutationObserver`를 사용하는 걱정을 하고 싶지 않다면, 렌더 함수를 패칭하는 것이 일관성을 유지해줘요.
3. 디스코드의 UI를 완벽하게 수정하고 싶다면 말이에요.

### 어떻게 할 수 있나요?

::: warning 조심하세요! ⚠️

가능한 한 오류에 안전한 방식으로 변경하는 것이 중요해요. React 오류는 루트 노드까지 전파되는 경향이 있어서 "클라이언트 크래시" 화면을 보여줄 수 있거든요.

:::

함수 패칭을 이해하셨다면 이미 절반은 온 거나 다름없어요! 노출된 모듈에서 React 컴포넌트를 찾고 `after` 패치로 렌더 함수를 오버라이드해야 해요. 거기서 렌더된 React 노드들을 걸어다니며 변경하고 싶은 곳을 찾아야 하죠. `BdApi`에는 이를 도와주는 순회 유틸리티들이 있어요. 연습에서 더 자세히 보실 거예요. 그 다음에는 변경사항을 만들어야 해요.

## 연습해보기 🎯

### 준비하기

::: warning 참고사항 📝

클라이언트 모딩의 특성상, 디스코드의 내부 구조는 항상 변하고 있어서 여러분이 이걸 읽을 때쯤엔 이 섹션이 구식일 수도 있어요. 하지만 여기서 사용되고 배우는 개념들은 그대로 유지된답니다!

:::

이 가이드를 진행하기 전에 [개발자 도구](../../developers/devtools.md), [함수 패칭](./patching.md), [Webpack](./webpack.md) 가이드를 모두 보시고 React 개발자 도구를 모두 설정해주세요.

이번 연습에서 타겟으로 삼을 것은 DM 목록 상단의 작은 섹션이에요.

![react_target](./img/react_target.png)

### 타겟 찾기 🎯

여기에 새 버튼을 추가하고 싶으니까, React 개발자 도구의 컴포넌트 패널에서 이걸 선택해보죠. 아니면 최소한 가장 가까운 부모를 선택해보세요. 이런 걸 찾게 될 거예요.

![react_parent](./img/react_parent.png)

하지만 오른쪽의 `props`를 보세요. 이건 재사용 가능한 간단한 컨테이너일 뿐이고 이 컴포넌트에 특정하지 않은 것 같아요. 다른 곳에서도 효과가 나타날 수 있기 때문에 패칭하기에는 좋은 타겟이 아니에요. 잠재력이 있어 보이는 첫 번째 것은 아래와 같아요.

![react_candidate](./img/react_candidate.png)

이 컴포넌트를 살펴보고 이전 장에서 했던 것처럼 내보내지는지 확인해보죠. 시작하려면 컴포넌트의 소스를 보기 위해 클릭하세요.

![view_source](./img/view_source.png)

그리고 물론 왼쪽 아래 버튼으로 코드도 정리해주세요. 이런 렌더 함수를 보게 될 거예요.

![react_render](./img/react_render.png)

지난 장에서 했던 것처럼 위로 스크롤해서 이 `i`가 내보내지는지 확인해보죠. 스크롤하다 보면 `i`는 이 모듈 내부에 래핑되어 있고 맨 위에 도달하면 `z`라는 객체만 내보내지는 걸 볼 수 있어요.

![react_exports](./img/react_exports.png)

다시 스크롤해서 `i`를 내부적으로 사용하지만 다른 방식으로는 노출하지 않는 이 `z`를 찾을 수 있어요. React 개발자 도구의 컴포넌트 패널로 돌아가서 다른 후보를 찾을 때까지 이 서브트리를 계속 올라가봅시다. 우리 서브트리의 맨 위에서 하나를 찾았어요.

![react_ancestor](./img/react_ancestor.png)

소스를 다시 한 번 보죠. 코드가 이상하게 친숙해 보이고 이미 포맷되어 있어요. 실제로는 전에 보던 것과 같은 모듈이에요! 다만 이번에는 `z` 컴포넌트를 사용하고 있으니까, 이게 내보내진다는 걸 알고 있으므로 우리의 타겟을 찾은 거예요.

### 타겟 가져오기 🎣

우리 버튼을 추가하는 다음 단계는 Webpack 모듈 검색을 통해 이 컴포넌트를 필터링할 방법을 찾는 거예요. 가장 쉬운 방법은 키를 사용하는 것이니까, 이 `z` 객체를 보고 사용할 수 있는 게 뭐가 있는지 확인해봅시다.

![react_component](./img/react_component.png)

불행히도 이건 함수형 컴포넌트라서 의존할 키나 프로토타입이 없어요. 여기서 좋은 옵션은 문자열로 검색하는 건데, 고유하면서도 변경에 안정적인 걸 사용하고 싶어요. 이게 개인 채널 목록 컴포넌트인 것 같으니까, 그와 관련된 건 대부분의 업데이트에서 일관성이 있을 거예요. 이 함수의 상단 근처에서 `getPrivateChannelIds` 호출을 볼 수 있으니까, 이걸로 시도해보죠.

먼저 `getAllByStrings`를 사용해서 몇 개의 결과를 얻는지 확인하고 싶어요. 문자열 선택이 우리가 타겟으로 하는 컴포넌트_만_을 선택할 만큼 구체적인지 확인하기 위해서죠.

![webpack_allstrings](./img/webpack_allstrings.png)

이 문자열이 잘 작동하는 것 같아요. 컴포넌트를 하나만 얻었고, 바로 우리가 타겟으로 하는 컴포넌트예요. 하지만 패칭으로 넘어가기 전에 `getByStrings`로 얻는 반환값을 보세요. 함수 자체만 얻었어요. [우리 가이드](./patching.md)에서 함수 패칭을 기억한다면 이것만으로는 패치하기에 충분하지 않다는 걸 알 거예요. 하지만 이 함수가 기본 내보내기라는 걸 알고 있으니까, 반드시 `getWithKey`를 사용할 필요는 없어요. [Webpack](./webpack.md) 가이드에서 이야기했듯이 `{defaultExport: false}`를 추가하기만 하면 돼요.

```js
BdApi.Webpack.getByStrings("getPrivateChannelIds", {defaultExport: false});
```

### 타겟 패칭하기 🔧

이제 타겟 컴포넌트와 키 `Z`를 얻었으니, 실제로 컴포넌트를 패칭할 수 있어요. 우리가 하고 싶은 일을 이해하는 가장 쉬운 방법은 실제로 보는 거예요. 그럼 실행해봅시다! 콘솔에서 직접 이걸 시도해볼 수 있어요.

```js
const PrivateChannels = BdApi.Webpack.getByStrings("getPrivateChannelIds", {defaultExport: false});
BdApi.Patcher.after("debug", PrivateChannels, "Z", (_, __, returnValue) => {
    console.log(returnValue);
});
```

이 간단한 패치로 모든 렌더 호출에서 반환값을 로그아웃하지만 원래 반환값이 여전히 작동하게 할 거예요. 이게 설정된 상태로 길드로 전환했다가 DM 목록으로 다시 돌아가보세요. 콘솔에 새로운 로그가 보일 거예요.

::: details 우클릭 방법
![return_value](./img/return_value.png)
:::

::: details 함수 위치 방법
![return_value_expanded](./img/return_value_expanded.png)
:::

여기서 보는 건 이런 렌더 호출 중 하나의 상당히 전형적인 결과예요. 잠깐 시간을 내서 구조에 익숙해지세요. 앞으로 훨씬 더 많이 보게 될 가능성이 높거든요. 하지만 컴포넌트를 어디에 추가할지 보고 싶으니까, 위의 두 번째 이미지에서 했던 것처럼 트리를 펼쳐보세요.

이미지에서 커서 근처의 객체들을 보세요. 바로 우리가 렌더링하고 싶은 곳인 것 같아요. 이 객체까지의 객체 경로를 기록하거나 내장 도구를 사용해서 복사하세요.

![react_path](./img/react_path.png)

`returnValue.props.children.props.children` 같은 경로가 나올 거예요. 또한 이게 자식들의 배열이라는 것도 확인하세요. 그래서 특별한 처리 없이 이 배열에 그냥 추가하는 게 충분히 쉬워요. 우리 패치에서 시도해봅시다.

::: tip 팁! 💡

후속 패치를 하기 전에 `BdApi.Patcher.unpatchAll("debug")`로 이전 패치들을 취소하는 게 좋은 아이디어예요.

:::

```js
const PrivateChannels = BdApi.Webpack.getByStrings("getPrivateChannelIds", {defaultExport: false});

BdApi.Patcher.after("debug", PrivateChannels, "Z", (_, __, returnValue) => {
    const myElement = BdApi.React.createElement("button", null, "안녕하세요 세상!");
    returnValue.props.children.props.children.push(myElement);
});
```

이 패치는 이 버튼 목록에 `안녕하세요 세상`이라고 하는 간단한 버튼을 추가할 거예요. 패치한 후에는 다시 렌더링을 트리거하기 위해 뷰를 전환해주세요.

![our_button](./img/our_button.png)

됐어요! 우리가 만든 React 버튼이 디스코드의 React 트리 내부에서 디스코드의 UI 내부에서 렌더링되고 있어요. 더 복잡한 상황들도 있지만, 이건 여러분이 시작하는 데 좋은 발판이 될 거예요. 더 관심이 있으시면 아래에 추가 정보가 있어요.

## 팁과 트릭 💫

### 오류 안전성

패치가 위험하거나 오류 가능성이 있다면, 패치에 어떤 종류의 오류 안전성을 추가해야 해요. 코드 자체가 위험하거나 복잡하다면, `catch`에서 원래 반환값을 반환하는 `try..catch`를 사용해보세요.

```js
try {
    // 내 패치 정보
}
catch {
    return returnValue;
}
```

오류가 클라이언트를 크래시시키는 걸 방지하기 위해 오류 경계를 활용할 수도 있어요. 구현에 대한 정보는 React의 [이 글](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)을 참고하세요.

### 다중 패칭

패치를 만들 때 염두에 둘 점 중 하나는 특정 컴포넌트를 패치하려고 시도하는 플러그인이 여러분만이 아닐 수도 있다는 거예요. 서로 호환성을 크게 개선하는 몇 가지 빠른 단계가 있어요.

자식 컴포넌트가 존재하지 않는 곳에 추가하고 싶다고 해봅시다. `children` 속성을 여러분의 컴포넌트로 설정하기만 하면 간단하죠? 이건 잘 작동하지만 다른 플러그인이 같은 걸 하고 싶다면 어떨까요? 미래의 패치들이 배열에 추가할 수 있도록 배열 `[]`로 시작하는 게 더 나았을 거예요.

일반적으로 자식들에 배열을 사용하는 것이 선호돼요. 컴포넌트를 추가하든, 수정하든, 제거하든, 모든 걸 배열 형태로 남겨두려고 노력하는 것이 모든 사람에게 더 쉬워요.

### 트리 순회

연습에서의 예제로 돌아가봅시다. 패치에 속성 경로를 직접 사용했는데 이는 깨지기 매우 취약해요. 디스코드가 거기서 구조를 조금이라도 바꾸면 우리 패치는 작동하지 않을 거예요. 게다가 오류를 일으켜서 잠재적으로 클라이언트를 크래시시킬 수도 있어요. 어떻게 다르게 할 수 있을까요? 음, 우리는 버튼 배열에 추가하고 싶었고 버튼들은 그들을 식별하는 `key` 값을 가지고 있다는 걸 알아요. 하지만 우리는 버튼 자체가 아니라 `children` 배열을 원해요. 그럼 그 배열과 일치할 수 있는 필터는 어떤 종류일까요? `children.some(element => element.key === "friends")`.

이걸 `BdApi.Utils.findInTree()`와 결합해서 트리 어디서든 이 특정 배열을 자동으로 찾을 수 있어요. 먼저 `findInTree`가 3개의 인수를 받는다는 걸 알아야 해요. 첫 번째는 걸어다닐 트리예요. 이미 있어요. 다음은 확인되는 모든 속성에 대해 체크되는 필터예요. 이것도 있어요. 마지막은 어떤 키들을 걸어다녀야 하는지 같은 설정이 있는 객체예요. 이 경우 항상 `children` 배열을 찾고 있으니까, `props`와 `children`만 걸어다니면 돼요.

```js
const myFilter = prop => Array.isArray(prop) && prop.some(element => element.key === "friends");
BdApi.Utils.findInTree(returnValue, myFilter, {walkable: ["props", "children"]});
```

앞서의 반환값으로 이걸 실행하면 정확히 예상한 대로 작동해요.

![tree_traversal](./img/tree_traversal.png)

계속하기 전에 필터에 `Array.isArray()` 체크를 추가했다는 걸 확인하세요. `props`도 걸어다니지만 배열이 아닐 거라서 그에 대해 보호하고 싶었거든요.

이제 실제로 앞서의 패치를 다시 작성할 수 있어요.

```js
const myFilter = prop => Array.isArray(prop) && prop.some(element => element.key === "friends");
const PrivateChannels = BdApi.Webpack.getByStrings("getPrivateChannelIds", {defaultExport: false});

BdApi.Patcher.after("debug", PrivateChannels, "Z", (_, __, returnValue) => {
    const myElement = BdApi.React.createElement("button", null, "안녕하세요 세상!");
    const buttons = BdApi.Utils.findInTree(returnValue, myFilter, {walkable: ["props", "children"]});
    // highlight-next-line
    buttons?.push(myElement);
});
```

쉬운 변경이지만 코드를 훨씬 더 견고하게 만들어요. 그리고 강조된 줄을 보세요. 옵셔널 체이닝 연산자 `?.`를 사용하고 있는데, 이는 디스코드 변경으로 인해 `findInTree`가 타겟을 찾을 수 없는 경우에 우리를 보호해줄 거예요. 이제 이 기법을 가져가서 가장 복잡한 패치도 업데이트에 훨씬 더 견고하게 만들 수 있어요.