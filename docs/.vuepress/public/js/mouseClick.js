/**
 * @Description:
 * @Version: 1.0
 * @Author: 琴时
 * @Date: 2023-05-08 10:00:53
 * @LastEditors: 琴时
 * @LastEditTime: 2023-05-08 10:01:01
 */
let index = 0
const getRandomColor = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
jQuery(document).ready(function ($) {
  $('body').click(function (e) {
    const arr = new Array(
      '❤富强❤',
      '❤民主❤',
      '❤文明❤',
      '❤和谐❤',
      '❤自由❤',
      '❤平等❤',
      '❤公正❤',
      '❤法治❤',
      '❤爱国❤',
      '❤敬业❤',
      '❤诚信❤',
      '❤友善❤'
    )
    let $w = $('<span/>').text(arr[index])
    index = (index + 1) % arr.length
    let x = e.pageX,
      y = e.pageY
    $w.css({
      'z-index': 999999999999999999999999999999999999999999999999999999999999999999999,
      top: y - 20,
      left: x,
      position: 'absolute',
      'font-weight': 'bold',
      color: `rgba(${getRandomColor(255, 0)},${getRandomColor(
        255,
        0
      )},${getRandomColor(255, 0)})`,
      'user-select': 'none',
      cursor: 'default',
    })
    $('body').append($w)
    $w.animate(
      {
        top: y - 180,
        opacity: 0,
      },
      1500,
      function () {
        $w.remove()
      }
    )
  })
})
