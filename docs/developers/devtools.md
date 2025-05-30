---
order: 2
description: 개발의 필수 도구들을 알아보아요!
---

# 개발자 도구 🛠️

일반적인 웹 개발과 React UI 라이브러리 작업에 도움이 되는 도구들이에요!

### 크로미움 개발자도구 (Chromium DevTools)

웹 개발 경험이 있으시다면 Chrome/Chromium 개발자도구에 이미 익숙하실 거예요! 그렇지 않다면 [공식 문서](https://developer.chrome.com/docs/devtools/)를 한 번 훑어보시는 것이 좋겠어요.

Discord (그리고 BetterDiscord) 환경에서 작업할 때도 이 개발자도구에 접근할 수 있어요! Discord는 기본적으로 이 기능을 비활성화해두었지만, BetterDiscord 설정에서 다시 활성화할 수 있답니다. BetterDiscord 설정 페이지로 가서 개발자 설정을 찾으신 다음, 개발자도구 옵션을 체크해주세요.

![Developer Tools](./img/developer_settings.png)

이 옵션을 활성화하면 Chrome에서처럼 `Ctrl`+`Shift`+`I` (Mac의 경우 `Cmd`+`Opt`+`I`)를 눌러서 개발자도구를 열 수 있어요!

### React 개발자 도구 ⚛️

웹 개발 경험은 있지만 React 경험이 많지 않으시다면 [공식 문서](https://reactjs.org/tutorial/tutorial.html)를 한 번 훑어보시는 것이 좋겠어요! React 개발자도구를 위한 [튜토리얼](https://react-devtools-tutorial.vercel.app/)도 살펴보시면 도움이 될 거예요.

이 환경은 크로미움 개발자도구를 갖추고 있기 때문에, 그 개발자도구용 확장 프로그램들을 추가할 수 있어요! 안타깝게도 Discord나 BetterDiscord와 함께 패키지되어 있지는 않지만, React 개발자도구를 다운로드해서 BetterDiscord 폴더에 넣으면 BetterDiscord가 추가해줄 수 있답니다!

설정하려면 이 [특별한 manifest v2](https://github.com/mondaychen/react/raw/017f120369d80a21c0e122106bd7ca1faa48b8ee/packages/react-devtools-extensions/ReactDevTools.zip) 버전의 확장 프로그램을 다운로드하세요. 현재 Chrome 확장 프로그램 스토어의 버전은 manifest v3만 지원하는데, 이는 Electron과 호환되지 않아요.

BetterDiscord 폴더를 열고 `extensions`라는 새 폴더를 만들어주세요. 이 폴더 안에 React 개발자도구 확장 프로그램 ID인 `fmkadmapgofadopljbjfkapdkoienihi`라는 또 다른 새 폴더를 만들어주세요. 경로는 `<BetterDiscord>/extensions/fmkadmapgofadopljbjfkapdkoienihi/`처럼 보여야 해요. 다운로드한 `zip` 파일의 내용을 이 폴더에 직접 압축해제해주세요.

::: code-group

```console [Windows]
%appdata%\BetterDiscord\extensions\fmkadmapgofadopljbjfkapdkoienihi\
```

```console [Mac]
~/Library/Application Support/BetterDiscord/extensions/fmkadmapgofadopljbjfkapdkoienihi/
```

```console [Linux]
~/.config/BetterDiscord/extensions/fmkadmapgofadopljbjfkapdkoienihi/
```

:::

설치가 완료되면 BetterDiscord의 개발자 설정([위 이미지](#크로미움-개발자도구-chromium-devtools)와 같은 곳)으로 돌아가서 이번에는 React 개발자도구 옵션을 선택해주세요. BetterDiscord가 재시작을 요청할 거예요.

재시작 후 `Ctrl`+`Shift`+`I` (Mac의 경우 `Cmd`+`Opt`+`I`)를 눌러서 개발자도구를 열면 React 개발자도구 탭인 `Components`와 `Profiler`가 추가된 것을 확인할 수 있어요!

![React DevTools](./img/react_devtools.png)

만약 거기서 보이지 않는다면 탭 오버플로우를 확인해서 목록 끝에 추가되었는지 확인해보세요!

![Tab Overflow](./img/devtools_tab_overflow.png)

<!-- ## 개발 환경

### IDE

### 빌드 도구 -->