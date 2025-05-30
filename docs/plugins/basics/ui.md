---
order: 4
description: UI에 대한 모든 것을 알아봅시다.
---

# UI 컴포넌트

## 용어 정리

다음 용어들을 아는 게 중요해요! Discord 내부와 동료 개발자들이 커뮤니티에서 자주 사용하는 용어들이거든요. 처음 세 개는 일반적으로 웹 개발에서 사용되는 용어들이에요. 그 다음부터는 Discord 전용이거나 BetterDiscord 전용 용어들이에요! 😊

### 모달 (Modal)

모달은 메인 화면 중앙에 오버레이되는 요소들로, 보통 뒤의 페이지를 어둡게 만들어요. 사용자 입력을 받거나 중요한 정보를 표시할 때 자주 사용돼요!

::: details 예제

![모달 예제](./img/ui/modal.png)

:::

### 팝아웃 (Popout)

팝아웃은 메인 화면에 오버레이된다는 점에서 모달과 비슷하지만, 뒤의 페이지를 어둡게 하는 경우는 거의 없고 화면 정중앙에 오지도 않아요. 보통 사용자의 마우스 위치 근처에 붙어있고 사용자 입력 후에 나타나요. 특정한 것에 대한 추가 정보를 사용자에게 보여주는 데 좋아요! 🎯

::: details 예제

![팝아웃 예제](./img/ui/popout.png)

:::

### 툴팁 (Tooltip)

툴팁은 또 다른 오버레이 요소예요! 팝아웃과 매우 비슷하지만 훨씬 훨씬 작고, 보통 특정 요소를 가리켜서 그것에 대한 추가 정보를 주고 있다는 걸 나타내요. 깔끔한 버튼을 만들거나 텍스트를 명확히 하는 데 사용돼요! ✨

::: details 예제

![툴팁 예제](./img/ui/tooltip.png)

:::

### 노티스 (Notice)

노티스는 Discord 전용 용어로, 화면 상단에 나타나는 배너 같은 요소예요. Discord에서는 지속적인 정보를 주거나 사용자 상호작용을 수동적으로 기다릴 때 가장 자주 사용해요!

::: details 예제

![노티스 예제](./img/ui/notice.png)

:::

### 토스트 (Toast)

토스트는 BetterDiscord 전용 용어로, 화면 하단에 나타나는 작은 툴팁 같은 팝업이에요! 이건 Android 생태계에서 빌려온 거고 그걸 모델로 만들어졌어요. 토스트는 상호작용이나 백그라운드 작업에 대한 정보를 사용자에게 알려주는 데 사용돼요! 📱

::: details 예제

![토스트 예제](./img/ui/toast.png)

:::

## BdApi 도우미들

> [!NOTE]
> 이 섹션은 BetterDiscord v1.11.0 업데이트를 위해 아직 업데이트 중이에요!

`BdApi`에는 특정 UI 요소들을 만들고 표시하는 데 도움이 되는 유틸리티 함수들이 있어요! 직접 만드는 대신 이걸 사용하면 코드를 절약할 수 있고 플러그인 간에 일관된 UI/UX를 보장하는 데 도움이 돼요. 많은 경우에 작동하지만, 고급 UI나 (`BdApi`에서 처리되지 않는 것들)의 경우에는 직접 만들어야 해요! 🛠️

### alert

`BdApi.UI.alert()` 메서드는 간단하면서도 확장 가능한 정보 모달을 만들고 표시할 수 있게 해줘요! 시그니처는 `alert(title, content)`예요.

가장 직관적인 사용법은 그냥 문자열을 사용하는 거예요!


```js
BdApi.UI.alert("안녕하세요 세상", "이건 그냥 기본적인 정보 모달이에요!");
```
::: details 결과
![기본 알림](./img/ui/alert_basic.png)
:::

`content`에는 React 요소를 전달할 수도 있지만 <u>`title`에는 안 돼요</u>. 하지만 이건 기능과 스타일링을 스스로 해야 한다는 뜻이에요! 마지막 예제에서 `content` 텍스트가 색칠되고 테마가 적절히 적용된 걸 봤어요. 하지만 문자열을 React 요소로 감싸보면 어떻게 될까요?


```jsx
BdApi.UI.alert("안녕하세요 세상", <div>이건 그냥 기본적인 정보 모달이에요!</div>);
```

::: details 결과
![React 알림](./img/ui/alert_react.png)
:::

그리고 `content`에 React를 사용할 수 있으니까, 전체 요소 트리나 커스텀 컴포넌트를 전달할 수도 있어요! 이렇게 하면 정말 흥미로운 알림 가능성들이 열려요! 🚀


```jsx
function MySearchInput(props) {
    return <input
                type="text"
                placeholder={props.placeholder || "검색..."}
                onChange={props?.onChange}
            />;
}

BdApi.UI.alert(
    "입력 테스트",
    <MySearchInput
        placeholder="테스트 중..."
        onChange={event => console.log(event)}
    />
);
```

