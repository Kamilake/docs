---
order: 2
description: BetterDiscord를 여러분 취향에 맞게 꾸며보세요! ✨
---

# 설정 가이드

BetterDiscord에는 여러분의 경험을 취향에 맞게 조정할 수 있는 다양한 설정과 옵션들이 있어요! 이 페이지에서는 각 옵션이 무엇을 하는지 자세히 설명해 드릴게요 😊

## 일반 설정

BetterDiscord의 전체 모듈들을 제어하는 설정들이에요!

### 음성 연결 해제(Voice Disconnect)

이 옵션을 활성화하면 Discord를 닫을 때 음성 통화에서 자동으로 연결이 해제돼요. 기본적으로 Discord는 자동으로 다시 연결하려고 시도하는데, 이게 짜증날 수 있거든요! 😅

### 토스트 알림 표시(Show Toasts)

이 옵션을 켜면 BetterDiscord가 클라이언트에서 무슨 일이 일어나고 있는지 작은 알림들로 보여줘요! 🍞

### 미디어 키 비활성화(Disable Media Keys)

이 옵션은 Discord의 내장 플레이어가 키보드의 미디어 키들을 독점하는 걸 방지해서, 다른 애플리케이션에서도 사용할 수 있게 해줘요! 🎵



## 애드온 관리자(Addon Manager)

BetterDiscord가 애드온들을 어떻게 처리할지에 관한 설정들이에요.

### 애드온 오류 표시(Show Addon Errors)

이 옵션을 켜면 BetterDiscord가 시작할 때 발견된 오류들을 보여줘요. 어떤 이유로든 오류를 예상하고 있다면, 이걸 끄는 게 유용할 수 있어요! 🚨

### 편집 동작(Edit Action)

이 옵션은 애드온에서 편집 버튼을 클릭했을 때 무슨 일이 일어날지 결정해요! ✏️



## 커스텀 CSS

### 커스텀 CSS

이 옵션을 사용하면 커스텀 CSS 시스템을 완전히 비활성화할 수 있어요. 사용하지 않는다면 이걸 끄면 RAM과 CPU 파워를 약간 절약할 수 있답니다! 💨

### 실시간 업데이트(Live Update)

이 옵션을 켜면 CSS 에디터가 버튼을 클릭하기를 기다리지 않고 타이핑하는 대로 바로바로 업데이트돼요! ⚡

### 에디터 위치(Editor Location)

이 옵션은 커스텀 CSS를 편집할 때 어떤 에디터가 열릴지 결정해요! 🖥️


## 에디터 환경설정(Editor Preferences)

BetterDiscord 내에서 사용되는 모든 에디터들에 영향을 주는 설정들이에요.

### 줄 번호(Line Numbers)

이 옵션은 단순히 줄 번호를 보여줄지 말지를 결정해요! 📝

### 미니맵(Minimap)

이 옵션은 오른쪽에 코드를 나타내는 미니맵을 숨길지 보여줄지 결정해요! 🗺️

### 참조 툴팁(Reference Tooltips)

이 옵션을 켜면 코드의 특정 부분에 마우스를 올렸을 때 툴팁을 보여줘요. CSS의 경우 선택자 정보를, JavaScript의 경우 변수 정보를 보여준답니다! 💡

### 빠른 제안(Quick Suggestions)

이 옵션을 활성화하면 에디터가 타이핑하는 동안 제안과 자동완성을 보여줘요! 🚀

### 폰트 크기(Font Size)

이 옵션은 에디터에서 사용할 기본 폰트 크기를 결정해요! 📏

### 공백 표시(Show Whitespace)

이 옵션은 스페이스나 개행 문자 같은 공백 문자들에 대해 언제 시각적 표시기를 보여줄지 결정해요! 👀



## 윈도우 환경설정(Window Preferences)

Discord 메인 윈도우와 관련된 설정들이에요!

### 투명도 활성화(Enable Transparency)

이 옵션은 Electron의 투명도 모드를 활성화해요! 자체적으로는 별로 하는 일이 없지만, 루트 요소의 불투명도를 변경하는 테마가 있다면 실제로 Discord 클라이언트를 통해 데스크탑까지 볼 수 있어요! 😮 Windows에서는 이 기능을 켜면 에어로 스냅과 다른 일반적인 윈도우 기능들이 작동하지 않아요. 이건 Electron 자체의 한계이고 BetterDiscord가 고칠 수 있는 문제가 아니에요.

### 최소 크기 제거(Remove Minimum Size)

이 옵션은 Discord의 강제 최소 윈도우 크기를 없애줘요! 많은 사용자들에게는 이 제한이 너무 커서 화면을 커스터마이징하기 어려워요 📏



## 개발자(Developer)

주로 개발자들을 위한 설정들이에요. 일부 파워 유저들도 관심을 가질 수 있어요! 🤓

### 디버그 로그(Debug Logs)

이 옵션을 켜면 BetterDiscord가 크로미움 콘솔의 모든 내용을 BetterDiscord 폴더의 `debug.log` 파일로 출력해요. 항상 켜두지 말고 충돌 문제를 디버깅할 때만 사용하는 게 좋아요! 📊

### 개발자 도구(DevTools)

이 옵션을 켜면 평소처럼 `ctrl`+`shift`+`i` 조합으로 크로미움 개발자 도구를 열 수 있어요! 개발자가 아니라면 끄고 두는 게 좋아요 🔧

### 디버거 단축키(Debugger Hotkey)

이 옵션은 `F8`에 키바인드를 추가해서 DevTools가 열려있을 때만 `debugger`를 활성화할 수 있게 해줘요! 🔍

### React 개발자 도구(React Developer Tools)

이 옵션을 사용하면 Discord에 RDT를 추가할 수 있어요! 현재는 RDT 확장이 설치된 로컬 Chrome 설치가 필요해요. 그러면 BetterDiscord가 그 로컬 RDT 설치를 가리키게 됩니다. 앞으로 바뀔 수도 있어요! ⚛️

### 요소 검사 단축키(Inspect Element Hotkey)

이 옵션은 새로운 키바인드 `ctrl`+`shift`+`c`를 추가해서 DevTools를 열고 요소 선택을 시작해요! DevTools가 이미 열려있다면 즉시 요소 선택 동작을 활성화해요 🎯

### DevTools 경고 중지(Stop DevTools Warning)

이 옵션은 Discord가 콘솔에 출력하는 그 큰 경고문들을 중지시켜요! 🚫
