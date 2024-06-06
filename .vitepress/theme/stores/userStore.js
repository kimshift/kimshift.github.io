// 管理用户数据相关

import { defineStore } from 'pinia'
import { toCode } from '@/utils/encryption'
import { Login } from '@/apis/userApi'
import { createUUID, setExpires } from '@/utils'
import { session } from '@/utils/store'
export const useUserStore = defineStore(
  'userInfo',
  () => {
    const userInfo = ref({})
    const authorization = ref(null)
    const isLogin = ref(false)
    const isAdmin = ref(false)
    const router = useRouter()
    const route = useRoute()
    console.log('测试route:', route)
    // 登录
    const onLogin = async (params, callback) => {
      params = JSON.parse(JSON.stringify(params))
      const password = params.password
      params.password = toCode(`${createUUID()}#${password}#${Date.now()}`) //密码加密
      const res = await Login(params) //登录请求
      if (res.code !== 200) return ElMessage.error(res.message)
      let { user, token } = res.data
      syncUserInfo(user, token) //同步登录信息
      ElMessage.success(res.message)
      const { redirect, auth } = route.query
      if (this.checked) {
        // 记住密码
        // setCookie('login-cookies', `${params.username}///${toCode(password)}`);
        window.localStorage.setItem('login-cache', JSON.stringify(params))
      }
      if (redirect) {
        // 存在返回路由==>判断返回路由是否需要权限==>判断当前账号有无权限（需要权限却没有权限的则跳转回首页）
        const url = auth === 'true' ? (userInfo.isMange ? redirect : '/public') : redirect
        this.$router.replace(url)
      } else {
        const url = userInfo.isMange ? '/mange' : '/public'
        this.$router.replace(url)
      }
    }

    // 同步用户信息
    const syncUserInfo = (info, token) => {
      if (token) {
        authorization.value = token
        setExpires() //缓存登录时间
      }
      const { isMange, username } = info
      userInfo.value = info //存储登录信息
      isLogin.value = Boolean(username) //存储登录状态
      isAdmin.value = isMange //存储权限状态
    }

    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password })
      userInfo.value = res.result
      // 合并购物车的操作
      await mergeCartAPI(
        cartStore.cartList.map(item => {
          return {
            skuId: item.skuId,
            selected: item.selected,
            count: item.count,
          }
        })
      )
      cartStore.updateNewList()
    }

    const clearUserInfo = () => {
      userInfo.value = {}
      // 执行清除购物车的action
      cartStore.clearCart()
    }

    return {
      userInfo,
      onLogin,
      getUserInfo,
      clearUserInfo,
    }
  },
  {
    persist: true,
  }
)