::: details 결과
![React 입력](./img/ui/alert_input.png)
:::

::: details 콘솔
![React 콘솔](./img/ui/alert_console.png)
:::

나중을 위해 중요한 건, `alert`가 Discord에서 내부적으로 사용되는 고유한 모달 ID를 반환한다는 거예요. 여기서는 사용법을 다루지 않을 거고--무시해도 안전해요--하지만 고급 가이드에서 다룰 수도 있어요!

### buildSettingItem & buildSettingsPanel

이건 설정 메뉴를 만드는 방법을 다룬 [이전 가이드](./settings.md)에서 다뤘어요!

### createTooltip

React를 사용하지 않는다면, 이 작은 유틸리티가 유용할 수 있어요! 따라다닐 HTML 요소, 라벨, 그리고 선택적인 옵션 세트를 주면, 멋진 작은 툴팁을 생성해서 반환해줘요! 💫

```js
// 이 툴팁은 사용자가 myElement에 호버할 때 자동으로 보이거나 숨겨져요
const tooltip = BdApi.UI.createTooltip(myElement, "내 라벨", {side: "bottom"});

// 하지만 우리의 필요에 맞게 툴팁을 강제로 보이게 (또는 숨기게) 할 수도 있어요
tooltip.show()
```

`createTooltip`의 기본 옵션 객체는 이렇게 생겼어요:
```json
{
    "style": "primary",
    "side": "top",
    "preventFlip": false,
    "disabled": true
}
```

사용 가능한 방향은 top, right, bottom, left예요!

사용 가능한 스타일은 primary, info, success, warn, danger예요!

나중에 툴팁의 요소들에 직접 접근할 수도 있어요. 그래서 라벨을 업데이트해야 한다면 이렇게 할 수 있어요:

```js
tooltip.labelElement.textContent = "새 라벨";

// 또는 더 멋지게
const myNewLabel = BdApi.DOM.parseHTML(`<div class="foo">새 라벨 텍스트</div>`);
tooltip.labelElement.textContent = "";
tooltip.labelElement.append(myNewLabel);
```

이 툴팁의 옵션은 놀라울 정도로 다양해서, 콘솔에서 이것저것 시도해보고 감을 잡는 게 가장 좋아요! 🎨

### showChangelogModal

사용자에게 멋진 기능을 추가했거나 골치 아픈 버그를 수정했다는 걸 보여주고 싶을 때, 이 함수가 깔끔하고 일관된 방식으로 보여주는 데 도움이 돼요!


```js
BdApi.UI.showChangelogModal({
    title: "내 플러그인",
    subtitle: `버전 ${version}`,
    blurb: "이 업데이트 요약",
    changes: [
        {
            title: "새로운 기능",
            type: "added",
            blurb: "새 기능들 요약",
            items: [
                "기능 A 추가!",
                "기능 B를 기능 C로 리팩터링!"
            ]
        },
        {
            title: "버그 제거",
            type: "fixed",
            items: [
                "더 이상 설정이 손상되지 않아요.",
                "버튼을 클릭하면 뭔가 해요."
            ]
        }
    ]
});
```

더 자세한 내용은 [api 레퍼런스](../../api/ui.md)를 확인할 수 있지만, 이 작은 스니펫이 가장 중요한 기능들을 보여줘요! 특히, 이 변경로그 API는 모든 텍스트 위에 배너 이미지, 유튜브 동영상, 또는 직접 동영상을 표시할 수도 있어요. 새로운 것들의 쇼케이스를 추가해야 하거나 일관된 브랜딩을 원할 때 유용할 수 있어요! 변경 "타입"도 4개가 있어요. 스니펫에서는 fixed와 added를 봤는데, improved와 progress도 있어요! 📝

