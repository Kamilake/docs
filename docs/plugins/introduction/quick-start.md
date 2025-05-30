---
order: 1
description: 빠르게 시작해보세요!
---

# 빠른 시작

## Hello World 🌍

이미 기본을 알고 있거나, 직접 시도해보고 탐구하면서 배우는 것을 선호한다면, 이 기본 플러그인 템플릿을 시도해보세요!

```js:line-numbers [YourPlugin.plugin.js]
/**
 * @name YourPlugin
 * @author YourName
 * @description 기본 기능을 설명해주세요. 지원 서버 링크도 좋아요!
 * @version 0.0.1
 */

module.exports = class YourPlugin {
    start() {
      // 플러그인이 활성화될 때 호출됩니다 (재로드 후에도 포함)
      BdApi.alert("안녕하세요!", "이것은 제 첫 번째 플러그인이에요! 🎉");
    } 

    stop() {
      // 플러그인이 비활성화될 때 호출됩니다
    }
}
```

이것을 아래에 있는 플러그인 폴더에 `YourPlugin.plugin.js`로 저장하고 활성화해보세요! ✨

## 플러그인 폴더 📁

::: code-group

```console [Windows]
%appdata%\BetterDiscord\plugins
```

```console [Mac]
~/Library/Application Support/BetterDiscord/plugins
```

```console [Linux]
~/.config/BetterDiscord/plugins
```

:::