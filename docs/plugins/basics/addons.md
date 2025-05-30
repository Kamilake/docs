---
order: 6
description: 다른 애드온들과 작업하는 방법을 알아봅시다.
---

# 애드온 상호작용

BetterDiscord 내에서 다른 애드온들과 상호작용하는 방법은 주로 두 가지예요! 직접 상호작용--한 플러그인이 전역 스코프에 뭔가를 두고 다른 플러그인이 그걸 사용하는 것--이나 `BdApi`를 통한 상호작용이죠. 오늘은 두 번째 방법을 살펴볼 거예요! 😊

## AddonAPI

애드온 API는 `BdApi`의 일부로 사용할 수 있어요. 플러그인용과 테마용 두 개의 인스턴스가 있는데, 각각 `BdApi.Plugins`와 `BdApi.Themes`에 있어요. 이 API에는 다른 플러그인들과 상호작용하는 데 도움이 되는 몇 가지 유용한 유틸리티들이 있고, 현재 애드온 폴더를 속성으로 가지고 있기도 해요. 사용 가능한 메서드와 속성의 더 자세한 목록은 [API 레퍼런스](/api/bdapi)를 확인해보세요! 🤓

## 애드온 가져오기

애드온 ID를 안다면 `get(id)`를 사용해서 특정 애드온을 가져올 수 있어요. 예를 들어 ZeresPluginLibrary의 인스턴스를 가져오려면 이렇게 하면 돼요

```js
BdApi.Plugins.get("ZeresPluginLibrary");
```

이렇게 하면 애드온의 메타 정보와 기타 BetterDiscord 내부 정보가 포함된 객체를 얻을 수 있어요. 가장 주목할 만한 건 `instance` 속성인데, 이게 플러그인의 현재 인스턴스예요. 직접 상호작용할 수 있게 해주기 때문에 아마 가장 중요한 속성일 거예요! ✨

::: warning

이 애드온 인스턴스의 값을 수정하는 것은 지원되지 않아요. `instance` 속성은 새로운 표준이 도입될 때까지 변경될 수 있어요.

:::

또는 거대한 배열로 _모든_ 사용 가능한 애드온들을 가져올 수도 있어요.

```js
BdApi.Plugins.getAll();
```

이건 많은 애드온들과 상호작용해야 하거나 다른 애드온들의 존재를 확인할 때 유용해요! 😄

## 애드온 토글하기

토글하고 싶은 애드온의 ID가 있다면 이건 꽤 간단해요.

```js
BdApi.Themes.toggle("Nox");
```

물론 더 세밀한 제어를 할 수도 있고, 필요할 때 구체적으로 활성화하거나 비활성화할 수도 있어요. 세 개 모두 결합할 수도 있구요!

```js
BdApi.Themes.enable("Nox");  // Nox가 이제 활성화됐어요
BdApi.Themes.toggle("Nox");  // Nox가 이제 비활성화됐어요
BdApi.Themes.enable("Nox");  // Nox가 이제 활성화됐어요
BdApi.Themes.toggle("Nox");  // Nox가 이제 비활성화됐어요
BdApi.Themes.disable("Nox"); // Nox가 이제 비활성화됐어요
BdApi.Themes.toggle("Nox");  // Nox가 이제 활성화됐어요
BdApi.Themes.enable("Nox");  // Nox가 이제 활성화됐어요
BdApi.Themes.disable("Nox"); // Nox가 이제 비활성화됐어요
```

이미 활성화되어 있는지 확인해서 수고를 덜 수도 있어요!

```js
BdApi.Themes.isEnabled("Nox");
```

## 플러그인과 상호작용하기

무엇을 하려고 하는지에 따라, 상호작용을 시도하기 전에 플러그인이 활성화되어 있는지 빠르게 확인하는 게 유용할 수 있어요.

```js
BdApi.Plugins.isEnabled("Zalgo");
```

플러그인의 많은 함수들이 활성화되지 않아도 사용할 수 있다는 걸 염두에 두세요. 대부분의 플러그인 라이브러리들이 이런 식으로 작동해요! 😊

거기서부터 플러그인에서 함수들을 직접 호출할 수도 있어요. 이런 용법의 일반적인 사례 중 하나는 다른 플러그인을 활용하는 선택적 기능을 플러그인에 추가하고 싶을 때예요.

```js:line-numbers
class MyPlugin {
    start() {
        let myGreeting = "안녕하세요 사용자님!";
        if (BdApi.Plugins.isEnabled("Zalgo")) {
            const zalgoPlugin = BdApi.Plugins.get("Zalgo").instance;
            // highlight-next-line
            if (zalgoPlugin?.format) {
                myGreeting = zalgoPlugin.format(myGreeting);
            }
        }
        BdApi.UI.showToast(myGreeting);
    }

    stop() {

    }
}
```

이 예제에서, 이 플러그인을 가진 사용자는 일반적인 "안녕하세요 사용자님!" 인사를 받게 될 거예요. 하지만 Zalgo 플러그인이 설치되어 있고 활성화되어 있다면, 대신 Zalgo 스타일의 인사를 받게 될 거예요! 신기하죠? 😎

6번째 줄(하이라이트된 줄)에서, 우리는 `format()` 함수를 사용하기 전에 확인해요. 이건 이 인터페이스를 통해 다른 플러그인들과 상호작용할 때 사용해야 하는 가장 중요한 기법 중 하나예요. BetterDiscord도 다른 플러그인도 플러그인에 특정한 안정적인 내부 API를 항상 보장하지 않거든요. 따라서 여기서 하듯이 플러그인의 아키텍처가 변경되지 않았는지 확인하는 게 좋아요. 그렇긴 하지만, 두 개발자가 모두 동의한다면 플러그인 간에 교환 API를 개발하는 것은 절대적으로 자유롭고 권장돼요! 그런 합의들은 최종 사용자들의 오류와 문제를 줄여주거든요. 🤝