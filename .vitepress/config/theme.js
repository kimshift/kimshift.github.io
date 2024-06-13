// https://vitepress.dev/reference/default-theme-config
import { getThemeConfig } from '../theme/utils/node/config'
export default {
  logo: '/favicon.ico',
  nav: [
    { text: '首页', link: '/' },
    { text: '例子', link: '/markdown-examples' },
  ], //导航栏
  // editLink: {
  //   pattern: 'https://github.com/kimshift/<repo>/tree/master/packages/theme/docs/:path',
  //   text: '去 GitHub 上编辑内容',
  // },
  socialLinks: [{ icon: 'github', link: 'https://github.com/kimshift' }],
  outline: [2, 3], //自动生成大纲
  lastUpdatedText: '上次更新于',
  returnToTopLabel: '回到顶部',
  sidebarMenuLabel: '相关推荐',
  author: 'kimshift', // 文章默认作者
  startYear: '2021', //项目开始时间
  custom: true, // 自定义主题配置
  darkTransition: true, // 黑白模式下切换文章时，是否使用动画效果
  article: {
    readingTimePosition: 'inline', //阅读时间位置
    readingTime: true, //是否显示阅读时间
    hiddenCover: false, //文章封面是否隐藏
    docMetaInsertSelector: 'h1', //文章标题标签
    docMetaInsertPosition: 'after', //文章标题插入位置
  }, // 文章详情配置
  hotArticle: {
    title: '精选文章',
    nextText: '换一组',
    pageSize: 5,
    empty: '暂无精选内容',
  }, //精选文章配置
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
  }, //友情链接配置
  footer: {
    copyright: 'default',
    icpRecord: {
      name: '粤ICP备2021069222号',
      link: 'https://beian.miit.gov.cn',
    },
  }, // 底部配置
  home: {
    title: '记事录',
    homeTags: true, // 是否开启首页标签
    avatar: '/img/avatar.png', //首页头像
    avatarMode: 'card',
    minScreenAvatar: false, // 移动端是否显示头像
    pageSize: 6, //首页文章展示数量
    inspiringTimeout: 3000, // 轮播文字切换时间
    inspiring: [
      '千万不要因为走得太久，而忘记了我们为什么出发',
      '人生就像一场修行，你不可能一开始就修成正果',
      '无论多么沉重的负担，也不要忘记微笑；无论多么漫长的路程，也不要忘记坚持',
      '生活的真谛不在繁华，而在于淡泊',
    ],
  }, // 首页配置
  backToTopConfig: {
    behavior: 'smooth', //'smooth'平滑滚动，'auto'瞬间滚动
    top: 300, //距离顶部多少距离时显示
  }, // 返回顶部配置
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
      nickname: 'kimshift',
      url: 'https://sugarat.top/aboutme.html',
      des: '你的指尖,拥有改变世界的力量',
    },
    {
      nickname: '琴时',
      url: 'https://sugarat.top/aboutme.html',
      des: '你的指尖,拥有改变世界的力量',
    },
  ], //转载作者列表
  buttonAfterArticle: {
    openTitle: '投"币"支持',
    closeTitle: '下次一定',
    content: '<img src="/img/wechat_pay.jpg">',
    icon: 'wechat',
  }, // 文章底部按钮
  recommend: {
    pageSize: 3, // 推荐文章展示数量
    nextText: '下一页',
    style: 'sidebar', // 推荐文章样式，可选值：'sidebar'|'card'
    sort(a, b) {
      return +new Date(b.meta.date) - +new Date(a.meta.date)
    },
  }, // 推荐文章样式
}

// 自定义主题配置参数
export const blogTheme = getThemeConfig({
  srcDir: './docs', //检索docs目录下的文档

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
})
