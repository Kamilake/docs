---
order: 4
description: 애드온의 요구사항과 형식을 알아보아요!
---

# 애드온 시스템 📦

## 기본 사항

- 현재 플러그인과 테마, 두 가지 타입의 애드온만 지원해요.
- 배포되는 애드온은 단일 파일로 제한되어 있어요.
- 배포 파일은 `<이름>.<타입>.<확장자>` 형태로 명명되어야 해요. 여기서 이름은 애드온 이름, 타입은 애드온 타입, 확장자는 표준 파일 확장자예요.
- 애드온 파일은 메타(meta)와 본문(body), 두 개의 주요 섹션으로 나뉘어져 있어요.
- 메타 섹션(아래에서 더 자세히 설명)은 BetterDiscord를 위한 애드온의 중요한 정보를 담고 있고, 본문 섹션은 개발자 콘텐츠의 주요 부분이랍니다.
- 애드온은 사용자 시스템의 파일에 맞춰 동적으로 추가, 제거, 업데이트되어요.

## 세부 정보

### 메타 정보 📋

애드온의 메타는 이름에서 알 수 있듯이 애드온에 대한 메타데이터를 포함하고 있어요. 이 메타의 형식은 파일의 *맨 처음*에 있는 JSDoc 스타일 주석이에요. 파일 처음에 이것이 없으면 BetterDiscord가 애드온을 로드하지 못할 수 있어요! 최소한의 메타 헤더는 다음과 같아요:

```js
/**
 * @name ExampleAddon
 * @author YourName
 * @description 기본 정보를 설명해주세요. 지원 서버 링크도 좋아요!
 * @version 0.0.1
 */
```

그리고 모든 필드를 다 채운 완전한 메타는 다음과 같답니다:
```js
/**
 * @name ExampleAddon
 * @author YourName
 * @description 기본 정보를 설명해주세요. 지원 서버 링크도 좋아요!
 * @version 0.0.1
 * @invite inviteCode
 * @authorId 51512151151651
 * @authorLink https://twitter.com/Whoever
 * @donate https://paypal.me/
 * @patreon https://patreon.com/
 * @website https://github.com/BetterDiscord/BetterDiscord
 * @source https://gist.github.com/rauenzi/e5f4d02fc3085a53872b0236cd6f8225
 */
 ```

각 필드에 대한 자세한 설명은 아래 표를 확인해주세요!


|필드|필수|설명|
|-----|:------:|-----------|
|name|✅|애드온의 이름이에요. 보통 공백을 포함하지 않지만 허용되긴 해요.|
|author|✅|개발자인 여러분의 이름이에요.|
|description|✅|애드온이 무엇을 하는지에 대한 기본적인 설명이에요.|
|version|✅|현재 업데이트 수준을 나타내는 버전이에요. [시맨틱 버전 관리](https://semver.org/)를 권장해요.|
|invite|❌|Discord 초대 코드예요. 사용자를 지원 서버로 안내하는 데 유용해요.|
|authorId|❌|개발자의 Discord 스노우플레이크 ID예요. 사용자가 연락할 수 있게 해줘요.|
|authorLink|❌|애드온 페이지에서 작성자 이름에 사용할 링크예요.|
|donate|❌|개발자에게 기부할 수 있는 링크예요.|
|patreon|❌|개발자의 Patreon 링크예요.|
|website|❌|개발자 (또는 애드온)의 웹사이트 링크예요.|
|source|❌|애드온의 GitHub 소스 링크예요.|

### 본문 🖊️

이 부분은 타입에 따라 달라지는 애드온의 핵심 부분이에요! 이 섹션에 대한 더 자세한 정보는 플러그인과 테마 개발을 위한 각각의 가이드를 확인해주세요.