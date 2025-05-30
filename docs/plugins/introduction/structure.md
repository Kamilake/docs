---
order: 4
description: 플러그인의 요구사항과 형식에 대해 알아보아요.
---

# 플러그인 구조

::: tip 💡

이 페이지는 플러그인의 본문만 다뤄요. 먼저 [애드온 시스템(addon system)](../../developers/addons.md)에 대해 읽어보시는 것을 권장해요!

:::

## 요구사항 ✅

 - BetterDiscord 플러그인은 하나의 파일로 제한되어요.
 - BetterDiscord 플러그인(파일)은 `*.plugin.js` 형식으로 이름을 지어야 해요.
 - BetterDiscord 플러그인에는 메타(meta)라고 하는 특별한 헤더가 필요해요.
 - BetterDiscord 플러그인은 `start()`와 `stop()` 함수를 모두 구현해야 해요.
 - BetterDiscord 플러그인은 클래스이거나 필요한 객체를 반환하는 함수여야 해요.
 - BetterDiscord 플러그인은 `module.exports`를 통해 내보내져야 해요.

## 자세한 내용 🔍

BetterDiscord 플러그인은 로드되기 위해 바닐라 JavaScript로 작성되고 하나의 파일에 포함되어야 해요. 즉, JSX나 TypeScript 같은 것을 사용하고 싶다면 트랜스파일해야 한다는 뜻이에요. 마찬가지로 코드를 여러 파일로 나누고 싶다면 번들링해야 해요. 이 두 주제는 문서의 뒷부분에서 다뤄집니다. 중복을 줄이기 위해, 여러분의 [애드온 메타](../../developers/addons.md)는 메인 함수나 생성자에 일반 객체로 제공되어요. 문서 전체에서 이런 예시들을 보게 될 거예요.

플러그인 파일은 `*.plugin.js` 형식으로 이름을 지어야 해요. 여기서 `*`는 임의의 문자열을 나타내요. 보통 이것은 공백이나 특수 문자 없이 플러그인 이름과 일치하지만, 이것이 필수 요구사항은 아니에요.

플러그인 파일은 두 가지 주요 부분으로 나뉘어요: 메타와 플러그인 코드. 이 중 하나라도 누락되면 플러그인이 로드되지 않아요.

### JavaScript

플러그인 코드의 기본은 간단해요. 플러그인은 활성화와 비활성화 시 각각 호출되는 `start()`와 `stop()` 함수를 모두 가져야 해요. 또한 `module.exports`를 사용하여 이 함수들을 BetterDiscord에 반환해야 해요.

가장 간단하고 직접적인 방법은 객체 리터럴을 반환하는 것이에요:
```js
module.exports = () => ({
   start() {

   },
   stop() {

   }
});
```

하지만 물론 이것이 유일한 방법은 아니에요. 많은 사람들이 클래스의 문법적 설탕과 확장성을 좋아해요 😊

```js
module.exports = class {
   start() {

   }
   stop() {

   }
};
```

반면 더 모듈화된 함수형 스타일을 선호하는 사람들도 있어요.

```js
const start = () => {};
const stop = () => {};

module.exports = function() {};
module.exports.start = start;
module.exports.stop = stop;
```

물론 안전을 위해 자신을 감싸는 것을 선호하는 사람들도 있어요.

```js
module.exports = () => {
   return {
      start: () => {},
      stop: () => {}
   }
};
```

하지만 여러분의 선호도가 무엇이든, 그 함수들을 위로 전달해주세요!

이 모든 예시들은 이 함수들을 BetterDiscord에 반환하는 유효한 방법들이에요. 핵심 아이디어는 BetterDiscord가 `require("./yourplugin.plugin.js")`를 호출할 때, `exports`가 <u>다음 중 하나여야</u> 한다는 것이에요:
1. `start()`와 `stop()` 프로토타입 함수를 모두 가지고 있거나
2. 두 함수를 모두 포함하는 객체를 반환하는 함수_이거나_

이렇게 하는 것이 돌아가는 것처럼 보일 수 있지만, 이것이 개발자들이 위 예시와 같은 인스턴스화되지 않은 클래스를 사용할 수 있게 해주는 방법이에요.

이것이 어떻게 작동하는지 확실히 이해했다고 생각되면, [기초](../basics/creating-a-plugin.md) 가이드로 넘어가기 전에 [가이드라인](./guidelines)을 살펴보세요.

#### 선택적 함수들 🎯

이것들은 플러그인이 사용_할 수 있지만_ 전혀 필수가 아닌 함수들이에요. 이들은 모두 `start`와 `stop`을 제공하는 같은 장소에서 BetterDiscord에 제공되어요.

##### getSettingsPanel

이 함수는 여러분의 플러그인이 BetterDiscord를 통해 표시되는 설정 패널을 가질 수 있게 해줘요. 예상되는 반환 타입은 `HTMLElement` 또는 React 엘리먼트예요. HTML을 나타내는 `string`을 반환하는 것은 더 이상 권장되지 않아요.

##### observer

이 함수는 `document`의 모든 변이(mutation)에서 호출되어요. 이 용어가 익숙하지 않다면, [MDN](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe)을 살펴보세요.

##### onSwitch

이 함수는 뷰가 "전환"될 때마다 호출되어요. 이를 더 잘 이해하는 방법은 사용자가 채널이나 서버를 변경하는 등의 탐색을 할 때마다라고 생각하는 거예요.