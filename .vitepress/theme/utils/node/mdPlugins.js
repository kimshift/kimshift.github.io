/* eslint-disable global-require */
import mdCheckbox from 'markdown-it-task-checkbox'
import mdContainer from 'markdown-it-container'

// 注册 markdown插件
export function registerMdPlugins(vpCfg) {
  vpCfg.markdown = {
    config(md) {
      md.use(mdCheckbox) //使用任务列表复选框插件
    },
    image: {
      lazyLoading: true, //开启图片懒加载
    },
  }
}
