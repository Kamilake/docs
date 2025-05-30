---
order: 3
description: 플러그인에서 설정을 만드는 방법을 알아봅시다.
---

# 플러그인 설정

BetterDiscord에서 플러그인 설정은 매우 유연하고 개방적이에요! 설정을 만드는 '정답'은 하나가 아니거든요. 이 섹션에서는 설정을 관리하는 한 가지 방법을 살펴볼 거예요. BetterDiscord를 사용해서 설정 데이터를 저장하고 불러오는 방법, 그리고 [플러그인 구조](../introduction/structure)에서 설명한 `getSettingsPanel` 함수를 활용하는 방법을 다룰 예정이에요! 😊

`getSettingsPanel`을 사용하는 것이 사용자에게 설정 패널을 보여주는 권장 방법이에요. 사용자에게 일관된 흐름을 제공하거든요! 만약 모든 플러그인이 Discord UI에 각자의 설정 버튼을 추가한다면, 정말 혼란스러울 거예요. 대신 `getSettingsPanel`을 사용하면 BetterDiscord 설정의 플러그인 페이지에서 설정 버튼을 가질 수 있어요. 대부분의 사용자들은 플러그인에 설정이 있다면 이런 방식으로 구현되기를 기대할 거예요! 🎯

## 설정 관리

### 구조

일반적으로 설정은 객체 리터럴(object literal) 형태로 관리되고 저장돼요.

```js:line-numbers
const mySettings = {
    setting1: "value",
    setting2: 0,
    setting3: [1, "foo"],
    setting4: {
        subsetting: "red",
        subsetting2: "see-through"
    },
    setting5: false
};
```

이런 객체를 사용하면 많은 장점이 있어요:
- 읽고 이해하기 쉬워요 📖
- 다양한 타입의 값을 담을 수 있어요
- JSON과 호환돼요
- 빠른 조회와 추가가 가능해요

이걸 더 확장하고 정리해서 카테고리까지 포함할 수도 있어요:

```js:line-numbers
const mySettings = {
    colors: {
        accent: "#ff0000"
    }
    general: {
        config: {
            value: 0
        }
    }
}
```

플러그인에서 이 객체를 어디에 저장할지는 개발자에게 달려있어요. 플러그인 스타일에 따라 달라질 수도 있고요! `class`를 사용한다면 생성자에서 설정을 초기화하고 `this.settings`로 참조하는 게 도움이 될 거예요. 🤔

### 설정 저장하기

BetterDiscord는 `BdApi.Data.save`를 사용해서 설정을 JSON 파일로 쉽게 저장할 수 있는 방법을 제공해요! 이 함수는 플러그인 이름, 저장하고 싶은 키, 그리고 해당하는 데이터를 받아요. 위의 설정 객체 전체를 하나의 키로 저장하거나, 각 키를 개별적으로 저장할 수 있어요. 아래 예제들을 보면 차이점을 이해할 수 있을 거예요! 💾

전체 설정 객체를 하나의 키로 저장하기:

::: code-group

```js:line-numbers [JS]
const mySettings = {
    setting1: "value",
    setting2: 0,
    setting3: [1, "foo"],
    setting4: {
        subsetting: "red",
        subsetting2: "see-through"
    },
    setting5: false
};

BdApi.Data.save("myPlugin", "settings", mySettings);
```


```json:line-numbers [JSON]
{
    "settings": {
        "setting1": "value",
        "setting2": 0,
        "setting3": [1, "foo"],
        "setting4": {
            "subsetting": "red",
            "subsetting2": "see-through"
        },
        "setting5": false
    }
}
```
:::



각 키를 개별적으로 저장하기:

::: code-group

```js:line-numbers [JS]
const mySettings = {
    setting1: "value",
    setting2: 0,
    setting3: [1, "foo"],
    setting4: {
        subsetting: "red",
        subsetting2: "see-through"
    },
    setting5: false
};

const keys = Object.keys(mySettings);

for (const key of keys) {
    BdApi.Data.save("myPlugin", key, mySettings[key]);
}
```


```json:line-numbers [JSON]
{
    "setting1": "value",
    "setting2": 0,
    "setting3": [1, "foo"],
    "setting4": {
        "subsetting": "red",
        "subsetting2": "see-through"
    },
    "setting5": false
}
```
:::


