import * as constants from '@/redux/constants'

// 默认state

const defaultState = {
    categoryList: [],
    tagList: [],
    recentList: []
}

// reducer

export const articleReducer = (state = defaultState, action) => {
    const {type, payload} = action
    switch (type) {
        case constants.CATEGORY_GETLIST:
            return {...state, categoryList: payload}
        case constants.TAG_GETLIST:
            return {...state, tagList: payload}
        default:
            return state
    }
}

export default articleReducer