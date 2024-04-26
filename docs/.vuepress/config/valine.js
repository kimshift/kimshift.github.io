/**
 * @Description: 评论配置
 * @Version: 1.0
 * @Author: 琴时
 */
/* 建议自己去官网生成一个方便管理 */
/* {appId,appKey}获取方式可看官网文档: https://valine.js.org/ */
const appId = 'RYGIQjB8yc993bparbVds98w-gzGzoHsz'
const appKey = 'Wvz8zlU8DvwjNBjkkARRMeWF'
const IS_OPEN = process.env.VALINE_ENV === 'true' //是否开启评论功能
const config = {
  appId: appId,
  appKey: appKey,
  placeholder: '填写邮箱可以及时收到回复噢...',
  // notify: true, // 邮件提醒
  verify: false, // 验证码
  recordIP: true, //记录ip
  visitor: true, //统计文章访问量
}
module.exports = IS_OPEN ? config : undefined