첫 번째 방법--전체 객체를 하나의 키로 저장하는 것--이 처음에는 중복처럼 보일 수 있지만, 단일 작업으로 저장할 수 있어요! `settings` 키 아래에 두면 키 충돌을 걱정하지 않고 다른 키들 아래에 플러그인 관련 데이터를 저장할 수 있어요. 또한 설정을 불러올 때도 미리 키를 알 필요 없이 단일 작업으로 불러올 수 있답니다! ✨

### 설정 불러오기

위와 비슷하게, BetterDiscord는 `BdApi.Data.load`를 사용해서 JSON 파일에서 설정을 쉽게 불러올 수 있는 방법을 제공해요! 이 함수는 플러그인 이름과 불러오고 싶은 키를 받아요. 앞에서와 마찬가지로, 모든 것을 하나의 `settings` 키에 저장했거나 여러 키에 개별적으로 저장했을 수 있어요. 아래에서 이를 보여줄게요! 📥

하나의 키에서 전체 설정 객체 불러오기:

::: code-group

```js:line-numbers [JS]
const mySettings = BdApi.Data.load("myPlugin", "settings");
```


```js:line-numbers [JSON]
{
    "settings": {
        "setting1": "value",
        "setting2": 0,
        "setting3": [1, "foo"],
        "setting4": {
            "subsetting": "red",
            "subsetting2": "see-through"
        },
        "setting5": false
    }
}
```
:::

각 키를 개별적으로 불러오기:

::: code-group

```js:line-numbers [JS]
// 미리 키들을 알아야 해요
const mySettings = {};
const keys = ["setting1", "setting2", "setting3", "setting4", "setting5"];

for (const key of keys) {
    mySettings[key] = BdApi.Data.load("myPlugin", key);
}
```


```js:line-numbers [JSON]
{
    "setting1": "value",
    "setting2": 0,
    "setting3": [1, "foo"],
    "setting4": {
        "subsetting": "red",
        "subsetting2": "see-through"
    },
    "setting5": false
}
```
:::

데이터를 저장할 때와 마찬가지로, 개별 키로 불러오는 것보다는 전체 객체를 불러오는 게 좀 더 간단해요. 필요에 따라 불러오는 대신 한 번에 모든 것을 불러온다는 뜻이긴 하지만요! 🤷‍♀️

### 기본값 설정

개발자들이 자주 마주치는 문제 중 하나가 바로 기본값 설정이에요! 기본값을 갖는 것은 설정을 추가하거나 조정할 때 매우 유용해요. 예를 들어, `color`라는 설정이 있다고 해봐요. 색상 기반 설정이 하나뿐이라면 괜찮아요. 하지만 다른 색상을 추가한다면, `color`는 충분히 구체적이지 않아서 `accentColor`로 바꾸게 돼요. 그런데 사용자의 이전 설정을 불러오면 여전히 `color`로 되어 있을 거예요. 이게 예상치 못한 결과로 이어질 수 있어요! 😅

::: code-group

```js:line-numbers [JS]
const mySettings = BdApi.Data.load("myPlugin", "settings");
const myButton = document.getElementById("my-button");
myButton.style.color = mySettings.accentColor; // undefined
```


```js:line-numbers [JSON]
{
    "settings": {
        "color": "red"
    }
}
```
:::

이 예제에서는 버튼이 원하는 색상이 되지 않을 뿐만 아니라, 이전에 적용된 색상도 제거되어 버려요. 아마 원하는 결과가 아닐 거예요! 그럼 어떻게 해결할까요? 바로 기본값이에요! 불러온 데이터로 확장할 수 있는 기본 설정 세트가 있다면, undefined 값이 나오지 않을 거예요. 이렇게 할 수 있어요:

::: code-group

```js:line-numbers [JS]
const myDefaults = {
    accentColor: "blue"
};

const mySettings = Object.assign({}, myDefaults, BdApi.Data.load("myPlugin", "settings"));
const myButton = document.getElementById("my-button");
myButton.style.color = mySettings.accentColor; // "blue"
```


```js:line-numbers [JSON]
{
    "settings": {
        "color": "red"
    }
}
```
:::

이 경우, 버튼은 빨간색 대신 파란색이 돼요. 완전히 바람직하지는 않지만, 예상치 못한 문제는 발생하지 않아요! 이 같은 개념을 존재하지 않았던 새로운 설정을 추가할 때도 적용할 수 있어요. 💙

