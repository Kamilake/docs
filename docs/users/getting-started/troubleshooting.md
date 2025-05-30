---
order: 3
description: 문제가 생겼을 때 도움이 되는 해결 방법들이에요! 🛠️
---

# 문제 해결 가이드

::: warning

이 문서로도 해결이 안 된다면 걱정하지 마세요! 😊 저희 [디스코드 서버](https://betterdiscord.app/invite)의 `#support` 채널에서 언제든 도움을 요청해 주세요!

:::

## 크래시(충돌) 문제

BetterDiscord를 사용하다가 충돌이 일어나면 정말 속상하죠! 😰 하지만 걱정 마세요, 이런 문제들을 해결하는 유용한 팁들을 알려드릴게요!

::: details ⚠️ BetterDiscord가 클라이언트를 충돌시킨 것 같습니다.

이건 정말 포괄적인 오류 메시지예요! 실제로는 여러 가지 원인이 있을 수 있어요. 그리고 사실 BetterDiscord가 원인이 아닐 수도 있답니다 - 플러그인이나 심지어 Discord 자체가 문제일 수도 있어요! BetterDiscord가 정확한 원인을 파악하기 어려워서 모든 오류를 잡아내려고 하는 거예요.

이런 문제들을 해결하는 방법들이에요:
 - Canary나 PTB에서 Stable로 바꿔보기
 - 라이브러리 플러그인들을 수동으로 업데이트하기
 - 비공식 플러그인들 제거해보기
 - 플러그인 폴더 이름 바꿔보기

 :::


::: details "음, 이거 참 난감하네요" 또는 "Error Level 9000에 의해 학살당했군요"

이런 유형의 오류는 대부분 플러그인이나 BetterDiscord가 구버전일 때 발생해요! 😅 BetterDiscord와 플러그인, 그리고 키들이 모두 최신 버전인지 확인해 주세요!

:::

## 설치 문제들

BetterDiscord를 설치할 때 자주 마주치는 문제들과 함정들을 다뤄볼게요! 🤔

### 일반적인 문제들


::: details Stable을 선택할 수 없거나 설치 후에도 BetterDiscord가 설치되지 않았어요

이건 보통 Windows에서 Discord가 설치 위치를 이리저리 옮겨다녀서 생기는 문제예요! 😵 가끔 설치 프로그램이 뭘 해야 할지 구분하지 못할 때가 있어요. 해결하려면 설치 프로그램에서 `찾아보기(Browse)`를 선택한 다음, 상단 주소 표시줄에 `%localappdata%/discord/app-1.0.9006/resources`를 입력해 보세요. 같은 문제가 계속 발생하면 `%programdata%/%username%/Discord/app-1.0.9006/resources`로 시도해 보세요!

![ProgramData](./img/programdata.gif)
:::


::: details 설치 프로그램이 열리지 않아요

Linux를 사용한다면 `--no-sandbox` 옵션으로 실행해 보세요! 🐧

설치 프로그램이 열리지 않는다면, 이 단계들을 따라해 보세요:
1. [7-Zip](https://www.7-zip.org/)을 다운로드하고 설치해요
1. BetterDiscord 설치 프로그램을 우클릭하고 폴더에 압축을 풀어주세요
1. 폴더 안에 있는 exe 파일을 실행해보세요

또는

[수동 설치](../getting-started/installation.md#manual-installation) 방법을 따라해 보세요!
:::


::: details 설치 프로그램이 온통 검은색이에요

다음 방법들 중 하나를 시도해 보세요:
 - 설치 프로그램을 우클릭하고 "관리자 권한으로 실행"을 선택해 보세요
 - `Win`+`R`을 눌러 명령 프롬프트를 열고 `cmd`를 입력한 후 엔터를 눌러요. 그 다음 나타나는 창에서 `ipconfig /flushdns`를 입력하고 엔터를 눌러보세요
 - 안티바이러스를 잠시 비활성화해 보세요

또는

[수동 설치](../getting-started/installation.md#manual-installation) 방법을 따라해 보세요!
:::



::: details 약관 동의 체크박스를 클릭할 수 없어요

체크박스 대신 옆에 있는 텍스트를 클릭해 보세요! 연결되어 있답니다! 😉

![Checkbox Workaround](./img/agreement_text.png)
:::

### 특정 오류들


::: details ❌ "Cannot read property "assets" of undefined" 또는 "downloading asar file..."에서 설치가 멈춰요

설치 프로그램이 구버전이에요! 😱 [BetterDiscord 웹사이트](https://betterdiscord.app)에 가서 새로운 버전을 다운로드해 주세요!
:::


::: details ❌ "EACCES: permission denied, mkdir" 또는 "shims"에서 "mkdir" 오류가 발생해요

Discord 설치가 손상되었네요! 😰 Discord를 재설치해 보세요. Discord 재설치가 실패하거나 여전히 이 오류가 발생한다면, [Discord를 완전히 제거](https://discordtips.com/how-to-fully-uninstall-discord/)한 후 다시 설치하는 것이 최선의 방법이에요!
:::


::: details ❌ "Cannot read property "hasOwnProperty" of undefined" 오류가 나와요

Discord를 완전히 닫아주세요. VPN이나 방화벽을 모두 비활성화해 보세요. 설치 프로그램이 최신 버전인지 확인한 다음 다시 시도해 보세요. 그래도 안 된다면, 위에서 언급한 Discord 완전 제거 후 재설치를 해보세요! 💪
:::


::: details ❌ "getaddrinfo ENOTFOUND api.github.com" 오류가 발생해요

안티바이러스를 비활성화하거나 DNS 서버를 바꿔보세요! DNS 서버 변경에 대한 좋은 가이드가 여기 있어요: https://www.ionos.com/digitalguide/server/configuration/how-to-change-dns-server/ 😊
:::