지금은 플러그인들이 언제 변경로그 모달을 표시할지 스스로 결정해야 하지만, 향후 BetterDiscord 업데이트에서는 더 자동화될 예정이에요! 이를 하는 방법의 예제는 BetterDiscord v1.11.0용 새 API들을 보여주는 이 [데모 플러그인](https://gist.github.com/zerebos/b13adc05f22df008ee5d0411d9d18ff0)을 확인해보세요!

### showConfirmationModal

내부적으로 `alert`는 `showConfirmationModal`을 사용해요! 이건 훨씬 더 확장 가능하고 유용한 도우미 함수예요. `alert`와 비슷하게 이것도 `title`과 `content` 매개변수가 있고 앞에서와 같은 타입들을 받아요. 전체 시그니처는 `showConfirmationModal(title, content, options = {})`예요. 옵션의 전체 목록은 [api 레퍼런스](/api/bdapi)를 확인하세요! 여기서는 더 유용한 것들을 다룰 거예요. 🔧


```js
BdApi.UI.showConfirmationModal("안녕하세요 세상", "이건 그냥 기본적인 확인 모달이에요!");
```

::: details 결과
![기본 확인](./img/ui/confirmation_basic.png)
:::

이 결과를 보면, 추가로 "취소" 버튼이 있는 걸 볼 수 있어요! 두 버튼의 텍스트를 바꿀 수 있고, 이 예제의 `options`를 사용해서 둘 중 하나가 클릭되었을 때 반응할 수도 있어요.

```jsx
function MySearchInput(props) {
    return <input
                type="text"
                placeholder={props.placeholder || "검색..."}
                onChange={props?.onChange}
            />;
}

BdApi.UI.showConfirmationModal(
    "입력 테스트",
    <MySearchInput
        placeholder="찾기..."
        onChange={event => console.log(event)}
    />,
    {
        confirmText: "검색",
        cancelText: "아니요",
        onConfirm: () => console.log("'검색' 눌렀어요"),
        onCancel: () => console.log("'아니요' 또는 escape 눌렀어요")
    }
);
```

::: details 결과
![고급 확인](./img/ui/confirmation_advanced.png)
:::

여기서 `검색`을 클릭하면 모달이 닫히고 우리가 전달한 `onConfirm` 함수가 호출돼요! 비슷하게 `아니요`를 클릭하면 `onCancel`이 호출되고요. 사용자가 키보드에서 `escape`를 누르거나 어두운 배경에서 모달 밖을 클릭해서 모달을 종료하면, 이 경우에도 `onCancel`이 호출돼요! 🎹

`alert`와 마찬가지로 이 함수도 고유한 모달 ID를 반환해요!

### showToast

토스트는 사용자에게 간단하고 직관적인 메시지를 주기 위한 거니까, 토스트를 만들고 보여주는 것도 똑같이 간단해요! 시그니처는 `showNotice(content, options = {})`예요. 하지만 모달과는 달리, `content`는 <u>문자열만 가능해요</u>. 그리고 옵션을 무시하고도 완전히 스타일된 토스트를 성공적으로 보여줄 수 있어요! 여기서는 유용한 것들을 다룰 거지만, 옵션의 전체 목록은 api 레퍼런스를 꼭 확인해보세요. 🍞


```js
BdApi.UI.showToast("이건 그냥 기본적인 토스트예요!");
```

::: details 결과
![기본 토스트](./img/ui/toast_basic.png)
:::

가장 중요하고 자주 사용되는 옵션은 `type`이에요! 이렇게 하면 아이콘까지 포함해서 다양한 상황에 맞는 토스트의 완전한 스타일링이 가능해요. 기본값은 빈 문자열이라 위의 이미지처럼 나와요. 다른 옵션들은 아래에 보여드릴게요:

::: details Info
![정보 토스트](./img/ui/toast_info.png)
:::

::: details Success
![성공 토스트](./img/ui/toast_success.png)
:::

::: details Warning
![경고 토스트](./img/ui/toast_warning.png)
:::

::: details Error
![오류 토스트](./img/ui/toast_error.png)
:::

토스트는 Android처럼 설정된 시간 후에 사라져요! 기본적으로는 3초 후예요. `timeout` 옵션을 사용해서 이걸 바꿀 수 있는데, 토스트가 사라지기 전까지 보여줄 밀리초 수를 받아요. 이 함수는 아무것도 반환하지 않아요! ⏰

### showNotice

이 함수는 `content`가 `HTMLElement`도 될 수 있다는 점을 제외하고는 `showToast`와 같은 시그니처를 가져요! 이렇게 해서 좀 더 커스터마이징할 수 있어요. 하지만 필요한 기능의 대부분은 이미 포함되어 있어요!


```js
BdApi.UI.showNotice("이건 그냥 기본적인 정보 노티스예요!");
```

::: details 결과
![기본 노티스](./img/ui/notice_basic.png)
:::

하지만 정보를 보여주는 것 이상으로, 사용자가 상호작용할 수 있는 여러 버튼도 추가할 수 있어요!


```js
BdApi.UI.showNotice(
    "이건 그냥 기본적인 정보 노티스예요!",
    {
        type: "error",
        buttons: [
            {
                label: "나를 클릭!",
                onClick: () => console.log("나를 클릭했어요")
            },
            {
                label: "아니 나를!",
                onClick: () => console.log("틀렸어요!")
            }
        ]
    }
);
```

::: details 결과
![고급 노티스](./img/ui/notice_advanced.png)
:::

이번에는 `type: "error"`를 사용해서 빨간색이 된 걸 주목해보세요! [showToast](#showtoast)와 같은 `type`과 스타일링 옵션을 가져요.

여기의 각 버튼들은 완전히 독립적으로 작동해서 강력한 조합이 가능해요! 추가로, `timeout`을 사용해서 설정된 시간 후에 노티스가 닫히게 할 수도 있어요. 이건 노티스를 닫을 밀리초 수예요. 0으로 설정하면 (기본값), 사용자나 호출자가 닫을 때까지 닫히지 않아요! ⚡

`showNotice`는 원래 호출자가 타임아웃보다 일찍 또는 사용자 상호작용 없이 노티스를 닫을 수 있게 해주는 함수를 반환해요! 버튼의 `onClick`에는 이 같은 함수가 유일한 인자로 제공돼요.