여기서 핵심은 `Object.assign()` 호출이에요! 이 함수는 다른 객체들을 사용해서 객체를 확장하고, 기본적으로 키들을 결합하고 덮어써요. [MDN에 훌륭한 설명](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)이 있어서 어떻게 작동하는지 자세히 알 수 있어요! 이 경우에는 순서가 중요해요. 불러온 데이터가 기본 객체의 기존 값을 덮어쓰길 원하므로, 불러온 데이터가 목록에서 마지막에 와야 해요. 대상 객체가 빈 객체 `{}`라는 것을 알 수 있을 거예요. 기본 설정 객체를 대신 사용하면, __그 객체가 수정될__ 거고 나중에 다시 사용할 때 값들이 덮어쓰일 수 있어요. `{}`를 사용하면 새로운 객체가 생성되고 반환돼요. 동등하지만 더 자세한 버전은 아래와 같아요:

```js:line-numbers
const myDefaults = {
    accentColor: "blue"
};

const mySettings = {};
const storedData = BdApi.Data.load("myPlugin", "settings");
Object.assign(mySettings, myDefaults, storedData);
```

## 설정 메뉴

### 패널 빌더

> [!NOTE]
> 이 섹션은 BetterDiscord v1.11.0 업데이트를 위해 아직 업데이트 중이에요! 진행 중인 작업으로 생각해주세요.

BetterDiscord는 설정 패널을 쉽게 만들 수 있도록 도움이 되는 유틸리티들을 제공해요! 가장 주목할 만한 건 `buildSettingsPanel` 메서드예요. 이름에서 알 수 있듯이, 전체 패널을 자동으로 만들어줄 수 있어요! 이게 어떻게 작동하는지 빠르게 데모를 보려면, 아래의 데모 플러그인을 살펴보고 Discord에서 한번 시도해보세요! 🚀

::: details 데모 플러그인

