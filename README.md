<div align="center">

[build-badge]: https://img.shields.io/github/actions/workflow/status/BetterDiscord/docs/build-and-deploy.yml?branch=main&logo=Github&logoColor=3a71c1&labelColor=0c0d10&color=3a71c1&style=for-the-badge
[build-link]: https://github.com/BetterDiscord/docs/actions/workflows/build-and-deploy.yml

[downloads-badge]: https://img.shields.io/github/downloads/BetterDiscord/Installer/total?labelColor=0c0d10&color=3a71c1&style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjI1IDM4LjVIMzUuNzVDMzYuNzE2NSAzOC41IDM3LjUgMzkuMjgzNSAzNy41IDQwLjI1QzM3LjUgNDEuMTY4MiAzNi43OTI5IDQxLjkyMTIgMzUuODkzNSA0MS45OTQyTDM1Ljc1IDQySDEyLjI1QzExLjI4MzUgNDIgMTAuNSA0MS4yMTY1IDEwLjUgNDAuMjVDMTAuNSAzOS4zMzE4IDExLjIwNzEgMzguNTc4OCAxMi4xMDY1IDM4LjUwNThMMTIuMjUgMzguNUgzNS43NUgxMi4yNVpNMjMuNjA2NSA2LjI1NThMMjMuNzUgNi4yNUMyNC42NjgyIDYuMjUgMjUuNDIxMiA2Ljk1NzExIDI1LjQ5NDIgNy44NTY0N0wyNS41IDhWMjkuMzMzTDMwLjI5MzEgMjQuNTQwN0MzMC45NzY1IDIzLjg1NzMgMzIuMDg0NiAyMy44NTczIDMyLjc2OCAyNC41NDA3QzMzLjQ1MTQgMjUuMjI0MiAzMy40NTE0IDI2LjMzMjIgMzIuNzY4IDI3LjAxNTZMMjQuOTg5OCAzNC43OTM4QzI0LjMwNjQgMzUuNDc3MiAyMy4xOTg0IDM1LjQ3NzIgMjIuNTE1IDM0Ljc5MzhMMTQuNzM2OCAyNy4wMTU2QzE0LjA1MzQgMjYuMzMyMiAxNC4wNTM0IDI1LjIyNDIgMTQuNzM2OCAyNC41NDA3QzE1LjQyMDIgMjMuODU3MyAxNi41MjgyIDIzLjg1NzMgMTcuMjExNyAyNC41NDA3TDIyIDI5LjMyOVY4QzIyIDcuMDgxODMgMjIuNzA3MSA2LjMyODgxIDIzLjYwNjUgNi4yNTU4TDIzLjc1IDYuMjVMMjMuNjA2NSA2LjI1NThaIiBmaWxsPSIjM2E3MWMxIi8+Cjwvc3ZnPgo=
[downloads-link]: #auto-installers

[discord-badge]: https://img.shields.io/badge/discord-green?labelColor=0c0d10&color=7289da&style=for-the-badge&logo=discord&logoColor=7289da
[discord-link]: https://discord.gg/bnSUxedypU

[website-badge]: https://img.shields.io/badge/website-green?labelColor=0c0d10&color=3a71c1&style=for-the-badge&logo=firefoxbrowser&logoColor=3a71c1
[website-link]: https://betterdiscord.app

[docs-badge]: https://img.shields.io/badge/docs-green?labelColor=0c0d10&color=3a71c1&style=for-the-badge&logo=readthedocs&logoColor=3a71c1
[docs-link]: https://docs.betterdiscord.app


# BetterDiscord 문서 📚

[![CI Status][build-badge]][build-link] [![GitHub Releases][downloads-badge]][downloads-link] [![Discord][discord-badge]][discord-link] [![Website][website-badge]][website-link] [![Docs][docs-badge]][docs-link]

[![Theme Split](https://betterdiscord.app/resources/branding/serverbanner.png)](https://docs.betterdiscord.app/)

</div>


# 소개 🎯

이 문서 웹사이트는 [VitePress](https://vitepress.dev/)를 사용해서 만들어졌어요! VitePress는 문서를 위해 특별히 설계된 현대적인 정적 웹사이트 생성기랍니다. 문서 자체는 마크다운 형식으로 저장되어 있고, 가능한 한 적은 Vue 컴포넌트만 사용해서 일반 텍스트로도 읽기 쉽게 만들었어요. IDE에서 로컬로 보기에도 좋고, 웹사이트 대신 GitHub에서 문서를 읽고 싶은 분들에게도 편리할 거예요! 😊

# 문서 구조 🗂️

현재 마크다운 파일들의 문서 구조예요. 다양한 주제를 다루고 있고, 아래 각 항목마다 자세한 정보가 담긴 여러 하위 페이지들이 있답니다.

```
.
├──사용자 가이드              // 일반 사용자를 위한 기본 가이드
├──개발자 가이드              // 모든 개발자에게 유용한 일반적인 가이드 모음
|   ├──플러그인              // 플러그인 개발자를 위한 가이드와 정보
|   └──테마                 // BetterDiscord용 테마 제작을 위한 정보 가이드
└──API 레퍼런스             // 가이드가 아닌 API 참고 자료
    ├──BetterDiscord API   // BdApi에서 사용 가능한 모든 것들의 상세 레퍼런스
    └──Discord             // Discord 내부 구조에 대한 고급 정보 (변경될 수 있음)
```

BetterDiscord API 아래의 마크다운 페이지들(개요/인덱스 제외)은 BetterDiscord에서 JSDoc을 추출해서 마크다운으로 변환하는 스크립트 쌍을 통해 자동으로 생성됩니다. 정말 신기하죠! 🤖

# 프로젝트 구조 🏗️

```
.
├──.vitepress     // VitePress 설정과 커스터마이징을 위한 폴더
|  └──theme       // 기본 테마의 확장
├──docs           // 모든 마크다운 문서들
|   ├──public     // URL 루트에서 사용 가능한 정적 자원들
|   └──<기타>      // 위의 구조 참고
└──scripts        // API 레퍼런스 생성을 위한 헬퍼 스크립트들

```

# 기여자들 👥

이 프로젝트에 기여하고 싶으시다면 [CONTRIBUTING.md](/CONTRIBUTING.md)를 확인해보세요! 여러분의 참여를 기다리고 있어요! 🎉

[![Contributors][contributors-image]][contributors-link]

[contributors-image]: https://contrib.rocks/image?repo=betterdiscord/docs
[contributors-link]: https://github.com/betterdiscord/docs/graphs/contributors