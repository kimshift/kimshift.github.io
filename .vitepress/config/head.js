import process from 'node:process'
const headConf = [
  ['link', { rel: 'icon', href: '/favicon.ico' }],
  [
    'link',
    {
      rel: 'apple-touch-icon',
      href: '/favicon.ico',
    },
  ],
  // HTTP 缓存标头
  ['meta', { 'http-equiv': 'Cache-Control', content: 'max-age=31536000, immutable' }],
  ['meta', { name: 'keywords', content: 'KimShift空间,vitepress,自建博客,琴时' }],
  [
    'meta',
    {
      name: 'description',
      content:
        '专属于自学者的在线学习平台,这里有编程领域最完善最「体系化的」，官方交流QQ群：437936639',
    },
  ],
  [
    'meta',
    {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1,user-scalable=no',
    },
  ],
  ['meta', { name: 'robots', content: 'all' }],
  ['meta', { name: 'author', content: '琴时' }],
  ['meta', { name: 'baidu-site-verification', content: 'codeva-TuWgWudEPI' }],
  ['script', { src: '/js/mouseClick.js' }, ``], //鼠标点击特效
]

if (process.env.NODE_ENV === 'production') {
  //引入百度统计和推送
  headConf.push(['script', { src: '/js/baidu.js' }, ``])
}
export default headConf
