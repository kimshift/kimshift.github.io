// https://vitepress.dev/reference/default-theme-config
import { getThemeConfig } from '../src/utils/node/config'
// import workConfig from './works'
export default {
  logo: '/favicon.ico',
  nav: [
    { text: '首页', link: '/' },
    { text: '例子', link: '/docs/markdown-examples' },
  ], //导航栏
  sidebar: [
    // {
    //   text: '例子',
    //   items: [
    //     { text: 'Markdown', link: '/docs/markdown-examples' },
    //     { text: 'Runtime', link: '/docs/api-examples' },
    //   ],
    // },
  ], //侧边栏
  editLink: {
    pattern: 'https://github.com/kimshift/<repo>/tree/master/packages/theme/docs/:path',
    text: '去 GitHub 上编辑内容',
  },
  socialLinks: [{ icon: 'github', link: 'https://github.com/kimshift' }],
  lastUpdatedText: '上次更新于',
  returnToTopLabel: '回到顶部',
  sidebarMenuLabel: '相关推荐',
}

export const blogTheme = getThemeConfig({
  imageStyle: {
    coverPreview: [
      // 七牛云
      {
        rule: '//img.cdn.sugarat.top',
        suffix: '~cover.webp',
      },
      // 又拍云CDN
      {
        rule: '//cdn.upyun.sugarat.top',
        suffix: '-cover',
      },
    ],
  },
  oml2d: {
    mobileDisplay: true,
    models: [
      {
        path: 'https://sugarat.s3.bitiful.net/npm/oml2d-model/models/Senko_Normals/senko.model3.json',
      },
    ],
    libraryUrls: {
      complete: 'https://sugarat.s3.bitiful.net/npm/oh-my-live2d/latest/lib/complete.js',
      cubism2: 'https://sugarat.s3.bitiful.net/npm/oh-my-live2d/latest/lib/cubism2.js',
      cubism5: 'https://sugarat.s3.bitiful.net/npm/oh-my-live2d/latest/lib/cubism5.js',
    },
  },
  authorList: [
    {
      nickname: '粥里有勺糖',
      url: 'https://sugarat.top/aboutme.html',
      des: '你的指尖,拥有改变世界的力量',
    },
  ],
  recommend: {
    nextText: '下一页',
    sort(a, b) {
      return +new Date(b.meta.date) - +new Date(a.meta.date)
    },
  },
  friend: [
    {
      nickname: '粥里有勺糖',
      des: '你的指尖,拥有改变世界的力量',
      avatar: 'https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTE2NzAzMA==674995167030',
      url: 'https://sugarat.top',
    },
    {
      nickname: 'Vitepress',
      des: 'Vite & Vue Powered Static Site Generator',
      avatar: 'https://vitepress.dev/vitepress-logo-large.webp',
      url: 'https://vitepress.dev/',
    },
  ],
  // 文章默认作者
  author: '粥里有勺糖',
  // 评论
  comment: {
    type: 'giscus',
    options: {
      repo: 'ATQQ/sugar-blog',
      repoId: 'MDEwOlJlcG9zaXRvcnkyNDEyNDUyOTk',
      category: 'Announcements',
      categoryId: 'DIC_kwDODmEcc84COVc6',
      inputPosition: 'top',
    },
  },
  buttonAfterArticle: {
    openTitle: '投"币"支持',
    closeTitle: '下次一定',
    content: '<img src="https://img.cdn.sugarat.top/mdImg/MTY0Nzc1NTYyOTE5Mw==647755629193">',
    icon: 'wechatPay',
  },
  popover: {
    title: '公告',
    body: [
      { type: 'text', content: '👇公众号👇---👇 微信 👇' },
      {
        type: 'image',
        src: 'https://img.cdn.sugarat.top/mdImg/MTYxNTAxODc2NTIxMA==615018765210~fmt.webp',
      },
      {
        type: 'text',
        content: '欢迎大家加群&私信交流',
      },
      {
        type: 'text',
        content: '文章首/文尾有群二维码',
        style: 'padding-top:0',
      },
      {
        type: 'button',
        content: '作者博客',
        link: 'https://sugarat.top',
      },
      {
        type: 'button',
        content: '加群交流',
        props: {
          type: 'success',
        },
        link: '/group.html',
      },
    ],
    duration: 0,
  },
  // works: workConfig,
  footer: {
    copyright: 'MIT License | 粥里有勺糖',
  },
})
