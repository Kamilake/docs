---
order: 2
description: DOM 조작 사용법을 알아봅시다.
---

# DOM 사용하기

DOM에 대해 잘 모르신다면 [MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)를 한번 살펴보시는 걸 추천해요! 정말 유용한 자료들이 가득하거든요. 🤓

[이전 페이지](../introduction/environment)에서 배웠듯이 Discord는 본질적으로 Chromium 브라우저예요. 그래서 우리는 일반적인 방법으로 DOM에 접근할 수 있답니다!

```js
// document에 대한 참조 생성하기
const myDocument = document;

// 요소 생성하기
const myElement = document.createElement("div");

// 선택자로 기존 요소 가져오기
const existingElement = document.querySelector(".button");

// 이벤트 리스너 추가하기
existingElement.addEventListener("click", () => {console.log("클릭됐어요!");});
```

위의 모든 내용이 익숙하셨으면 좋겠지만, 만약 그렇지 않다면 이 페이지 시작 부분의 MDN 링크를 확인해보세요! 정말 도움이 될 거예요. ✨

이제 Discord 플러그인에 이를 어떻게 적용할 수 있는지 알아볼까요? 클릭하면 알림을 보여주는 버튼을 추가하는 예제를 한번 시도해봅시다! 뭔가 이렇게 생겼을 거예요:

```js
const myButton = document.createElement("button");
myButton.textContent = "날 클릭해봐!";
myButton.addEventListener("click", () => {window.alert("안녕하세요 세상!");});
const root = document.getElementById("app-mount");
root.append(myButton);
```

Discord 클라이언트의 콘솔에서 바로 이걸 시도해볼 수 있어요! 화면 하단에 버튼이 나타나는 걸 보실 수 있을 거예요. 클릭하면 `안녕하세요 세상!` 팝업이 나타날 거구요! 신기하죠? 😄

이 코드에서 주목할 점은 루트 컨테이너 `document.getElementById("app-mount")`예요. Discord는 프론트엔드 렌더링 시스템으로 React를 사용하기 때문에, 앱이 일반 DOM 계층구조에 "마운트"되어야 해요. 일반적으로 이건 ID가 `app-mount`인 루트 컨테이너에서 일어나죠.

그런데 이 방법이 작동하긴 하지만, 그다지 실용적이지도 유용하지도 않아요. 게다가 버튼의 위치도 끔찍하구요! 😅 그럼 길드/서버 목록 끝에 추가하고 싶다면 어떻게 할까요? 한번 시도해봅시다!

먼저 길드 목록의 DOM 하위 트리를 찾아야 해요. 가장 쉬운 방법은 [개발자 도구](../../developers/devtools)에서 요소 검사를 사용해서 왼쪽의 길드 목록을 선택하는 거예요.

![서버 목록](./img/servers.png)

위와 같이 보인다면 올바른 요소를 찾으신 거예요! 이제 이 요소에 대한 선택자를 만들어야 해요. 요소를 마우스 우클릭한 다음 `Copy > Copy Selector`로 내장 메서드를 사용해볼 수 있어요. 하지만 이 방법은 보통 `#app-mount > div.appDevToolsWrapper-1QxdQf > div > div.app-3xd6d0 > div > div.layers-OrUESM.layers-1YQhyW > div > div.container-1eFtFS > nav > ul > div.scroller-3X7KbA.none-2-_0dP.scrollerBase-_bVAAt > div:nth-child(3)` 같은 다루기 힘든 선택자를 만들어내요... 😰

그러니까 수동으로 해봅시다! 이 요소에는 `id`나 `class`가 없지만 `aria-label` 속성이 있으니, `[aria-label="Servers"]` 같은 속성 선택자를 사용하는 게 당연해 보여요. 하지만 이건 큰 문제가 있어요. 이 값은 사용자가 Discord를 설정한 언어에 따라 바뀌거든요. 그래서 영어에서는 작동하지만 다른 많은 언어에서는 작동하지 않을 거예요. `aria-label`이나 접근 가능한 웹 브라우징에 대해 잘 모르신다면, 역시 [MDN에 훌륭한 문서](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label)가 있으니 확인해보세요!

그 방법이 잘 안 되니까 다시 살펴볼까요? 조상 계층구조에서 `tree-3agP2X`와 `guilds-2JjMmN` 같은 고유한 클래스들을 볼 수 있어요. 이걸 우리가 타겟팅하는 요소에만 `aria-label`이 존재한다는 사실과 결합해서 `.tree-3agP2X > div > div[aria-label]` 같은 선택자를 만들 수 있어요. 이건 `aria-label` 속성의 *값*에 의존하지 않으니까 언어에 관계없이 작동할 거예요. 참고로 다른 선택자들도 작동하는 게 있어요, 이건 그냥 예시일 뿐이에요! 😊

::: tip

Discord의 많은 클래스들이 `-3agP2X` 같은 이상한 문자열로 끝나는 이유는 클래스 충돌을 자동으로 방지하는 시스템을 사용하기 때문이에요. 이는 이런 문자열들이 변경될 수 있다는 걸 의미해요. 원하는 클래스 이름을 가져오는 더 나은 방법은 나중 섹션에서 다룰 예정이에요!

