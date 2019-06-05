import * as constants from '@/redux/constants'
import jwtDecode from 'jwt-decode'

// state 初始值
let defaultState = {
    userId: 0, //用户id
    username: '', // 用户名
    auth: 0, // 用户权限
    email: '', // 用户邮箱
    avatarColor: '#52c41a' // 用户头像颜色
}
// 保持状态持久性
if (!!localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined') {
    const {userId, username, auth, email} = jwtDecode(localStorage.token)
    defaultState = Object.assign(defaultState, {userId, username, auth, email})
}


// reducer
export default (state = defaultState, action) => {
    const {type, payload} = action
    switch (type) {
        case constants.USER_LOGIN:
            const {userId, username, auth, email} = jwtDecode(payload.token)
            return {...state, userId, username, auth, email}
        default:
            return state
    }
}
