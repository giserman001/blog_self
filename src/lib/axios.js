import axios from 'axios'

import { message } from 'antd'

// 创建请求实列
const instance = axios.create({
  // baseURL: '',
  timeout: 10000
})

//拦截请求
instance.interceptors.request.use((config) => {
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
  return response.data
}, (error) => {
  message.error(error.response.statusText)
  return Promise.reject(error)
})
