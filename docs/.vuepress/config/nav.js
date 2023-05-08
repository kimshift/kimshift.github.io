module.exports = [
  { text: '主页', link: '/', icon: 'reco-home' },
  {
    text: '技术文章',
    icon: 'reco-api',
    items: [
      {
        text: 'Java',
        items: [{ text: 'JavaEE', link: '/views/technique/java/javaee' }],
      },
      {
        text: '前端',
        items: [{ text: '前端基础', link: '/views/technique/html/html01' }],
      },
    ],
  },
  {
    text: '生活分享',
    icon: 'reco-faq',
    items: [{ text: '生活分享', link: '/views/life/' }],
  },
  { text: '留言板', link: '/about/msgBoard', icon: 'iconfont reco-suggestion' },
  { text: '时间轴', link: '/timeline/', icon: 'reco-date' },
  {
    text: '关于',
    icon: 'reco-message',
    items: [
      {
        text: '关于我',
        link: '/about/me',
        icon: 'reco-account',
      },
      {
        text: 'B站',
        link: 'https://space.bilibili.com/409588368',
        icon: 'reco-bilibili',
      },
      {
        text: '博客园',
        link: 'https://www.cnblogs.com/zhif97/',
        icon: 'reco-document',
      },
      {
        text: 'Gitee',
        link: 'https://gitee.com/piante',
        icon: 'reco-mayun',
      },
    ],
  },
]
