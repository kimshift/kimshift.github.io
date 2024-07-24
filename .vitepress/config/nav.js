/*******
 * @description: 导航栏配置
 * @author: 琴时
 */
export default [
  { text: '<i class="iconfont kt-home-filling"> 首页</i>', link: '/' },
  {
    text: '<i class="iconfont kt-menu"> 例子</i>',
    items: [
      { text: 'API 示例', link: '/examples/api' },
      { text: 'Markdown 扩展', link: '/examples/markdown' },
    ],
  },
  { text: '<i class="iconfont kt-clock-filling"> 时间线</i>', link: '/timeline' },
  { text: '<i class="iconfont kt-comment-filling"> 关于作者</i>', link: '/about/' },
]
