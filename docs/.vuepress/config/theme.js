/**
 * @Description:主题配置
 * @Version: 1.0
 * @Author: 琴时
 */
const valineConf = require('./valine')
const navConf = require('./nav')
module.exports = {
  type: 'blog',
  // 博客设置
  /*    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: '分类', // 默认 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: '标签', // 默认 “标签”
      },
    }, */
  authorAvatar: '/avatar.png',
  // 最后更新时间
  lastUpdated: '上次更新', // string | boolean
  // 可选，默认为 master
  //docsBranch: 'source',
  //editLinks: true,
  //editLinkText: '在 GitHub 上编辑此页！',
  // 作者
  author: '琴时',
  // 项目开始时间
  startYear: '2021',
  nav: navConf, //导航栏
  valineConfig: valineConf, //评论
  // 自动形成侧边导航
  sidebar: 'auto',
  sidebarDepth: 3,
  logo: '/img/favicon.ico',
  // 搜索设置
  search: true,
  searchMaxSuggestions: 10,
  record: '粤ICP备2021069222号', // 备案号
  recordLink: 'https://beian.miit.gov.cn', //备案号对应跳转链接
  //友链
  friendLink: [
    {
      title: 'KimShift空间',
      logo: 'http://www.file.kim-shift.cn/assets/image/tx.jpg',
      desc: 'Enjoy when you can, and endure when you must.',
      email: '710429093@qq.com',
      link: 'https://www.kim-shift.cn',
    },
    {
      title: '运动助手',
      desc: '日行一万步，吃动两平衡，健康一辈子。',
      logo: 'http://www.file.kim-shift.cn/assets/image/sports.png',
      link: 'http://www.brushstep.kim-shift.cn',
    },
  ],
}
