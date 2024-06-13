/*******
 * @description: 鼠标点击文字效果
 * @author: 琴时
 */
const list = [
  '❉富强❉',
  '❉民主❉',
  '❉文明❉',
  '❉和谐❉',
  '❉自由❉',
  '❉平等❉',
  '❉公正❉',
  '❉法治❉',
  '❉爱国❉',
  '❉敬业❉',
  '❉诚信❉',
  '❉友善❉',
]
const getRandomColor = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const moveDom = (element, direction, duration, callback) => {
  const start = performance.now() //获取当前时间戳
  requestAnimationFrame(function animate(timestamp) {
    const progress = timestamp - start //获取当前时间戳与开始时间戳的差值
    const easeInOutQuad = function (t) {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
    }
    let progressT = easeInOutQuad(progress / duration) //计算当前进度百分比
    let opacity = element.style.opacity
    let top = parseInt(element.style.top) || 0
    opacity = opacity - (progressT * opacity) / 10
    top = direction === 'up' ? top - 1 : top + 1
    element.style.top = `${top}px`
    element.style.opacity = opacity

    if (progress > duration) return callback()
    requestAnimationFrame(animate)
  })
}

const createSpan = event => {
  const index = Math.floor(Math.random() * (list.length - 1))
  const x = event.pageX
  const y = event.pageY
  const span = document.createElement('span')
  span.style.position = 'absolute'
  span.textContent = list[index]
  span.style.fontWeight = 'bold'
  span.style.userSelect = 'none'
  span.style.cursor = 'default'
  span.style.zIndex = 999999999
  span.style.left = `${x}px`
  span.style.top = `${y - 20}px`
  span.style.opacity = 1
  let color = `rgba(${getRandomColor(255, 0)},${getRandomColor(255, 0)},${getRandomColor(255, 0)})`
  span.style.color = color
  document.body.appendChild(span)
  return span
}

;(() => {
  const element = document.querySelector('body')
  if (!element) return
  element.addEventListener('click', function (event) {
    const span = createSpan(event)
    moveDom(span, 'up', 5000, () => {
      span.remove()
    })
  })
})()
