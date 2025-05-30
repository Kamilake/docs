---
order: 7
description: Discord의 기존 부분을 수정하는 방법을 알아봅시다.
---

# Discord 바꾸기

앞서 배운 DOM 조작과 몇 가지 새로운 기법들을 사용하면, Discord에 기능을 추가할 뿐만 아니라--이전 섹션에서 추가한 버튼처럼요--앱의 기존 기능도 변경할 수 있어요! 정말 흥미롭죠? 😎

## 이벤트 가로채기

이건 Discord의 주요 기능들을 수정하는 데 꽤 흔히 사용되는 기법이에요. DOM 이벤트를 가로채는 데 가장 많이 사용되죠. 함께 예제를 한번 시도해봅시다!

홈 버튼을 클릭했을 때 다른 일이 일어나도록 바꾸고 싶다고 해봅시다.

```js
const homeButton = document.querySelector(".listItemWrapper-3d87LP");
const myNewAction = event => {
    // highlight-start
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    // highlight-end

    console.log("홈 버튼이 클릭됐어요!");
};

homeButton.addEventListener("click", myNewAction);
```

여기서 중요한 줄들이 하이라이트되어 있어요. 첫 번째 줄은 브라우저의 기본 동작을 방지해요. 두 번째는 이벤트가 DOM 트리 위로 전파되는 걸 막아요. 세 번째는 이벤트가 같은 요소의 다른 리스너들에게 전파되는 걸 막아요. [MDN에서 더 자세한 설명](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation)을 볼 수 있어요!

`myNewAction`을 별도의 함수로 유지한 걸 주목해주세요. 그래야 나중에 플러그인이 중지될 때 요소에서 제거할 수 있거든요! 하지만 지금은 DevTools 콘솔에서 이걸 테스트해볼 수 있어요. 홈 버튼을 클릭하면 더 이상 Discord 홈으로 이동하지 않고, 대신 콘솔에서 메시지를 보게 될 거예요! 신기하죠? ✨