```js:line-numbers [DemoPlugin.plugin.js]
/**
 * @name 데모 플러그인
 * @description 새로 도입된 API들과 사용법을 보여주는 플러그인입니다.
 * @version 0.1.0
 * @author BetterDiscord
 */


const config = {
    changelog: [
        {
            title: "새로운 기능",
            type: "added",
            items: [
                "더 많은 설정 추가",
                "변경 로그 추가"
            ]
        },
        {
            title: "버그 수정",
            type: "fixed",
            items: [
                "다시 로드할 때 React 오류 수정"
            ]
        },
        {
            title: "개선사항",
            type: "improved",
            items: [
                "기본 플러그인 개선"
            ]
        },
        {
            title: "진행 중",
            type: "progress",
            items: [
                "더 많은 모달과 팝아웃 추가 중",
                "더 많은 클래스와 모듈 추가 중"
            ]
        }
    ],
    settings: [
        {type: "switch", id: "grandOverride", name: "패널 루트 설정", note: "이건 어떤 설정 타입이든 될 수 있어요", value: false},
        {
            type: "category",
            id: "basic",
            name: "기본 설정",
            collapsible: true,
            shown: false,
            settings: [
                {type: "color", id: "color", name: "기본 컬러피커", note: "꾸밈없는 기본 컬러 피커", value: "#ff0000", colors: null, inline: true},
                {
                    type: "dropdown",
                    id: "dropdown",
                    name: "기본 드롭다운",
                    note: "꾸밈없는 기본 드롭다운",
                    value: "arbitrary",
                    options: [
                        {label: "테스트 1", value: 50},
                        {label: "테스트 2", value: "arbitrary"},
                        {label: "마지막 테스트", value: {label: "테스트 1", value: 50}}
                    ]
                },
                {type: "file", id: "file", name: "기본 파일피커", note: "꾸밈없는 기본 파일피커"},
                {type: "keybind", id: "keybind", name: "기본 키바인드", note: "꾸밈없는 기본 키바인드", value: ["Control", "H"]},
                {type: "number", id: "number", name: "기본 숫자", note: "꾸밈없는 기본 숫자 입력", value: 50},
                {
                    type: "radio",
                    id: "radio",
                    name: "기본 라디오",
                    note: "꾸밈없는 기본 라디오",
                    value: "test",
                    options: [
                        {name: "첫 번째", value: 33},
                        {name: "또 다른", value: "test"},
                        {name: "뭔가", value: 66},
                        {name: "마지막", value: "last"}
                    ]
                },
                {type: "slider", id: "slider", name: "기본 슬라이더", note: "꾸밈없는 기본 슬라이더", value: 30, min: 20, max: 50},
                {type: "switch", id: "switch", name: "기본 스위치", note: "꾸밈없는 기본 스위치", value: false},
                {type: "text", id: "text", name: "기본 텍스트박스", note: "꾸밈없는 기본 텍스트박스", value: "기본 값"},
            ]
        },
        {
            type: "category",
            id: "advanced",
            name: "고급 설정",
            collapsible: true,
            shown: false,
            settings: [
                {type: "color", id: "advanced-color", name: "고급 컬러피커", note: "꾸밈이 있는 컬러 피커", value: "#ff0000", defaultValue: "#3E82E5", inline: true},
                {
                    type: "dropdown",
                    id: "advanced-dropdown",
                    name: "고급 드롭다운",
                    note: "투명 스타일의 드롭다운",
                    style: "transparent",
                    value: "arbitrary",
                    options: [
                        {label: "테스트 1", value: 50},
                        {label: "테스트 2", value: "arbitrary"},
                        {label: "마지막 테스트", value: {label: "테스트 1", value: 50}}
                    ]
                },
                {type: "file", id: "advanced-file", name: "고급 파일피커", note: "다중, 수락, 지우기 가능한 파일피커", multiple: true, clearable: true, accept: "image/*"},
                {type: "keybind", id: "advanced-keybind", name: "고급 키바인드", note: "최대 개수와 지우기 가능한 키바인드", value: ["Control", "Shift", "K"], max: 5, clearable: true},
                {type: "number", id: "advanced-number", name: "고급 숫자", note: "단계가 있는 숫자 입력", value: 50, min: 10, max: 100, step: 5},
                {
                    type: "radio",
                    id: "advanced-radio",
                    name: "고급 라디오",
                    note: "옵션 설명과 색상이 있는 라디오",
                    value: "test",
                    options: [
                        {name: "첫 번째", value: 33, description: "이건 추가 정보예요", color: "#ff0000"},
                        {name: "또 다른", value: "test", color: "#00ff00"},
                        {name: "뭔가", value: 66, description: "모든 옵션에 사용할 필요는 없어요", color: "#0000ff"},
                        {name: "마지막", value: "last", color: "#ffffff"}
                    ]
                },
                {type: "slider", id: "advanced-slider", name: "고급 슬라이더", note: "단위, 단계, 마커가 있는 슬라이더", value: 48, min: 32, max: 128, units: "px", markers: [32, 48, 64, 96, 128], inline: false},
                {type: "text", id: "advanced-text", name: "고급 텍스트박스", note: "플레이스홀더와 최대 길이가 있는 텍스트박스", value: "값", placeholder: "텍스트를 입력하세요...", maxLength: 6},
            ]
        },
        {
            type: "category",
            id: "disabled",
            name: "비활성화된 설정들",
            collapsible: true,
            shown: false,
            settings: []
        }
    ]
};

// 마지막 카테고리로 다른 모든 설정의 비활성화 버전을 만들어요
config.settings[config.settings.length - 1].settings = [
    ...config.settings[config.settings.length - 3].settings.map(s => ({...s, disabled: true})),
    ...config.settings[config.settings.length - 2].settings.map(s => ({...s, disabled: true})),
];
 
module.exports = class DemoPlugin {
    constructor(meta) {
        this.meta = meta;
        this.api = new BdApi(this.meta.name);
    }

    start() {
        const savedVersion = this.api.Data.load("version");
        if (savedVersion !== this.meta.version) {
            this.api.UI.showChangelogModal({
                title: this.meta.name,
                subtitle: this.meta.version,
                blurb: "이건 추가 텍스트예요",
                changes: config.changelog
            });
            this.api.Data.save("version", this.meta.version);
        }
    }

    stop() {
    }

    getSettingsPanel() {
        return BdApi.UI.buildSettingsPanel({
            settings: config.settings,
            onChange: (category, id, value) => console.log(category, id, value),
        });
    }
}
```

:::

### 클래식 HTML

`getSettingsPanel()`을 사용하고 있으니까, 설정을 나타낼 뿐만 아니라 사용자가 변경할 수 있게 해주는 HTML 요소를 만들어야 해요! 가장 좋은 방법은 각 설정을 입력값으로 바꾸고 사용자에게 보여주는 거예요. 예를 들어 이런 설정 스키마가 있다고 해봐요:

```js:line-numbers
{
    buttonText: "클릭하세요!",
    darkMode: true
}
```

첫 번째 설정인 `buttonText`는 문자열이니까 텍스트 입력 `input[type=text]`로 나타내는 게 가장 좋아요. 두 번째인 `darkMode`는 불린값이니까 체크박스 `input[type=checkbox]`로 나타내는 게 가장 좋겠죠! 🎯

