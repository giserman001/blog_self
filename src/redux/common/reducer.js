import * as constants from '@/redux/constants'
import { groupBy, random } from '@/lib/util'
const defaultState = {
    colorList: ['magenta', 'blue', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'geekblue', 'purple'], // 标签颜色
    authModalVisible: false,
    authModalType: '',
    windowWidth: 0,
    drawerVisible: false,
    colorMap: {}
}

export const commonReducer = (state = defaultState, action) => {
    const { type, payload } = action
    switch (type) {
        case constants.COMMON_COLOR_MAP:
            return state
        default:
            return state
    }
}

export default commonReducer