:::

이전 코드와 우리의 선택자를 사용하면 길드 목록에 버튼을 추가할 수 있어요.

```js
const myButton = document.createElement("button");
myButton.textContent = "날 클릭해봐!";
myButton.addEventListener("click", () => {window.alert("안녕하세요 세상!");});
const serverList = document.querySelector(".tree-3agP2X > div > div[aria-label]");
serverList.append(myButton);
```

콘솔에서 이걸 시도해보면 길드 목록 하단에 버튼이 나타나는 걸 볼 수 있을 거예요 (아래로 스크롤해야 할 수도 있어요). 클릭하면 여전히 알림이 나타날 거구요! 멋지죠? 🎉

Discord(와 React)로 작업할 때 흔한 문제 중 하나는 때때로 요소들이 사라진다는 거예요. 이는 React가 뷰를 새로고침하고 요소를 삭제하거나, 사용자가 뷰를 변경(채널이나 서버 변경)할 때 발생할 수 있어요. 길드 목록이 새로고침될 때 여러분의 버튼에도 이런 일이 일어날 수 있어요.

어떻게 이걸 막을 수 있을까요? 일반적인 DOM 조작으로는 불가능해요. 하지만 _우회할_ 수는 있어요! 버튼이 제거되는 걸 감지하고 다시 추가할 수 있거든요. [mutation observers](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)를 사용해봅시다!

```js
// 이 부분은 버튼을 추가해요
const myButton = document.createElement("button");
myButton.textContent = "날 클릭해봐!";
myButton.addEventListener("click", () => {window.alert("안녕하세요 세상!");});
const serverList = document.querySelector(".tree-3agP2X > div > div[aria-label]");
serverList.append(myButton);


// 이 부분은 제거되는 걸 기다려요
const myCallback = mutations => {
    // 버튼이 제거된 경우에만 관심 있어요
    if (mutations.removedNodes.length === 0) return;

    // 배열 함수를 사용할 수 있도록 배열로 변환해요
    const removedNodes = Array.from(mutations.removedNodes);

    // 우리 버튼에만 관심 있어요
    if (!removedNodes.includes(myButton)) return;

    // 여기에 도달했다는 건 버튼이 제거됐다는 뜻이에요, 다시 추가해봅시다!
    serverList.append(myButton);
};
const myObserver = new MutationObserver(myCallback);
const observerOptions = {
    childList: true,
    subtree: false // 하위 트리는 필요 없어요, 직접적인 자식들만요
};
myObserver.observe(serverList, observerOptions);
```

이제 서버 목록에서 버튼이 제거될 때마다 다시 추가될 거예요! 코드가 좀 불편하게 작성되어 있고, 그 버튼에만 매우 특화되어 있어요. 하지만 다행히도 [BdApi](/api/bdapi)에 `onRemoved`라는 도움이 되는 유틸리티 함수가 있어요! 이 코드를 다시 작성하면 이렇게 될 거예요:

```js
// 이 부분은 버튼을 추가해요
const myButton = document.createElement("button");
myButton.textContent = "날 클릭해봐!";
myButton.addEventListener("click", () => {window.alert("안녕하세요 세상!");});
const serverList = document.querySelector(".tree-3agP2X > div > div[aria-label]");
serverList.append(myButton);

// 이 부분은 제거됐을 때 다시 추가해요
BdApi.DOM.onRemoved(myButton, () => {
    serverList.append(myButton);
});
```

훨씬 깔끔하고 수행되는 동작을 더 잘 설명해주죠! 이건 `BdApi`에 존재하는 많은 헬퍼 함수 중 하나일 뿐이에요. 문서를 읽어가면서 더 많이 배우게 될 거예요! 실제로 우리의 버튼 예제에 도움이 될 수 있는 `addStyle`과 `removeStyle` 함수가 두 개 더 있어요. 😍

이 함수들은 꽤 간단하고 직관적이에요. 우리가 이전의 버튼에 `my-button` 클래스를 추가했다고 해봅시다. 그러면 이 스니펫을 사용해서 외부에서 CSS로 스타일링할 수 있어요:

```css
.my-button {
    padding: 4px;
    border-radius: 5px;
    background: black;
    color: white;
}
```

이것도 훌륭하고 잘 작동하지만, 플러그인에 포함시켜야 해요. 이 페이지 시작 부분의 기법을 사용해서 자체 스타일시트를 생성하고 문서에 추가하거나, 그냥 `BdApi.DOM.addStyle`을 사용할 수 있어요. ID와 CSS를 주면 나머지는 알아서 처리해줄 거예요!

```js
BdApi.DOM.addStyle("myPluginName", `.my-button {
    padding: 4px;
    border-radius: 5px;
    background: black;
    color: white;
}`);
```

나중에 이전의 동일한 ID를 사용해서 제거할 수도 있어요

```js
BdApi.DOM.removeStyle("myPluginName");
```

이 모든 기법들과 위에서 논의한 내용들을 가지고 놀아보세요! 편안하게 느껴지면 다음 섹션으로 넘어가셔도 돼요. 화이팅! 🚀