그래서 그냥 HTML로 하면 이렇게 보일 거예요:

```html:line-numbers
<div id="my-settings">
    <div class="setting"><span>버튼 텍스트</span> <input type="text" name="buttonText"></div>
    <div class="setting"><span>다크 모드</span> <input type="checkbox" name="darkMode"></div>
</div>
```

자, 이제 JavaScript로 만들어봐요!

```js:line-numbers
const mySettingsPanel = document.createElement("div");
mySettingsPanel.id = "my-settings";


const buttonTextSetting = document.createElement("div");
buttonTextSetting.classList.add("setting");

const buttonTextLabel = document.createElement("span")
buttonTextLabel.textContent = "버튼 텍스트";

const buttonTextInput = document.createElement("input");
buttonTextInput.type = "text";
buttonTextInput.name = "buttonText";

buttonTextSetting.append(buttonTextLabel, buttonTextInput);


const darkModeSetting = document.createElement("div");
darkModeSetting.classList.add("setting");

const darkModeLabel = document.createElement("span")
darkModeLabel.textContent = "다크 모드";

const darkModeInput = document.createElement("input");
darkModeInput.type = "checkbox";
darkModeInput.name = "darkMode";

darkModeSetting.append(darkModeLabel, darkModeInput);


mySettingsPanel.append(buttonTextSetting, darkModeSetting);
```

좀 길긴 하지만, 도우미 함수 없이 바닐라 JS로 하면 이렇게 보일 거예요! 그럼에도 불구하고 우리가 만든 HTML을 나타내는 `mySettingsPanel`을 얻었어요. 이걸 플러그인에 넣고 어떻게 보이는지 확인해봐요. `mySettingsPanel`을 `return`하는 걸 잊지 마세요! 😊

```js:line-numbers
/**
 * @name 튜토리얼플러그인
 * @author 여러분의이름
 * @description BetterDiscord 플러그인 만드는 법을 배워봐요!
 * @version 0.0.1
 */

module.exports = meta => {

  return {
    start: () => {
      
    },
    stop: () => {
      
    },
    getSettingsPanel: () => {
        const mySettingsPanel = document.createElement("div");
        mySettingsPanel.id = "my-settings";


        const buttonTextSetting = document.createElement("div");
        buttonTextSetting.classList.add("setting");

        const buttonTextLabel = document.createElement("span")
        buttonTextLabel.textContent = "버튼 텍스트";

        const buttonTextInput = document.createElement("input");
        buttonTextInput.type = "text";
        buttonTextInput.name = "buttonText";

        buttonTextSetting.append(buttonTextLabel, buttonTextInput);


        const darkModeSetting = document.createElement("div");
        darkModeSetting.classList.add("setting");

        const darkModeLabel = document.createElement("span")
        darkModeLabel.textContent = "다크 모드";

        const darkModeInput = document.createElement("input");
        darkModeInput.type = "checkbox";
        darkModeInput.name = "darkMode";

        darkModeSetting.append(darkModeLabel, darkModeInput);


        mySettingsPanel.append(buttonTextSetting, darkModeSetting);

        return mySettingsPanel;
    }
  }
};
```

설정에서 플러그인을 활성화하고, 플러그인 설정 버튼을 클릭해보세요. 이런 걸 보게 될 거예요:

![지금은 못생긴 설정](./img/plugin_settings.png)

지금은 별로 예쁘지 않지만, 이 튜토리얼에서는 기능에 집중하고 있으니까 괜찮아요! 😅

기능에 대해 말하자면, 이 패널은 많은 일을 하지 않아요. 현재 값을 보여주지도 않고 사용자의 업데이트에 반응하지도 않아요. 고쳐봐요!

```js:line-numbers
// 위의 입력 요소
buttonTextInput.value = mySettings.buttonText; // 어딘가에 저장된 값
buttonTextInput.addEventListener("change", () => {
    mySettings.buttonText = buttonTextInput.value;
});

// 위의 입력 요소
darkModeInput.value = mySettings.darkMode; // 어딘가에 저장된 값
darkModeInput.addEventListener("change", () => {
    mySettings.darkMode = darkModeInput.value;
});
```

이걸 이전 코드와 결합하면, 반복되는 작업이 많이 생겨요. 몇 가지 다른 방법으로 정리할 수 있는데, 이 튜토리얼에서는 작은 도우미 함수를 선택했어요! 🛠️

