import * as constants from '@/redux/constants'

import axios from '@/lib/axios'
import { message } from 'antd'

// 登录
export const login = params => {
    return dispatch =>
    // 注意这里返回一个promise
        axios.post('/login', params).then(res => {
            if (res.code === 200) {
                localStorage.setItem('token', res.token)
                dispatch({
                    type: constants.USER_LOGIN,
                    payload: {
                        token: res.token
                    }
                })
            } else {
                message.error(res.message)
            }
            return res
        })
}

// 退出登录
export const loginOut = () => {
    localStorage.removeItem('token')
    return {
        type: constants.USER_LOGINOUT
    }
}
