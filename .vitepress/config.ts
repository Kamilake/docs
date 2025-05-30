import {DefaultTheme, defineConfig, UserConfig} from "vitepress";
import {VitePressSidebarOptions, withSidebar} from "vitepress-sidebar";
import {bundledLanguages, LanguageRegistration} from "shiki";
import {groupIconMdPlugin, groupIconVitePlugin, localIconLoader} from "vitepress-plugin-group-icons";


const bdIcon = localIconLoader(import.meta.url, "../docs/public/branding/logo_small.svg");

const VITEPRESS_CONFIG: UserConfig<DefaultTheme.Config> = {
    srcDir: "./docs",
    title: "BetterDiscord",
    description: "BetterDiscord 애드온 사용 및 제작을 위한 사용자 & 개발자 문서입니다! 🎉",
    head: [
        ["meta", {property: "og:site_name", content: "BetterDiscord 문서"}],
        ["meta", {property: "og:title", content: "BetterDiscord 문서 & 가이드"}],
        ["meta", {property: "og:description", content: "BetterDiscord 애드온 사용 및 제작을 위한 사용자 & 개발자 문서입니다! 🎉"}],
        ["meta", {property: "og:image", content: "/branding/logo_solid.png"}],
        ["meta", {property: "og:image:alt", content: "BetterDiscord Logo"}],

        ["meta", {property: "twitter:card", content: "summary"}],
        ["meta", {property: "twitter:site", content: "BetterDiscord Logo"}],
        ["meta", {property: "twitter:title", content: "BetterDiscord Documentation & Guides"}],
        ["meta", {property: "twitter:description", content: "User and developer documentation for using and creating addons for BetterDiscord."}],
        ["meta", {property: "twitter:image", content: "/branding/logo_solid.png"}],
        ["meta", {property: "twitter:image:alt", content: "BetterDiscord Logo"}],

        ["meta", {name: "theme-color", content: "#3a71c1"}],
        ["meta", {name: "description", content: "BetterDiscord 애드온 사용 및 제작을 위한 사용자 & 개발자 문서입니다! 🎉"}],
        ["meta", {name: "keywords", content: "Discord, BetterDiscord, Better Discord, Discord Mod, Discord 테마, Discord 플러그인, Discord 확장, Discord 클라이언트 모드, Discord 핵, 문서, 가이드, 튜토리얼"}],
        ["meta", {name: "author", content: "BetterDiscord"}],

        ["link", {rel: "icon", href: "/favicon/favicon-96x96.png"}],
    ],
    cleanUrls: true,
    themeConfig: {
        siteTitle: false,
        logo: "/branding/logo_large.svg",
        nav: [
            {text: "홈", link: "/"},
            {text: "사용자 가이드", link: "/users/", activeMatch: "/users/"},
            {
                text: "개발자 가이드",
                items: [
                    {text: "일반", link: "/developers/", activeMatch: "/developers/"},
                    {text: "플러그인", link: "/plugins/", activeMatch: "/plugins/"},
                    {text: "테마", link: "/themes/", activeMatch: "/themes/"},
                ],
                activeMatch: "/(?:developers|plugins|themes)/"
            },
            {
                text: "레퍼런스",
                items: [
                    {text: "API", link: "/api/", activeMatch: "/api/"},
                    {text: "Discord", link: "/discord/", activeMatch: "/discord/"},
                ],
                activeMatch: "/(?:api|discord)/"
            },
        ],

        socialLinks: [
            {
                icon: {
                    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style="fill: none;" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`
                },
                link: "https://betterdiscord.app"
            },
            {icon: "discord", link: "https://betterdiscord.app/invite"},
            {icon: "twitter", link: "https://x.com/_BetterDiscord_"},
            {icon: "github", link: "https://github.com/BetterDiscord/BetterDiscord"}
        ],

        editLink: {
            pattern: "https://github.com/BetterDiscord/docs/edit/main/docs/:path",
            text: "GitHub에서 이 페이지 편집하기",
        },

        lastUpdated: {
            text: "업데이트됨",
            formatOptions: {
                dateStyle: "full",
                timeStyle: "medium"
            }
        },

        search: {
            provider: "algolia",
            options: {
                appId: "JI19E3KHGR",
                apiKey: "22fcfe9bbb67cc5b6ca5f34ed217e525",
                indexName: "betterdiscord"
            }
        },

        outline: "deep",
    },

    sitemap: {
        hostname: "https://docs.betterdiscord.app"
    },

    markdown: {
        codeTransformers: [
            {
                name: "highlight-bdapi",
                preprocess(code, options) {
                    function findAllSubstringIndexes(str: string, substr: string): number[] {
                        const indexes: number[] = [];
                        let i = -1;
                        while ((i = str.indexOf(substr, i + 1)) !== -1) indexes.push(i);
                        return indexes;
                    }

                    const words = ["BdApi"];
                    options.decorations ||= [];
                    for (const word of words) {
                    const indexes = findAllSubstringIndexes(code, word);
                    for (const index of indexes) {
                        options.decorations.push({
                            start: index,
                            end: index + word.length,
                            properties: {
                                "class": "global-bdapi",
                            },
                        });
                    }
                    }
                },
            }
        ],
        shikiSetup: async (shiki) => {
            const css = await bundledLanguages.css();
            const js = await bundledLanguages.js();

            const bdcss: LanguageRegistration = {
                ...css.default[0],
                patterns: [
                    {include: "#docblock"},
                    {include: "#jsdoctype"},
                    {include: "#inline-tags"},
                    {include: "#comment"},
                    ...css.default[0].patterns,
                ],
                repository: Object.assign({}, {
                    "brackets": js.default[0].repository.brackets,
                    "docblock": js.default[0].repository.docblock,
                    "comment": js.default[0].repository.comment,
                    "jsdoctype": js.default[0].repository.jsdoctype,
                    "inline-tags": js.default[0].repository["inline-tags"]
                }, css.default[0].repository),
            };

            await shiki.loadLanguage(bdcss);
        },
        theme: {dark: "dark-plus", light: "light-plus"},
        config: (md) => {
            md.use(groupIconMdPlugin);
        }
    },
    vite: {
        plugins: [
            groupIconVitePlugin({
                customIcon: {
                    ".babelrc": "vscode-icons:file-type-babel",
                    "js": "vscode-icons:file-type-js",
                    "jsx": "vscode-icons:file-type-js",
                    "json": "vscode-icons:file-type-json",
                    ".plugin.js": bdIcon,
                    ".theme.css": bdIcon,
                    // TODO: consider adding platform icons
                },
            })
        ]
    }
};


const SIDEBARS: VitePressSidebarOptions[] = [
    {
        documentRootPath: "docs",
        scanStartPath: "api",
        basePath: "/api/",
        resolvePath: "/api/",
        useTitleFromFileHeading: true,
        includeRootIndexFile: true,
        sortFolderTo: "bottom",
        sortMenusByFrontmatterOrder: true,
        frontmatterOrderDefaultValue: 1,
    },
    {
        rootGroupText: "Discord 내부 구조",
        documentRootPath: "docs",
        scanStartPath: "discord",
        basePath: "/discord/",
        resolvePath: "/discord/",
        useTitleFromFileHeading: true,
        includeRootIndexFile: true,
        sortFolderTo: "bottom",
        sortMenusByFrontmatterOrder: true,
        frontmatterOrderDefaultValue: 1,
        hyphenToSpace: true,
        capitalizeEachWords: true,
        useFolderLinkFromIndexFile: true,
        useFolderTitleFromIndexFile: true,
    },
    {
        documentRootPath: "docs",
        scanStartPath: "users",
        basePath: "/users/",
        resolvePath: "/users/",
        useTitleFromFileHeading: true,
        includeRootIndexFile: true,
        capitalizeEachWords: true,
        collapsed: false,
        sortFolderTo: "bottom",
        sortMenusByFrontmatterOrder: true,
        frontmatterOrderDefaultValue: 1,
        manualSortFileNameByPriority: ["getting-started", "guides"],
    },
    {
        documentRootPath: "docs",
        scanStartPath: "developers",
        basePath: "/developers/",
        resolvePath: "/developers/",
        useTitleFromFileHeading: true,
        includeRootIndexFile: true,
        sortFolderTo: "bottom",
        sortMenusByFrontmatterOrder: true,
        frontmatterOrderDefaultValue: 1,
    },
    {
        documentRootPath: "docs",
        scanStartPath: "plugins",
        basePath: "/plugins/",
        resolvePath: "/plugins/",
        useTitleFromFileHeading: true,
        includeRootIndexFile: true,
        capitalizeEachWords: true,
        collapsed: false,
        sortFolderTo: "bottom",
        sortMenusByFrontmatterOrder: true,
        frontmatterOrderDefaultValue: 1,
        manualSortFileNameByPriority: ["introduction", "basics", "intermediate", "advanced"],
    },
    {
        documentRootPath: "docs",
        scanStartPath: "themes",
        basePath: "/themes/",
        resolvePath: "/themes/",
        useTitleFromFileHeading: true,
        includeRootIndexFile: true,
        capitalizeEachWords: true,
        collapsed: false,
        sortFolderTo: "bottom",
        sortMenusByFrontmatterOrder: true,
        frontmatterOrderDefaultValue: 1,
        manualSortFileNameByPriority: ["introduction", "basics", "intermediate", "advanced"],
    }
];

export default defineConfig(withSidebar(VITEPRESS_CONFIG, SIDEBARS));