```js:line-numbers
function buildSetting(text, key, type, value, callback = () => {}) {
    const setting = Object.assign(document.createElement("div"), {className: "setting"});
    const label = Object.assign(document.createElement("span"), {textContent: text});
    const input = Object.assign(document.createElement("input"), {type: type, name: key, value: value});
    if (type == "checkbox" && value) input.checked = true;
    input.addEventListener("change", () => {
        const newValue = type == "checkbox" ? input.checked : input.value;
        mySettings[key] = newValue;
        BdApi.Data.save(meta.name, "settings", mySettings);
        callback(newValue);
    });
    setting.append(label, input);
    return setting;
}
```

이렇게 하면 `getSettingsPanel()`이 좀 더 소화하기 쉬워 보여요!

```js:line-numbers
const mySettingsPanel = document.createElement("div");
mySettingsPanel.id = "my-settings";

const buttonText = buildSetting("버튼 텍스트", "buttonText", "text",
                                mySettings.buttonText, updateButtonText);
const darkMode = buildSetting("다크 모드", "darkMode", "checkbox",
                              mySettings.darkMode, updateButtonTheme);

mySettingsPanel.append(buttonText, darkMode);
```

여기서 볼 수 있듯이, 이제 패널이 열릴 때 설정의 저장된 값이 표시되고, 사용자가 설정을 업데이트할 수 있게 됐어요! 그리고 우리의 도우미 함수 덕분에, 이 값들도 저장될 거예요. 🎉

모든 조각들을 합치고 [DOM](./dom) 섹션에서 만든 버튼과 결합하면, 이런 플러그인이 될 수 있어요:

```js:line-numbers
/**
 * @name 튜토리얼플러그인
 * @author 여러분의이름
 * @description BetterDiscord 플러그인 만드는 법을 배워봐요!
 * @version 0.0.1
 */

module.exports = meta => {

    const mySettings = {buttonText: "클릭하세요!", darkMode: true};

    function buildSetting(text, key, type, value, callback = () => {}) {
        const setting = Object.assign(document.createElement("div"), {className: "setting"});
        const label = Object.assign(document.createElement("span"), {textContent: text});
        const input = Object.assign(document.createElement("input"), {type: type, name: key, value: value});
        if (type == "checkbox" && value) input.checked = true;
        input.addEventListener("change", () => {
            const newValue = type == "checkbox" ? input.checked : input.value;
            mySettings[key] = newValue;
            BdApi.Data.save(meta.name, "settings", mySettings);
            callback(newValue);
        });
        setting.append(label, input);
        return setting;
    }


    const myButton = document.createElement("button");
    myButton.addEventListener("click", () => {window.alert("안녕하세요 세상!");});

    // highlight-start
    function updateButtonText() {
        myButton.textContent = mySettings.buttonText;
    }

    function updateButtonTheme() {
        if (mySettings.darkMode) {
            myButton.style.color = "white";
            myButton.style.backgroundColor = "black";
        }
        else {
            myButton.style.color = "black";
            myButton.style.backgroundColor = "white";
        }
    }
    // highlight-end

  return {
    start: () => {
        Object.assign(mySettings, BdApi.Data.load(meta.name, "settings"));
        const serverList = document.querySelector("#app-mount");
        serverList.append(myButton);
        updateButtonText();
        updateButtonTheme();
    },
    stop: () => {
        myButton.remove();
    },
    getSettingsPanel: () => {
        const mySettingsPanel = document.createElement("div");
        mySettingsPanel.id = "my-settings";

        const buttonText = buildSetting("버튼 텍스트", "buttonText", "text",
                                        mySettings.buttonText, updateButtonText);
        const darkMode = buildSetting("다크 모드", "darkMode", "checkbox",
                                      mySettings.darkMode, updateButtonTheme);

        mySettingsPanel.append(buttonText, darkMode);
        return mySettingsPanel;
    }
  }
};
```

여기서 새로운 부분은 업데이트 함수들인 `updateButtonText`와 `updateButtonTheme`인데, 읽어보면 꽤 직관적이에요! 이걸 플러그인 폴더에 저장하고 테스트해보세요. 이 섹션을 완료했다면, 실제로 작동하는 설정이 있는 플러그인 만드는 법을 성공적으로 배운 거예요! 🎊

다음으로 넘어갈 준비가 되면, Discord와 BetterDiscord 내의 다양한 UI 요소들을 다루는 다음 챕터인 [UI 컴포넌트](./ui)를 확인해보세요!