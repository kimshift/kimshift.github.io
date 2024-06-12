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
  avatar: '/img/avatar.png', //首页头像
  avatarMode: 'card',
  author: 'kimshift', // 文章默认作者
  startYear: '2021', //项目开始时间
  custom: true, // 自定义主题配置
  darkTransition: true, // 黑白模式下切换文章时，是否使用动画效果
  homeTags: true, // 是否开启首页标签
  article: {
    readingTimePosition: '', //阅读时间位置
    readingTime: true, //是否显示阅读时间
    hiddenCover: false, //文章封面是否隐藏
  },
  hotArticle: {
    title: '精选文章',
    nextText: '换一组',
    pageSize: 5,
    empty: '暂无精选内容',
  },
  friend: {
    list: [
      {
        nickname: 'Vitepress',
        des: 'Vite & Vue Powered Static Site Generator',
        avatar: 'https://vitepress.dev/vitepress-logo-large.webp',
        url: 'https://vitepress.dev/',
      },
      {
        nickname: 'Vitepress2',
        des: 'Vite & Vue Powered Static Site Generator',
        avatar: 'https://vitepress.dev/vitepress-logo-large.webp',
        url: 'https://vitepress.dev/',
      },
      {
        nickname: 'Vitepress3',
        des: 'Vite & Vue Powered Static Site Generator',
        avatar: 'https://vitepress.dev/vitepress-logo-large.webp',
        url: 'https://vitepress.dev/',
      },
      {
        nickname: 'Vitepress4',
        des: 'Vite & Vue Powered Static Site Generator',
        avatar: 'https://vitepress.dev/vitepress-logo-large.webp',
        url: 'https://vitepress.dev/',
      },
      {
        nickname: 'Vitepress5',
        des: 'Vite & Vue Powered Static Site Generator',
        avatar: 'https://vitepress.dev/vitepress-logo-large.webp',
        url: 'https://vitepress.dev/',
      },
      {
        nickname: 'Vitepress6',
        des: 'Vite & Vue Powered Static Site Generator',
        avatar: 'https://vitepress.dev/vitepress-logo-large.webp',
        url: 'https://vitepress.dev/',
      },
    ],
    limit: 3, // 展示数量
    random: false, // 是否随机展示
    scrollSpeed: 2000, // 滚动速度
  },
  footer: {
    copyright: 'default',
    icpRecord: {
      name: '粤ICP备2021069222号',
      link: 'https://beian.miit.gov.cn',
    },
  },
}

// 主题配置参数
export const blogTheme = getThemeConfig({
  authorList: [
    {
      nickname: '粥里有勺糖',
      url: 'https://sugarat.top/aboutme.html',
      des: '你的指尖,拥有改变世界的力量',
    },
    {
      nickname: '粥里有勺糖',
      url: 'https://sugarat.top/aboutme.html',
      des: '你的指尖,拥有改变世界的力量',
    },
    {
      nickname: '粥里有勺糖',
      url: 'https://sugarat.top/aboutme.html',
      des: '你的指尖,拥有改变世界的力量',
    },
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
  author: '琴时', // 文章默认作者
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
})