import axios from 'axios'
import { message } from 'antd'
import NProgress from 'nprogress'

// 创建请求实列
const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:6050' : '', // api的base_url
  timeout: 10000
})

//拦截请求
instance.interceptors.request.use((config) => {
  NProgress.start()
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.common['Authorization'] = 'Bearer ' + token
  }
  return config
}, (error) => {
  message.error('bad request')
  Promise.reject(error)
})

// 拦截响应
instance.interceptors.response.use((response) => {
  NProgress.done()
  if (response.data.code !== 200) {
    response.data.message && message.warning(response.data.message)
    return Promise.reject(response.data)
  }
  return response.data
}, (error) => {
  NProgress.done()
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        message.error('错误请求')
        break
      case 401:
        localStorage.clear()
        message.error('登录信息过期或未授权，请重新登录！')
        break
      case 403:
        message.error('拒绝访问！')
        break
      case 404:
        message.error('请求错误,未找到该资源！')
        break
      case 500:
        message.error('服务器出问题了，请稍后再试！')
        break
      default:
        message.error(`连接错误 ${error.response.status}！`)
        break
    }
  } else {
    message.error('服务器出了点小问题，请稍后再试！')
  }
  return Promise.reject(error)
})

export default instance
