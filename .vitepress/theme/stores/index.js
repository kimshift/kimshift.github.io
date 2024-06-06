import { createPinia } from 'pinia'
// 引入pinia的持久化存储插件
import piniaPersist from 'pinia-plugin-persist'

const pinia = createPinia()
// 使用插件
pinia.use(piniaPersist)

export default pinia
