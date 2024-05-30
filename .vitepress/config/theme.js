// https://vitepress.dev/reference/default-theme-config
import { getThemeConfig } from '../theme/utils/node/config'
export default {
  logo: '/favicon.ico',
  nav: [
    { text: '首页', link: '/' },
    { text: '例子', link: '/docs/markdown-examples' },
  ], //导航栏
  editLink: {
    pattern: 'https://github.com/kimshift/<repo>/tree/master/packages/theme/docs/:path',
    text: '去 GitHub 上编辑内容',
  },
  socialLinks: [{ icon: 'github', link: 'https://github.com/kimshift' }],
  lastUpdatedText: '上次更新于',
  returnToTopLabel: '回到顶部',
  sidebarMenuLabel: '相关推荐',
}

// 主题配置参数
export const blogTheme = getThemeConfig({
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
      nickname: 'Vitepress',
      des: 'Vite & Vue Powered Static Site Generator',
      avatar: 'https://vitepress.dev/vitepress-logo-large.webp',
      url: 'https://vitepress.dev/',
    },
  ],
  author: '琴时', // 文章默认作者
  startYear: '2021', //项目开始时间
  comment: {
    type: 'giscus',
    options: {
      repo: 'ATQQ/sugar-blog',
      repoId: 'MDEwOlJlcG9zaXRvcnkyNDEyNDUyOTk',
      category: 'Announcements',
      categoryId: 'DIC_kwDODmEcc84COVc6',
      inputPosition: 'top',
    },
  }, // 评论
  buttonAfterArticle: {
    openTitle: '投"币"支持',
    closeTitle: '下次一定',
    content: '<img src="https://img.cdn.sugarat.top/mdImg/MTY0Nzc1NTYyOTE5Mw==647755629193">',
    icon: 'wechatPay',
  },
  footer: {
    copyright: 'default',
    icpRecord: {
      name: '粤ICP备2021069222号',
      link: 'https://beian.miit.gov.cn',
    },
  },
})
