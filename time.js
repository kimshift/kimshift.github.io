const dateFormat = (params, format = 'YYYY-MM-DD hh:mm:ss') => {
  //如果params是时间字符串：2021-05-20 00:00:00 为了兼容ios需要将其转换成 2021/05/20 00:00:00
  const pattern = /^(?=.*T)(?=.*).*$/
  const patternNum = /^\d*$/
  if (!params) {
    params = new Date()
  } else if (patternNum.test(params)) {
    params = parseInt(params)
  } else if (typeof params === 'string' && !pattern.test(params)) {
    params = `${params}`.replace(/-/g, '/')
  }
  /* 处理格式化时间 */
  const dt = new Date(params) //创建时间对象
  const yy = dt.getFullYear() //年
  const qt = Math.floor((dt.getMonth() + 3) / 3) //季度
  const mm = (dt.getMonth() + 1 + '').padStart(2, '0') //月(padStart:字符串不满2位数,开头补全'0')
  const dd = (dt.getDate() + '').padStart(2, '0') //日
  const wk = '星期' + '日一二三四五六'.charAt(dt.getDay()) //星期
  const hh = (dt.getHours() + '').padStart(2, '0') //时
  const mi = (dt.getMinutes() + '').padStart(2, '0') //分
  const ss = (dt.getSeconds() + '').padStart(2, '0') //秒
  const ms = dt.getMilliseconds() //毫秒
  const timeObj = {
    date1: `${yy}-${mm}-${dd} ${hh}:${mi}:${ss} ${qt}${wk}`, //年-月-日 时:分:秒 季度星期
    date2: `${yy}-${mm}-${dd} ${hh}:${mi}:${ss} ${qt}`, //年-月-日 时:分:秒 季度
    date3: `${yy}-${mm}-${dd} ${hh}:${mi}:${ss} ${wk}`, //年-月-日 时:分:秒 星期
    date4: `${yy}-${mm}-${dd} ${hh}:${mi}:${ss}`, //年-月-日 时:分:秒
    date5: `${yy}-${mm}-${dd}`, //年-月-日
    date6: `${yy}-${mm}`, //年-月
    date7: `${mm}-${dd}`, //月-日
    date8: `${hh}:${mi}:${ss}`, //时:分:秒
    date9: `${yy}`, //年
    date10: `${mm}`, //月
    date11: `${dd}`, //日
    date12: `${hh}`, //时
    date13: `${mm}`, //分
    date14: `${ss}`, //秒
    date15: `${qt}`, //季度
    date16: `${wk}`, //星期
    date17: `${yy}${mm}${dd}${hh}${mi}${ss}`, //时间串
  }
  /* 检测时间格式的标识 */
  const list = [
    /^YYYY\-MM\-DD hh\:mm\:ss qtwk$/, //年-月-日 时:分:秒 季度星期
    /^YYYY\-MM\-DD hh\:mm\:ss qt$/, //年-月-日 时:分:秒 季度
    /^YYYY\-MM\-DD hh\:mm\:ss wk$/, //年-月-日 时:分:秒 星期
    /^YYYY\-MM\-DD hh\:mm\:ss$/, //年-月-日 时:分:秒
    /^YYYY\-MM\-DD$/, //年-月-日
    /^YYYY\-MM$/, //年-月
    /^MM\-DD$/, //月-日
    /^hh\:mm\:ss$/, //时:分:秒
    /^YYYY$/, //年
    /^MM$/, //月
    /^DD$/, //日
    /^hh$/, //时
    /^mm$/, //分
    /^ss$/, //秒
    /^qt$/, //季度
    /^ss$/, //星期
    /^YYYYMMDDhhmmss$/, //时间串
  ]
  let newDate = ''
  const news = list.some((item, index) => {
    if (item.test(format)) {
      newDate = timeObj[`date${index + 1}`]
      return true
    }
    return false
  })
  if (!news) newDate = `${yy}-${mm}-${dd} ${hh}:${mi}:${ss}` //如果传过来的格式化标识符异常则默认返回:年-月-日 时:分:秒
  return newDate
}
console.log('当前时间:', dateFormat())
