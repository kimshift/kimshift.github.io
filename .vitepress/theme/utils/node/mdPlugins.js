/* eslint-disable global-require */
import mdCheckbox from 'markdown-it-task-checkbox'
import mdContainer from 'markdown-it-container'
import yaml from 'js-yaml'
import { isObject } from './index'

// 注册 markdown插件
export function registerMdPlugins(vpCfg) {
  vpCfg.markdown = {
    config(md) {
      md.use(mdCheckbox) //使用任务列表复选框插件
      let typeList = ['cardImgList']
      typeList.forEach(type => containerPlugin(md, type))
    },
    image: {
      lazyLoading: true, //开启图片懒加载
    },
  }
}

// 自定义markdown-it-container yaml容器插件
export function containerPlugin(md, type) {
  // 添加一个自定义的语法规则
  md.use(mdContainer, type, {
    /*******
     * @description: 自定义渲染容器规则
     * @author: 琴时
     * @param {*} tokens [整个md文件的虚拟dom结构数组]
     * @param {*} idx [当前容器的索引，即当前容器的':::'所在的位置]
     * @return {*}
     */
    render: function (tokens, idx) {
      const END_TYPE = `container_${type}_close`
      if (tokens[idx].nesting === 1) {
        const containerInfo = tokens[idx].info.trim()
        const args = containerInfo.split(' ')
        args.shift() // 去掉第一个参数，即容器类型
        // 开头的 ':::' 标记
        let yamlStr = ''
        // 从open索引开始遍历当前容器后面的所有token，直到遇到结束的 ':::' 标记
        for (let i = idx; i < tokens.length; i++) {
          let { type: cType, content, info } = tokens[i]
          if (cType.trim() === END_TYPE) break // 遇到结束的 ':::' 时
          if (!content) continue //无内容跳过
          if (cType === 'fence' && info === 'yaml') {
            // 是代码块类型，并且是yaml代码
            yamlStr = content
          }
        }
        let yamlList = analysisYaml(yamlStr)
        let dom = ''
        if (yamlList?.length > 0) {
          let row = args[0]
          const typeMap = {
            cardList: getCardListDOM(yamlList, row),
            cardImgList: getCardImgListDOM(yamlList, row),
          }
          dom = typeMap[type]
        }
        return `<div class="${type}">\n${dom}`
      } else {
        // 结束的 ':::' 标记
        return '</div>'
      }
    },
  })
}

/*******
 * @description: 解析yaml
 * @author: 琴时
 * @param {*} yamlStr [yaml字符串]
 * @return {Array} [解析后的数据数组]
 */
const analysisYaml = yamlStr => {
  if (!yamlStr.trim()) return []
  try {
    // 正确解析出yaml字符串后
    const result = yaml.load(yamlStr) // 将yaml字符串解析成js对象
    let yamlList = []
    if (result) {
      // 正确解析出数据对象
      yamlList = Array.isArray(result) ? result : [result]
    }
    return yamlList
  } catch (error) {
    return []
  }
}

// 将数据解析成DOM结构 - 普通卡片列表
function getCardListDOM(list, row) {
  let dom = ''
  list.forEach(item => {
    dom += `
      <${item.link ? 'a href="' + item.link + '" target="_blank"' : 'span'} class="card-item ${
      row ? 'row-' + row : ''
    }"
         style="${item.bgColor ? 'background-color:' + item.bgColor + ';' : ''}${
      item.textColor ? 'color:' + item.textColor + ';' : ''
    }"
      >
        ${item.avatar ? '<img src="' + item.avatar + '" class="no-zoom">' : ''}
        <div>
          <p class="name">${item.name}</p>
          <p class="desc">${item.desc}</p>
        </div>
      </${item.link ? 'a' : 'span'}>
    `
  })
  return dom
}

// 将数据解析成DOM结构 - 图文卡片列表
function getCardImgListDOM(list, row) {
  let dom = ''
  list.forEach(item => {
    if (!isObject(item)) return
    dom += `
      <div class="card-item row-${row}" >
        <div class="box-img">
          <a href="${item.link}" target="_blank">
            <img src="${item.img}" class="no-zoom" data-not-preview>
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
                ${item.avatar ? `<img src="${item.avatar}" class="no-zoom">` : ''}
                ${item.author ? `<span>${item.author}</span>` : ''}
              </a>
            </div>`
            : ''
        }
      </div>
    `
  })
  return dom
}
