//百度统计
var _hmt = _hmt || []
;(function () {
  console.log('测试location:', window.location)
  const { hostname, port } = window.location
  if (hostname === '127.0.0.1' || hostname === 'localhost' || port === '8080') {
    // 开发环境不执行百度统计
    return
  }
  var hm = document.createElement('script')
  hm.src = 'https://hm.baidu.com/hm.js?b7ef24aef41bd3fa4670947b1d7a6e18'
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(hm, s)
})()

//百度站长自动推送
// ;(function () {
//   var bp = document.createElement('script')
//   var curProtocol = window.location.protocol.split(':')[0]
//   if (curProtocol === 'https') {
//     bp.src = 'https://zz.bdstatic.com/linksubmit/push.js'
//   } else {
//     bp.src = 'http://push.zhanzhang.baidu.com/push.js'
//   }
//   var s = document.getElementsByTagName('script')[0]
//   s.parentNode.insertBefore(bp, s)
// })()

//360
// ;(function () {
//   var src = 'https://jspassport.ssl.qhimg.com/11.0.1.js?xxxx83acfaaf6e696dba'
//   document.write('<script src="' + src + '" id="sozz"></script>')
// })()
