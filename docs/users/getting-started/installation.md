---
order: 1
description: BetterDiscord를 설치하는 빠른 가이드예요! 🚀
---

# 설치 가이드

::: warning

이 단계들을 따라하다가 문제가 생긴다면, [문제 해결 가이드](./troubleshooting)를 확인해 보세요! 😊

:::

## 자동 설치

### 동영상 튜토리얼

동영상으로 배우는 걸 좋아한다면, 이걸 확인해 보세요! 🎥

<iframe style="width: 100%; aspect-ratio: 16 / 9; max-width: 688px;" src="https://www.youtube.com/embed/n_CCYtIZj0Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### 단계별 설명

1. [BetterDiscord 웹사이트](https://betterdiscord.app)에 가서 큰 다운로드 버튼을 클릭해요! 컴퓨터 어딘가에 저장해 주세요 📁
2. 이전 단계에서 다운로드한 설치 프로그램을 열어주세요
3. 라이선스 약관에 동의하고, 다음 버튼을 클릭해서 계속 진행해요! ✨

![BetterDiscord Installer](./img/installer.png)

4. `Install(설치)`을 선택한 다음 next 버튼을 클릭해서 설치를 진행해요
5. 사용하고 싶은 Discord 버전을 선택해요. 뭔지 잘 모르겠다면 그냥 `Stable`을 선택하면 돼요! 😄 준비되면 install 버튼을 클릭해요
6. 설치 프로그램이 설치 과정을 처리하도록 기다려요. 설치가 완료되면 알려줄 거예요!
7. BetterDiscord가 제대로 설치되었는지 확인해 보세요
  - Discord를 열고(또는 전환하고) Discord 설정을 열어요
  - 왼쪽 탭들을 확인해서 `BetterDiscord`라는 새로운 섹션이 있는지 봐요! (아래 참고)

![BetterDiscord Settings Tabs](./img/bd_settings_tabs.png)

8. BetterDiscord를 즐겨보세요! 🎉



## 수동 설치

자동 설치가 안 되는 분들, 설치 과정을 더 세밀하게 컨트롤하고 싶은 분들, 그리고 개발자분들을 위한 방법이에요! 💻

### 필요한 것들

- Git - https://git-scm.com/downloads
- Node.js - https://nodejs.org/en/download/
- npm - (대부분의 시스템에서 node와 함께 제공돼요)
- pnpm - `npm install -g pnpm`

### 단계들

#### 1. BetterDiscord 저장소 복제하기
```bash
git clone --single-branch -b main https://github.com/BetterDiscord/BetterDiscord.git
```
지역 차단이나 비슷한 이유로 실패한다면, https://github.com/BetterDiscord/BetterDiscord/archive/refs/heads/main.zip 에서 압축 파일을 직접 다운로드할 수도 있어요! 😊

#### 2. 디렉토리로 이동하기
```bash
cd BetterDiscord
```

#### 3. 의존성 설치하기
아직 설치하지 않았다면 먼저 `pnpm`을 설치해요
```bash
npm install -g pnpm
```

그 다음 BetterDiscord의 의존성들을 설치해요
```bash
pnpm install
```

#### 4. BetterDiscord 빌드하기

이렇게 하면 `dist/` 폴더에 `injector.js`, `preload.js`, `renderer.js` 파일들이 생성돼요! ✨
```bash
pnpm build
```

#### 5. Discord에 설치하기

::: code-group
```bash [Stable]
pnpm inject
```

```bash [Canary]
pnpm inject canary
```

```bash [PTB]
pnpm inject ptb
```
:::
