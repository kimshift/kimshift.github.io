/**
 * @Description: 插件配置
 * @Version: 1.0
 * @Author: 琴时
 */
const path = require('path')
const yaml = require('js-yaml')
const CARD_LIST = 'cardList'
const CARD_IMG_LIST = 'cardImgList'

module.exports = [
  [
    'container',
    {
      type: 'details',
      before: info =>
        `<details class="custom-block details"><summary>${info}</summary>`,
      after: '</details>',
      defaultTitle: '详细信息',
    },
  ],
  [
    'container',
    {
      type: 'right',
      defaultTitle: '',
    },
  ],
  [
    'container',
    {
      type: 'theorem',
      before: info => `<div class="theorem"><p class="title">${info}</p>`,
      after: '</div>',
    },
  ],
  [
    'container',
    {
      // 卡片列表
      type: CARD_LIST,
      render: (tokens, idx) => {
        // tokens 是整个md文件的虚拟dom结构数组
        // idx 是tokens中':::' 所在的索引，而且是当前指定type的':::'，分别有开始和结束两次的idx
        // if (tokens[idx].nesting === 1) { // 开头的 ':::' 标记
        // } else { // 结束的 ':::' 标记
        // }
        // 注意：修改这里面的代码后需要在md文件保存一下才会重新执行渲染
        return renderCardList(tokens, idx, CARD_LIST)
      },
    },
  ],
  [
    'container',
    {
      // 图文卡片列表
      type: CARD_IMG_LIST,
      render: (tokens, idx) => {
        return renderCardList(tokens, idx, CARD_IMG_LIST)
      },
    },
  ],
  // 'flowchart', //流程图插件
  'reading-progress', //阅读进度条
  '@vuepress/nprogress', //进度条
  'vuepress-plugin-code-copy', //代码块一键复制
  'vuepress-plugin-baidu-autopush', //百度统计
  /* 底部脚注 */
  [
    'copyright',
    {
      minLength: 100, //超出100个字符显示底注
      clipboardComponent: path.resolve(
        __dirname,
        '../components/Copyright.vue'
      ),
    },
  ],
  require('../plugins/vuepress-plugin-boxx'), //名人名言【自定义插件】
  require('../plugins/detailsOpenFlag'),
  /* 可以添加第三方搜索链接的搜索框（原官方搜索框的参数仍可用） */
  [
    require('../plugins/enhanced-search'),
    {
      thirdparty: [
        // 可选，默认 []
        {
          title:
            '在 <span style="color: blue; ">Baidu</span> &nbsp;&nbsp;中搜索 ',
          frontUrl: 'https://www.baidu.com/s?wd=',
        },
        {
          title: '在 <span style="color: red; ">Google</span> 中搜索 ',
          frontUrl: 'https://www.google.com/search?q=',
        },
      ],
    },
  ],
  [
    '@vuepress/pwa',
    {
      serviceWorker: true,
      updatePopup: {
        message: '有新的内容更新',
        buttonText: '刷新',
      },
    },
  ],
  /* 文章更新时间 */
  [
    '@vuepress/last-updated',
    {
      transformer: (timestamp, lang) => {
        const moment = require('moment')
        return moment(timestamp).utcOffset(480).format('YYYY/MM/DD HH:mm:ss')
      },
    },
  ],
  [
    '@vuepress/medium-zoom',
    {
      selector: 'img',
      options: {
        margin: 16,
      },
    },
  ], //图片缩放插件
]

// 渲染md容器的卡片列表
function renderCardList(tokens, idx, type) {
  const END_TYPE = `container_${type}_close`,
    _tokens$idx = tokens[idx],
    nesting = _tokens$idx.nesting,
    info = _tokens$idx.info
  if (nesting === 1) {
    // 渲染开头的 ':::' 标记
    let yamlStr = ''

    for (let i = idx; i < tokens.length; i++) {
      let _tokens$i = tokens[i],
        type = _tokens$i.type,
        content = _tokens$i.content,
        _info = _tokens$i.info
      if (type === END_TYPE) break // 遇到结束的 ':::' 时
      if (!content) continue
      if (type === 'fence' && _info === 'yaml') {
        // 是代码块类型，并且是yaml代码
        yamlStr = content
      }
    }

    if (yamlStr) {
      // 正确解析出yaml字符串后
      const dataObj = yaml.load(yamlStr) // 将yaml字符串解析成js对象
      let dataList = []

      if (dataObj) {
        // 正确解析出数据对象
        dataList = Array.isArray(dataObj) ? dataObj : dataObj.list
      }

      if (dataList && dataList.length) {
        // 有列表数据

        // 每行显示几个
        let row = Number(info.split(' ').pop())
        if (!row || row > 4 || row < 1) {
          row = 3 // 默认 3
        }

        let listDOM = ''
        if (type === CARD_LIST) {
          // 普通卡片列表
          listDOM = getCardListDOM(dataList, row)
        } else if (type === CARD_IMG_LIST) {
          // 卡片图片列表
          listDOM = getCardImgListDOM(dataList, row)
        }

        return `<div class="${type}Container"><div class="card-list">${listDOM}</div>`
      }
    }
  } else {
    // 渲染':::' 结尾
    return '</div>'
  }
}

// 将数据解析成DOM结构 - 普通卡片列表
function getCardListDOM(dataList, row) {
  let listDOM = ''
  dataList.forEach(item => {
    listDOM += `
      <${
        item.link ? 'a href="' + item.link + '" target="_blank"' : 'span'
      } class="card-item ${row ? 'row-' + row : ''}"
         style="${
           item.bgColor ? 'background-color:' + item.bgColor + ';' : ''
         }${item.textColor ? 'color:' + item.textColor + ';' : ''}"
      >
        ${item.avatar ? '<img src="' + item.avatar + '" class="no-zoom">' : ''}
        <div>
          <p class="name">${item.name}</p>
          <p class="desc">${item.desc}</p>
        </div>
      </${item.link ? 'a' : 'span'}>
    `
  })
  return listDOM
}

// 将数据解析成DOM结构 - 图文卡片列表
function getCardImgListDOM(dataList, row) {
  let listDOM = ''
  dataList.forEach(item => {
    listDOM += `
      <div class="card-item ${row ? 'row-' + row : ''}" >
        <div class="box-img">
          <a href="${item.link}" target="_blank">
            <img src="${item.img}" class="no-zoom">
          </a>
        </div>
        <div class="box-info">
          <a href="${item.link}" target="_blank">
            <p class="name">${item.name}</p>
            ${item.desc ? `<p class="desc">${item.desc}</p>` : ''}
          </a>
        </div>
        
        ${
          item.avatar || item.author
            ? `<div class="box-footer">
              <a href="${item.link}" target="_blank">
                ${
                  item.avatar
                    ? `<img src="${item.avatar}" class="no-zoom">`
                    : ''
                }
                ${item.author ? `<span>${item.author}</span>` : ''}
              </a>
            </div>`
            : ''
        }
      </div>
    `
  })
  return listDOM
}
