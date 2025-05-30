---
order: 2
description: 플러그인 번들링을 배워봐요!
---

# 번들링 (Bundling)

## 배경 지식

### 번들링이 뭔가요?

JavaScript 생태계에서 번들링(bundling)은 여러 파일을 가져와서 하나의 큰 파일로 묶는 기술이에요. 이때 임포트와 익스포트는 모든 파일이 분리되어 있는 것처럼 유지돼요. 번들링은 트랜스파일레이션(transpilation)의 한 형태이기도 해요.

### 왜 필요한가요?

번들링을 사용하면 다른 JavaScript 프로젝트처럼 플러그인을 구조화할 수 있지만, BetterDiscord에서 필요로 하는 단일 파일로 전달할 수 있어요. 번들링은 또한 [TypeScript](https://www.typescriptlang.org/)나 JSX 같은 다른 형태의 트랜스파일레이션으로 가는 문을 열어줘요! 🎯

### 어떤 번들러를 선택해야 하나요?

음... 잘 모르겠어요! 😅 모든 번들러가 각각의 장단점을 가지고 있고, Snipcart에서 [심화 가이드](https://snipcart.com/blog/javascript-module-bundler)에서 정말 잘 분석해뒀어요. 한 번 살펴보시고, 몇 가지 다른 번들러들을 시도해보면서 여러분과 여러분의 프로젝트에 맞는 것을 찾아보세요. Snipcart 목록에서 빠진 주목할 만한 번들러 중 하나는 가장 빠른 빌드 속도를 자랑하는 [esbuild](https://esbuild.github.io/)에요.

## 사용법

::: tip 참고! 📝

이 섹션에서는 BetterDiscord와 함께 사용할 Webpack 설정 방법을 다룰 예정이에요. 여러분만의 번들러 문서를 확인해서 여기 보여진 것과 비슷한 설정 옵션들을 찾아보세요.

:::

계속하기 전에 `package.json`을 먼저 설정했는지 확인해주세요.

### 설치

BetterDiscord용 Webpack을 시작하려면, Webpack을 설치하세요!

```bash
npm install --save-dev webpack webpack-cli
```

### 플러그인 구조

기본 플러그인 구조는 소스 폴더 `src`, 진입점 `src/index.js`, 플러그인 설정 `src/config.json`, webpack 설정 `webpack.config.js` 그리고 물론 `package.json`으로 구성돼요. 더 자세한 시각적 구조는 아래를 보세요.

```js
.
├──dist                    // Webpack의 모든 출력물들, git에 커밋하지 마세요.
│   └──MyPlugin.plugin.js  // BetterDiscord 호환 출력물
├──src                     // 여러분의 소스 코드
│   ├──config.json         // 플러그인 설정 파일, 메타 주석을 대체해요
│   ├──component.js        // 포함해야 할 다른 파일들
│   └──index.js            // Webpack 진입점이자 플러그인의 메인 로직
├──package.json            // 모듈의 패키지 정보
└──webpack.config.js       // Webpack 빌드 설정 파일
```

### 플러그인 만들기

간단하게 하기 위해, [이전 섹션](./react.md)의 플러그인을 가져와서 분리하고 Webpack으로 빌드해보도록 해요. 그 플러그인의 구성 요소들을 식별해보면 메타 주석, React 컴포넌트, 메인 플러그인 클래스로 나뉘어요. 그래서 아래 보이는 것처럼 세 개의 다른 파일에 해당해요.

::: code-group
```json:line-numbers [src/config.json]
{
  "name": "내 컴포넌트 데모",
  "description": "커스텀 React 컴포넌트로 설정 패널 보여주기",
  "author": "BetterDiscord"
}
```

```jsx:line-numbers [src/component.js]
export default function MyComponent({disabled = false}) {
  const [isDisabled, setDisabled] = BdApi.React.useState(disabled);
  return BdApi.React.createElement("button", {className: "my-component", disabled: isDisabled}, "안녕하세요!");
}
```


```jsx:line-numbers [src/index.js]
import MyComponent from "./component";
  
export default class test { 
  start() {}
  stop() {}

  getSettingsPanel() {
    return MyComponent;
  }
}
```
:::

주목할 점은 `src/config.json`에 버전 번호가 **포함되지 않는다**는 거예요. `package.json`에 이미 버전 번호가 있어서 이중 관리할 필요가 없거든요. 나중에 이를 어떻게 활용하는지 보여드릴게요!

### Webpack 설정하기

Webpack 자체를 설정하기 전에, `package.json`에 빌드 스크립트를 추가해보도록 해요.

```json [package.json]
{
  "scripts": {
    "build": "webpack --progress --color"  // [!code ++]
  }
}
```

이제 이걸 정리했으니, 일반적인 commonjs 출력 Webpack 설정을 살펴보도록 해요.

```js:line-numbers [webpack.config.js]
const path = require("path");

module.exports = {
  mode: "development",
  target: "node",
  devtool: false,
  entry: "./src/index.js",
  output: {
    filename: "MyPlugin.plugin.js",
    path: path.join(__dirname, "dist"),
    libraryTarget: "commonjs2",
    libraryExport: "default",
    compareBeforeEmit: false
  },
  resolve: {
    extensions: [".js"],
  },
};
```

이것으로 플러그인을 빌드하면 (`npm run build`) 꽤 괜찮아 보일 거예요. `src/index.js`의 기본 익스포트가 `module.exports`에 할당되는 것도 볼 수 있을 거고요. 하지만 BetterDiscord에서는 로드되지 않을 거예요. 왜냐하면 상단의 메타 주석이 생성되지 않았거든요! 😱

#### 메타 빌드하기

그럼 출력물에 메타를 어떻게 추가할까요? Webpack 배너 플러그인을 사용해요! 먼저 메타 주석을 문자열로 만들어보도록 해요.

```js:line-numbers
const pkg = require("./package.json");
const pluginConfig = require("./src/config.json");
pluginConfig.version = pkg.version;

const meta = (() => {
  const lines = ["/**"];
  for (const key in pluginConfig) {
    lines.push(` * @${key} ${pluginConfig[key]}`);
  }
  lines.push(" */");
  return lines.join("\n");
})();
```

보시다시피, 이건 `package.json`에서 버전을 가져와서 앞서의 질문에 답하고 있어요. 이제 `meta`에는 주석 문자열이 포함되어 있고, 빌드 끝에 파일 시작 부분에 추가하기만 하면 돼요.

```js:line-numbers [webpack.config.js]
const webpack = require("webpack");

const meta = "..."; // 앞서 만든 메타

module.exports = {
  ..., // 나머지 설정
  plugins: [
    new webpack.BannerPlugin({raw: true, banner: meta}),
  ]
}
```

모든 걸 합치면 이런 완전한 설정이 나와요:

```js:line-numbers [webpack.config.js]
const path = require("path");
const webpack = require("webpack");
const pkg = require("./package.json");
const pluginConfig = require("./src/config.json");
pluginConfig.version = pkg.version;

const meta = (() => {
  const lines = ["/**"];
  for (const key in pluginConfig) {
    lines.push(` * @${key} ${pluginConfig[key]}`);
  }
  lines.push(" */");
  return lines.join("\n");
})();

module.exports = {
  mode: "development",
  target: "node",
  devtool: false,
  entry: "./src/index.js",
  output: {
    filename: "test.plugin.js",
    path: path.join(__dirname, "dist"),
    libraryTarget: "commonjs2",
    libraryExport: "default",
    compareBeforeEmit: false
  },
  resolve: {
    extensions: [".js"],
  },
  plugins: [
    new webpack.BannerPlugin({raw: true, banner: meta}),
  ]
};
```

이제 빌드하고 (`npm run build`) `plugins` 폴더에 복사하면, 성공적으로 로드되었다는 작은 토스트를 볼 수 있을 거예요!

토스트를 보셨다면, 축하해요! 여러분은 성공적으로 Webpack을 설정해서 플러그인을 빌드했어요! 🎉 하지만... 더 잘할 수 있을까요?

## 더 나아가기

Webpack을 사용해서 플러그인을 빌드할 수 있게 되었네요, 정말 좋아요! 하지만 더 원하는 게 있다면 어떨까요? Webpack이 빌드된 플러그인을 `plugin` 폴더에 자동으로 복사해서 우리가 수동으로 할 필요가 없도록 하고 싶다면? 아니면 TypeScript를 사용하고 싶다면? React용 JSX는 어떨까요? CSS 포함도 가능할까요?

이런 질문들이 떠올랐다면, 계속 읽어보세요! 😊

### 복사 플러그인

이건 Webpack과 BetterDiscord로 작업할 때 가장 흔한 요구사항 중 하나에요. 또한 정말 쉽게 할 수 있어요! Webpack 설정 파일을 열고 상단에 두 개의 새로운 import를 추가하세요.

```js
const fs = require("fs"); // [!code ++]
const path = require("path");  // [!code ++]
```

우리가 직접 작성할 새 플러그인에서 이것들을 사용할 거예요. Webpack용 플러그인 만들기는 정말 쉬워요. 플러그인이 빌드된 후 실행되는 가장 간단한 구조(우리가 사용할 것)는 이렇게 생겼어요:

```js
{
  apply: (compiler) => {
    compiler.hooks.assetEmitted.tap("YourPluginName", (filename, info) => {
      // 여러분의 코드가 여기에!
    });
  }
}
```

`YourPluginName`은 뭐든지 부를 수 있어요. 그냥 tap들을 구분하는 데 사용돼요. 이제 실제로 파일을 복사할 수 있는 코드를 작성해야 해요. 여기서 보여드릴 방법은 플랫폼에 구애받지 않지만 좀 장황해요. 그러니 여러분만의 시스템에서만 작동하도록 자유롭게 변경해보세요.

```js:line-numbers
const userConfig = (() => {
  if (process.platform === "win32") return process.env.APPDATA;
  if (process.platform === "darwin") return path.join(process.env.HOME, "Library", "Application Support");
  if (process.env.XDG_CONFIG_HOME) return process.env.XDG_CONFIG_HOME;
  return path.join(process.env.HOME, "Library", ".config");
})();
const bdFolder = path.join(userConfig, "BetterDiscord");
fs.copyFileSync(info.targetPath, path.join(bdFolder, "plugins", filename));
console.log(`\n\n✅ BD 폴더에 복사됨\n`);
```

이 코드를 앞의 `assetEmitted` tap 안에 넣고, 그 전체 섹션을 Webpack 설정의 `plugins` 부분에 붙여넣으세요. 다음에 빌드할 때, 여러분의 플러그인이 자동으로 `plugin` 폴더에 복사될 거예요! 🚀

### CSS

Webpack에서 CSS가 보통 작동하는 방식은 `style-loader`를 사용하는 건데, 이건 JS 번들과 함께 자동으로 로드되는 동반 CSS 번들을 빌드해요. 이건 BetterDiscord 플러그인에는 실제로 옵션이 아니에요. 왜냐하면 단일 파일로 유지해야 하고 활성화될 때만 CSS를 활성화해야 하거든요.

우리가 일반적으로 사용하는 건 `raw-loader`에요. 그래서 아래에서 이걸 보여드릴 거예요. 이 로더는 설정된 외부 파일들을 메인 번들에 포함되는 문자열로 로드해요. 이렇게 하면 플러그인이 `BdApi`를 사용해서 마음대로 다양한 스타일을 추가하고 제거할 자유를 얻을 수 있어요.

#### 설치

```bash
npm install --save-dev raw-loader
```

#### 설정

Webpack 설정에 작은 `rules` 섹션을 추가하고 `.css` 파일들도 해결할 수 있도록 허용하세요.

```js [webpack.config.js]
module.exports = {
  ...,
  resolve: {
    extensions: [".js"], // [!code --]
    extensions: [".js", ".css"], // [!code ++]
  },
  ...,
  module: { // [!code ++]
    rules: [{test: /\.css$/, use: "raw-loader"}] // [!code ++]
  }, // [!code ++]
  ...
}
```

이렇게 하면 `/\.css$/` 정규식을 사용해서 CSS 파일에 영향을 주도록 `raw-loader`가 설정돼요. 이 정규식은 `.css`로 끝나는 포함되는 파일명들을 확인해요. 우리 사용 사례에 완벽하네요!

#### 사용법

그럼 어떻게 사용할까요? 소스 디렉토리 어딘가에 CSS를 만드세요. 그다음 간단히 `require`/`import`해서 문자열처럼 다루면 돼요!

```js:line-numbers [src/index.js]
import styles from "./styles.css";

export default class MyPlugin {
  constructor(meta) {
    this.meta = meta;
  }

  start() {
    BdApi.DOM.addStyle(this.meta.name, styles);
  }

  stop() {
    BdApi.DOM.removeStyle(this.meta.name);
  }
}
```

한번 시도해보세요. 정말 그렇게 쉽다는 걸 알게 될 거예요! 😄

### JSX

Webpack에서 JSX를 사용하는 데 도움이 될 수 있는 트랜스파일러가 여러 개 있어요. 이 간단한 가이드에서는 [Babel](https://babeljs.io/)을 사용한 트랜스파일레이션을 보여드릴게요.

#### 설치

```bash
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader
```

#### 설정

방금 설치한 두 프리셋을 포함하는 새로운 `.babelrc` 파일을 만드세요.

```json:line-numbers [.babelrc]
{
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "node": "16.17.1",
          "chrome": "108"
        }
      }
    ],
    "@babel/preset-react"
  ]
}
```

이제 Webpack 설정을 조정해서 `.jsx` 파일들을 해결하고 `.jsx` 파일들에 `babel-loader`를 사용하도록 하세요.

```js:line-numbers [webpack.config.js]
module.exports = {
  // ...,
  resolve: {
    extensions: [".js"], // [!code --]
    extensions: [".js", ".jsx"], // [!code ++]
  },
  ...,
  module: { // [!code ++]
    rules: [{test: /\.jsx$/, exclude: /node_modules/, use: "babel-loader"}] // [!code ++]
  }, // [!code ++]
  // ...
}
```

다른 트랜스파일레이션 요구사항이 있다면 모든 `.js` 파일에도 선택적으로 `babel-loader`를 사용할 수 있지만, 여기서는 JSX 변환기로만 사용하고 있어요.

#### 사용법

앞서 원래 Webpack 설정에서 했던 걸 기억하시나요? `src/component.js`를 `src/component.jsx`로 바꿔보도록 해요.

```jsx:line-numbers [src/component.jsx]
export default function MyComponent({disabled = false}) {
    const [isDisabled, setDisabled] = BdApi.React.useState(disabled);
    return <button className="my-component" disabled={isDisabled}>
            "안녕하세요!"
          </button>;
}
```

이제 이걸 빌드하고 설정 패널을 열면, `React is not defined`라는 에러가 나올 거예요. 왜냐하면 `babel-loader`가 `React.createElement`를 사용하고 `BdApi.React.createElement`를 사용하지 않기 때문이에요. 이걸 해결하는 방법이 두 가지 있는데, 가장 쉬운 방법은 컴포넌트 파일 상단에 `const React = BdApi.React;`를 넣는 거예요. 단일 파일에는 괜찮지만, 플러그인이 확장되면서 매우 번거로워져요. `.babelrc`에 작은 조정 하나로 이걸 해결할 수 있어요.

```json:line-numbers [.babelrc]
{
  "presets": [
    // ...,
    "@babel/preset-react" // [!code --]
    [ // [!code ++]
      "@babel/preset-react", // [!code ++]
      { // [!code ++]
        "pragma": "BdApi.React.createElement" // [!code ++]
      } // [!code ++]
    ] // [!code ++]
  ]
}
```

이제 다시 빌드하고 설정 패널을 열어보세요. 완벽하게 로드되는 걸 보실 수 있을 거예요! ✨

### TypeScript

이건 BetterDiscord에 특별한 요구사항이 없어요! Webpack과 함께 TypeScript를 사용하는 방법에 대한 [Webpack의 공식 가이드](https://webpack.js.org/guides/typescript/)를 살펴보세요.
