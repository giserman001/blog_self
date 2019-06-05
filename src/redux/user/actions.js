import * as constants from '@/redux/constants'

import axios from '@/lib/axios'
import { message } from 'antd'

export const login = params => {
    return dispatch => {
        axios.post('/login', params).then(res => {
            if (res.code == 200) {
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
        })
    }
}