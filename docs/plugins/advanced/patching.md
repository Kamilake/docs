---
order: 1
description: 다른 함수들을 여러분만의 함수로 패치하기 - 디스코드 함수들을 마음대로 조작해보세요! 🎯
---

# 함수 패칭 (Function Patching) 🔧

이 가이드는 함수 패칭(function patching), 때로는 몽키 패칭(monkey patching)이라고도 불리는 개념에 대해 다룰 거예요. 이미 이 개념에 익숙하시다면, `BdApi.Patcher`가 제공하는 유틸리티를 보여주는 [예제들](#examples)을 확인해보세요! 😊

## 배경 지식 📚

### 함수 패치가 뭔가요?

함수 패치는 기존 함수들, 심지어 디스코드 자체의 함수들까지도 수정할 수 있게 해주는 플러그인을 위한 고급 기법이에요! 일반적으로 세 가지 다른 "종류"의 패치가 있답니다. 원본 함수 `전에(before)` 여러분만의 코드를 실행하는 것(보통 원본 함수에 전달되기 전에 인수들을 수정하는 게 목표죠), 원본 함수 `대신에(instead)` 실행되는 것(인수, 기능, 반환값을 완전히 제어하죠), 그리고 원본 함수 `후에(after)` 실행되는 것(다른 곳으로 전달되기 전에 반환값을 수정하는 게 목표예요)이 있어요.

### 왜 사용해야 할까요? 🤔

여러분만의 기능으로 디스코드의 기능을 수정하거나 확장하면서도 통합을 거의 완벽하게 유지할 수 있는 훌륭한 방법이에요! 또한 현재 디스코드가 작동하는 방식을 수정하는 방법으로도 작용할 수 있어요. 예를 들어 [HideDisabledEmojis](https://betterdiscord.app/plugin/HideDisabledEmojis) 플러그인을 보세요. 이 플러그인은 함수 패칭을 사용해서 디스코드의 내부 함수들이 작동하는 방식을 수정하여 사용자가 사용할 수 없는 이모지 렌더링을 중단시켜요. 여러분이 만들 수 있는 플러그인의 가능성이 기하급수적으로 증가하고, 디스코드와의 긴밀한 통합 덕분에 품질도 보통 더 높아져요! ✨

### 함수를 어떻게 패치할 수 있나요?

안타깝게도 함수를 *직접* 패치할 수는 없어요. 다른 코드가 사용하는 함수에 대한 *참조*를 수정해야 해요. 즉, 여러분의 타겟 함수가 이런 식으로 로컬이나 전역에서 사용 가능한 함수라면

```js
function yourTarget() {}
```

그럼 실제로는 영향을 줄 수 없어요. 하지만 여러분의 타겟이 임포트된 모듈에 포함되는 것처럼 어떤 식으로든 객체의 일부라면, 그 참조를 여러분만의 함수로 덮어써서 모든 사람이 여러분의 함수를 대신 호출하게 만들 수 있어요! 🎉

```js:line-numbers
const someObject = {
    yourTarget: function() {
        console.log("빨강");
    }
};

function targetUser() {
    someObject.yourTarget();
}

targetUser(); // "빨강"을 로그

// highlight-start
function myNewFunction() {
    console.log("초록");
}

someObject.yourTarget = myNewFunction;
// highlight-end

targetUser(); // 이제 "초록"을 로그
```

강조된 섹션을 보시면, `초록`을 로그하는 새로운 함수 `myNewFunction`을 만들고 이를 `someObject.yourTarget`에 할당해서 타겟 함수를 효과적으로 덮어쓰고 있어요. 즉, `targetUser`가 다시 호출되면 `someObject` 객체를 참조하기 때문에 여러분의 함수가 성공적으로 실행되는 거죠! 이것이 바로 타겟을 완전히 대체하는 `instead` 패치라고 알려진 거예요. 모든 패치는 이런 식으로 시작하지만 참조를 저장하고 원본 함수를 호출함으로써 `before`나 `after` 패치로 확장할 수 있어요. 이는 또한 서브패치와 다중 사용자의 문을 열어주지만, 매우 빠르게 복잡해질 수 있어요! 😅

#### BetterDiscord와 함께라면! 🎈

다행히도 BetterDiscord는 이미 함수당 여러 패치를 관리하고 다양한 패치 타입을 타겟팅할 수 있게 해주는 시스템을 갖추고 있어요! 즉, `before`나 `after` 패치를 하고 싶다면 더 이상 수동으로 함수를 교체하고 참조를 유지하며 원본을 호출할 필요가 없어요. 이 모든 것이 `BdApi.Patcher`로 여러분을 위해 처리되거든요! 위의 예제를 이 모듈로 어떻게 할 수 있는지 살펴볼까요?

```js:line-numbers
const someObject = {
    yourTarget: function() {
        console.log("빨강");
    }
};

function targetUser() {
    someObject.yourTarget();
}

targetUser(); // "빨강"을 로그

// highlight-start
BdApi.Patcher.instead("MyPlugin", someObject, "yourTarget", () => console.log("초록"));
// highlight-end

targetUser(); // 이제 "초록"을 로그
```

이 코드는 이전과 같은 효과를 가져서 `targetUser`가 대신 `초록`을 로그하게 해요. 하지만 강조된 줄을 자세히 살펴보죠! `BdApi.Patcher.instead` 호출이 있는데, 이는 `instead` 패치를 만들고 싶다는 것을 나타내요. `"MyPlugin"`을 전달하는데, 이는 나중에 `BdApi.Patcher.unpatchAll`로 여러분의 모든 패치를 제거하는 데 도움이 되는 식별자예요. 그 다음 타겟 객체 `someObject`와 그 객체 내부의 타겟 키 `yourTarget`, 그리고 원본을 오버라이드할 새 함수를 전달해요. BetterDiscord가 나머지를 처리하고 다른 플러그인들도 여러분 것 위에 패치할 수 있게 해줘요! 👏

## 예제들 🎯

이 모든 예제들에서 우리의 설정은 다음과 같아요:

```js:line-numbers
function someGlobal() {
    console.log("전역 함수");
    return 2;
}

const someModule = {
    value: "foobar",
    method(val = 0) {
        const globalValue = someGlobal();
        return globalValue + 1 + val;
    },
    otherMethod(someArg) {
        console.log(`내 값은 ${someArg}`);
    }
};
```

이 설정에서 `someGlobal`은 바꿀 참조가 없어서 패치할 수 없는 함수예요. 하지만 `someModule.method`와 `someModule.otherMethod`는 둘 다 패치할 수 있어요! 🎉

### Before 패치 ⏰

수정하고 싶은 인수를 가진 함수가 있다면, `before` 패치가 여러분에게 딱 맞는 선택이에요! 아래 패치를 살펴보세요.

```js:line-numbers
BdApi.Patcher.before("MyPlugin", someModule, "otherMethod", (thisObject, args) => {
    console.log(args);
});

someModule.otherMethod("뭔가");
// > ["뭔가"]
// > 내 값은 뭔가
```

이 예제에서는 인수를 수정하지 않고 단지 어떤 종류의 값을 받을 수 있는지 보기 위해 로그로 출력했어요. 이는 선택적으로 인수를 수정하는 데 도움이 되는 좋은 기법이에요! `뭔가`가 로그되는 건 괜찮지만 `token`이 로그되는 건 싫다고 가정해봅시다. 어떻게 보일까요? 🤔

```js:line-numbers
BdApi.Patcher.before("MyPlugin", someModule, "otherMethod", (thisObject, args) => {
    const firstArgument = args[0];
    // highlight-start
    if (firstArgument === "token") {
        args[0] = "편집됨";
    }
    // highlight-end
});

someModule.otherMethod("뭔가"); // > 내 값은 뭔가
someModule.otherMethod("token");     // > 내 값은 편집됨
```

이 강조된 섹션은 누군가가 `token`을 `otherMethod`의 값으로 전달할 때를 확인하고 `편집됨`으로 바꿔요. `if` 문 내부에서 일어나는 교체를 주목하세요. 이는 참조를 사용해서 덮어쓰는 또 다른 경우인데, 이번에는 `arguments` 배열에서 일어나요. 더 많은 `before` 패치를 할 때 염두에 둘 점이에요! 😊

### Instead 패치 🔄

[위 섹션](#함수를-어떻게-패치할-수-있나요)에서 기본적인 `instead` 패치를 이미 보셨을 수도 있지만, 조금 더 복잡한 버전을 살펴보죠!

```js:line-numbers
function myFunction(val) {
    console.log(`가로챘어요 ${val}`);
}

BdApi.Patcher.instead("MyPlugin", someModule, "method", (thisObject, args, originalFunction) => {
    const firstArgument = args[0];
    if (firstArgument === 5) return originalFunction(...args);
    if (firstArgument === 1) return myFunction(...args);
});

someModule.method(5); // > 8
someModule.method(1); // > 가로챘어요 1
someModule.method(2); // > undefined
```

`instead` 패치에서 정의하는 함수를 보세요. BetterDiscord가 우리가 적합하다고 생각하는 대로 사용할 수 있게 해주는 새로운 매개변수 `originalFunction`이 있어요! 이 예제에서는 특정 값에 대해 사용하고 있어요. 값이 `5`라면 원본 함수를 실행하게 하고 수정 없이 반환해요. 값이 `1`이라면 외부 함수에 전달하고 그것이 인수와 반환을 처리하게 해요. 그렇지 않으면 함수는 전혀 반환값이 없어요! 이는 함수에 엄청난 변화예요. 전에는 항상 값을 반환했는데 이제는 두 가지 경우에만 값을 반환해요. 이는 함수 패칭이 얼마나 강력할 수 있는지를 잘 보여주는 예제예요! 💪

### After 패치 ⏰

이 타입의 패치는 아마도 플러그인에서 가장 자주 사용되는 것일 텐데, 처음 두 개를 따라오셨다면 이것은 쉽게 익힐 수 있을 거예요!

```js:line-numbers
BdApi.Patcher.after("MyPlugin", someModule, "method", (thisObject, args, returnValue) => {
    return returnValue * 2;
});

someModule.method(5); // > 16
someModule.method();  // > 6
```

이전의 `originalFunction`이 `returnValue`로 바뀐 걸 보셨을 거예요. 여기서는 단순히 그것을 매번 `2`로 곱하고 값을 호출자에게 반환해요. 즉, 우리가 전달하는 어떤 숫자든 원본 함수가 적용되고 반환한 다음, 우리 패치가 그 값을 받아서 `2`로 곱하고, 그 다음에야 함수 호출자가 최종적으로 값을 받는 거예요! BetterDiscord `Patcher`는 여러분이 사용하는 어떤 `return` 값이든 사용할 거예요. 하지만 아무것도 *반환하지 않으면* 원래 반환값이 사용돼요. 이는 깊은 영향을 미칠 수 있어요! 아래 경우를 생각해보세요: 🤯

```js
const myNewNumber = 5 / someModule.method(5);
```

이제 `5`에 대해서만 반환값을 바꿔봅시다.

```js:line-numbers
BdApi.Patcher.after("MyPlugin", someModule, "method", (thisObject, args, returnValue) => {
    if (args[0] === 5) return {};
});
```

이번 패치에서는 `5`의 경우에만 값을 `return`하고, 다른 모든 경우에는 아무것도 반환하지 않았기 때문에 원본 함수의 기본 `return`이 사용돼요. 이를 멈추고 싶다면 다음 줄에 `return null;`을 넣을 수 있어요. 또한 우리 반환이 더 이상 값이 아니라는 것도 알아챘을 거예요! 그럼 위의 경우에 무슨 일이 일어날까요? 😱

```js:line-numbers
BdApi.Patcher.after("MyPlugin", someModule, "method", (thisObject, args, returnValue) => {
    if (args[0] === 5) return {};
});

const myNewNumber = 5 / someModule.method(5); // NaN
```

이로 인해 `myNewNumber`가 `NaN` 즉 *숫자가 아님*이 되었어요. 변수 이름을 고려하면 아이러니하죠! 😅 하지만 함수의 반환을 수정할 때 얼마나 조심해야 하는지를 보여주는 좋은 예제예요.