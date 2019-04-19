import * as constants from '@/redux/constants'

import axios from '@/lib/axios'
import { message } from 'antd'

// actions
export const addCount = () => {
  return { type: constants.DEMO_ADD_COUNT }
}

const changeLogin = () => ({
  type: constants.DEMO_LOGIN
})
export const login = ({username, password}) => {
  return (dispatch) => {
    axios.post('/examples/login', {username, password}).then(res => {
      if (res.code === 200) {
        localStorage.setItem('token', res.token)
        const action = changeLogin()
        dispatch(action)
      }else {
        message.error(res.message)
      }
      return res
    })
  }
}

const changeRegister = () => ({
  type: constants.DEMO_REGISTER
})
export const register = ({username, password}) => {
  console.log(username, password)
  return (dispatch) => {
    axios.post('/examples/register', {username, password}).then(res => {
      const action = changeRegister()
      dispatch(action)
    })
  }
}



export const loginout = () => ({
  type: constants.DEMO_LOGINOUT
})