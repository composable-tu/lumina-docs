import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    head: [['link', {rel: 'icon', href: '/assets/Icon.ico'}]],
    title: "LuminaPJ Docs",
    description: "在流光中闭环",
    themeConfig: {
        logo: '/assets/Icon.png', // https://vitepress.dev/reference/default-theme-config
        nav: [{text: '首页', link: '/'}, {text: '使用指南', link: '/usage/overview', activeMatch: '/usage/'}, {
            text: '部署指导', link: '/deploy/prepare', activeMatch: '/deploy/'
        }, {text: '开发指导', link: '/develop/quick-start', activeMatch: '/develop/'}],
        sidebar: {
            '/usage/': [{
                text: '基础',
                items: [{text: '概述', link: '/usage/overview'}, {text: '快速开始', link: '/usage/quick-start'},]
            }, {text: '管理端', items: [{text: '快速开始', link: '/usage/admin-quick-start'},]}],
            '/deploy/': [{text: '基础', items: [{text: '准备工作', link: '/deploy/prepare'}]}, {
                text: '服务端部署', items: [{text: '部署', link: '/deploy/server-deploy'},{text: 'SM2 密钥对生成器使用指导',  link: '/deploy/sm2-key-gen-guide'}]
            }, {
                text: '微信小程序部署', items: [{text: '部署', link: '/deploy/weixin-mp-deploy'},]
            }, {text: '管理端部署', items: [{text: '部署', link: '/deploy/admin-deploy'},]},],
            '/develop/': [{
                text: '开发指导', items: [{text: '快速开始', link: '/develop/quick-start'},]
            }, {
                text: 'Ktor 后端开发', items: [{text: 'Kotlin 入门指导', link: '/develop/kotlin-quick-start'}, {text: '快速开始', link: '/develop/ktor-quick-start'}],
            }, {
                text: '微信小程序用户端开发', items: [{text: '快速开始', link: '/develop/weixin-mp-quick-start'}, {
                    text: '服务端 API 参考', link: '/develop/api-reference'
                }]
            }, {text: 'Next.js 管理端开发', items: [{text: '快速开始', link: '/develop/nextjs-quick-start'},]}]
        },
        socialLinks: [{icon: 'github', link: 'https://github.com/LuminaPJ'}],
        footer: {
            message: '<a href="https://beian.mps.gov.cn/#/query/webSearch">ICP 备案占位符</a>',
            copyright: 'Copyright © 2025 LuminaPJ'
        },
        editLink: {
            pattern: 'https://github.com/LuminaPJ/lumina-docs/edit/main/docs/:path', text: '为此文档提交贡献'
        },
        lastUpdated: {text: '上次更新', formatOptions: {dateStyle: 'full', timeStyle: 'medium'}},
        search: {
            provider: 'local', options: {
                translations: {
                    button: {buttonText: '搜索', buttonAriaLabel: '搜索'}, modal: {
                        noResultsText: '找不到相关结果',
                        resetButtonTitle: '清除搜索词',
                        displayDetails: '显示详情',
                        footer: {selectText: '选择', navigateText: '切换', closeText: '关闭'}
                    }
                }
            }
        },
        docFooter: {prev: '上一页', next: '下一页'},
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '浅色模式',
        darkModeSwitchTitle: '深色模式',
        returnToTopLabel: '返回顶部',
        sidebarMenuLabel: '导航',
        externalLinkIcon: true,
        outline: {label: '文章目录', level: [2, 3]}
    },
    markdown: {
        container: {
            tipLabel: '提示', warningLabel: '注意', dangerLabel: '危险', infoLabel: '注释', detailsLabel: '展开详情'
        }, image: {lazyLoading: true}
    }
})
