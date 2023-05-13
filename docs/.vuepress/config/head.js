/**
 * @Description: 头部文件配置
 * @Version: 1.0
 * @Author: 琴时
 */
module.exports = [
  ['link', { rel: 'icon', href: '/img/favicon.ico' }],
  [
    'meta',
    { name: 'keywords', content: 'KimShift空间,vuepress,自建博客,琴时' },
  ],
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
  ['link', { rel: 'stylesheet', href: '/css/style.css' }], //显示nav小logo
  // ['script', { charset: 'utf-8', src: '/js/custom.js' }], //加载右侧菜单栏广告图片
  // 百度统计
  [
    'script',
    {},
    `
      var _hmt = _hmt || [];
      (function() {
        if (hostname === '127.0.0.1' || hostname === 'localhost' || port === '8080') {
          // 开发环境不执行百度统计
          return
        }
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?b7ef24aef41bd3fa4670947b1d7a6e18";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
    `,
  ],
  [
    'meta',
    {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1,user-scalable=no',
    },
  ],
  ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
  ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  [
    'link',
    {
      rel: 'apple-touch-icon',
      href: 'https://infinitypro-img.infinitynewtab.com/custom-icon/8001de1jd3n68lbfnxxt564xvb0vl5.png?imageMogr2/thumbnail/240x/format/webp/blur/1x0/quality/100|imageslim',
    },
  ],
  [
    'script',
    {
      language: 'javascript',
      type: 'text/javascript',
      src: 'https://cdn.staticfile.org/jquery/1.7.2/jquery.min.js',
    },
  ],
  // ['script', { src: '/js/baidu.js' }, ``], //引入百度统计
  ['script', { src: '/js/mouseClick.js' }, ``], //鼠标点击特效
]
