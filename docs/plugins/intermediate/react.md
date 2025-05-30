---
order: 1
description: 플러그인에서 React 사용법을 배워보아요!
---

# React

::: tip 꿀팁! 💡

이 문서는 일반적인 React 튜토리얼이 아니라, Discord와 BetterDiscord에서 React를 사용하는 방법에 대한 내용이에요! React 전반에 대한 학습과 문서는 [React.dev](https://react.dev/learn)에서 확인해보세요.

:::

Discord 자체가 React로 만들어져 있어서, 플러그인에서 React를 사용하는 것이 정말 쉬워요! 🎉 나중에 다룰 [React Injection](../advanced/react.md)에도 매우 유용하답니다.

앞으로 진행하면서 꼭 기억해야 할 점이 하나 있어요: [번들링(bundling)](./bundling.md) 없이는 플러그인에서 JSX 스타일의 React 컴포넌트를 사용할 수 없어요. 그래서 이 섹션에서는 JSX 없이 진행할 예정이에요.

## 기본기 다지기

BetterDiscord는 `BdApi` 객체에 `React`와 `ReactDOM` 전역 변수를 제공해요. 이를 통해 함수형 컴포넌트를 만들거나, 클래스 기반 컴포넌트를 만들거나, 심지어 기존 DOM 노드에 렌더링할 수도 있어요! 아래 예제를 보면서 여러분의 플러그인에서 어떻게 활용할 수 있는지 감을 잡아보세요. 😊

::: code-group
```js:line-numbers [클래스형]
class MyComponent extends BdApi.React.Component {
  render() {
    return BdApi.React.createElement("div", {className: "my-component"}, "안녕하세요!");
  }
}
```

```jsx:line-numbers [함수형]
function MyComponent() {
  return BdApi.React.createElement("div", {className: "my-component"}, "안녕하세요!");
}
```
:::

함수형 컴포넌트의 훅(hooks)이나 클래스 기반 컴포넌트의 상태(state)도 완벽하게 작동해요!

::: code-group
```js:line-numbers [클래스형]
class MyComponent extends BdApi.React.Component {
  constructor(props) {
    this.state = {disabled: props.disabled ?? false};
  }
  render() {
    return BdApi.React.createElement("button", {className: "my-component", disabled: this.state.disabled}, "안녕하세요!");
  }
}
```

```jsx:line-numbers [함수형]
function MyComponent({disabled = false}) {
  const [isDisabled, setDisabled] = BdApi.React.useState(disabled);
  return BdApi.React.createElement("button", {className: "my-component", disabled: isDisabled}, "안녕하세요!");
}
```
:::

`BdApi.React`를 계속 반복하는 게 좀 번거롭다고 생각하시나요? 많은 개발자들이 자신의 플러그인에서 간단히 `const R = BdApi.React;`나 `const ce = BdApi.React.createElement;`처럼 별칭을 만들어 사용해요. 그렇지 않은 개발자들은 대부분 JSX와 번들링을 사용하는데, 이건 다음 챕터에서 다뤄볼 예정이에요!

## BetterDiscord에서의 React

BetterDiscord의 일부 [UI 관련 함수들](../../api/ui.md)은 렌더링할 옵션으로 React 컴포넌트를 받아요. 일부는 React 노드/엘리먼트를 받는데, 이건 이미 `createElement`를 호출한 것들이에요. 좋은 예시 중 하나가 확인 모달(confirmation modal)이에요. 이미 매우 유용한 유틸리티인데, 여기에 커스텀 React 컴포넌트를 추가하면 사용자에게 정말 강력한 UI와 UX를 제공할 수 있어요! 간단한 예시로, 앞서 만든 `MyComponent`를 확인 모달과 결합해보는 방법을 살펴보세요.

```js
BdApi.showConfirmationModal("내 컴포넌트 데모", BdApi.React.createElement(MyComponent));
```

그러면 이렇게 보여요!

![Plugin Modal](./img/plugin_modal.png)

어떻게 사용할지는 완전히 여러분 마음이에요! 간단한 텍스트 정보부터 완전한 설정 패널까지 모달에 뭐든지 넣을 수 있어요.

설정 패널 얘기가 나왔으니 말인데, [플러그인 구조](../introduction/structure.md)에서 플러그인이 React 컴포넌트를 반환하는 `getSettingsPanel()`을 가질 수 있다는 걸 기억하시나요? 간단한 예제를 위해 아래 샘플 플러그인을 살펴보세요.

```js:line-numbers [MyComponentDemo.plugin.js]
/**
 * @name 내 컴포넌트 데모
 * @description 커스텀 React 컴포넌트로 설정 패널 보여주기
 * @version 1.0.0
 * @author BetterDiscord
 */

function MyComponent({disabled = false}) {
  const [isDisabled, setDisabled] = BdApi.React.useState(disabled);
  return BdApi.React.createElement("button", {className: "my-component", disabled: isDisabled}, "안녕하세요!");
}

module.exports = class test { 
  start() {}
  stop() {}

  getSettingsPanel() {
    return MyComponent;
  }
}
```

여러분의 플러그인이 설정 패널을 가지고 있다고 표시될 거예요.

![Plugin Card](./img/plugin_card.png)

그리고 클릭하면 새로운 설정 패널이 나타나요! 

![Plugin Settings](./img/plugin_settings.png)

최고의 설정 패널은 아닐 수도 있지만, 확실히 시작이에요! 😄

## Discord에서의 React

React를 이미 알고 계시다면, 이 섹션은 꽤 명백할 거예요. Discord 내부에 React 컴포넌트를 렌더링하려면, 먼저 어딘가에 자신만의 `HTMLElement`를 추가하세요.

```js
const element = BdApi.DOM.parseHTML("<div>");
const target = document.querySelector(".container-YkUktl");
target.append(element);
```

그다음 이전 섹션의 엘리먼트를 그 DOM 노드에 렌더링하면 돼요.

```js
BdApi.ReactDOM.render(BdApi.React.createElement(MyComponent), element);
```

이 튜토리얼을 따라하고 계시다면, 클라이언트 왼쪽 하단의 설정 톱니바퀴 옆에 작은 버튼이 나타나는 걸 보실 수 있을 거예요. 컴포넌트 사용이 끝나면 언마운트하는 걸 잊지 마세요.

```js
BdApi.ReactDOM.unmountComponentAtNode(element);
```

그러면 버튼이 사라져요! ✨

한 가지 주의할 점은, Discord가 계속해서 엘리먼트들을 이동시키기 때문에, 여러분의 엘리먼트가 `document`에서 제거되면 컴포넌트를 언마운트해야 한다는 거예요. 그렇지 않으면 메모리 누수가 발생할 거예요. 또한 사용자에게 보이지도 않는 UI를 계속 사용하려고 할 수도 있고요. [DOM 사용하기](../basics/dom.md)의 `MutationObserver`와 `unmountComponentAtNode` 함수를 결합해서 여러분의 엘리먼트가 `document`에서 제거될 때마다 자동으로 언마운트하도록 할 수 있어요.

마지막으로, 이렇게 하면 Discord 클라이언트 내부에 React가 렌더링되긴 하지만, 실제로는 Discord의 React 트리의 일부로 렌더링되는 건 아니에요. 이게 별거 아닌 것처럼 보일 수 있지만, 실제로는 작동하는 것과 작동하지 않는 것의 차이를 만들 수 있어요. Discord의 내부 컴포넌트, 특히 팝아웃과 툴팁이 포함된 컴포넌트들을 재사용하는 경우, Discord 트리 외부에서는 작동하지 않을 거예요. Discord의 React 트리 내부에서 렌더링하는 것에 관심이 있으시다면, 나중에 [React Injection](../advanced/react.md)에서 더 자세히 배우실 수 있어요! 🚀
