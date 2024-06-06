import { defineStore } from 'pinia'
export const useCounterStore = defineStore(
  'counter',
  () => {
    const count = ref(2)
    const increment = () => {
      count.value++
    }
    return { count, increment }
  },
  {
    persist: {
      enabled: true, //开启缓存
      strategies: [
        {
          key: 'counterPiniaStore', //存储名称
          storage: sessionStorage, // 存储方式
          paths: null, //指定 state 中哪些数据需要被持久化。[] 表示不持久化任何状态，undefined 或 null 表示持久化整个 state
        },
      ],
    },
  }
)
