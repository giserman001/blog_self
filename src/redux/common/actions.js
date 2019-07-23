import * as constants from '@/redux/constants'

export const generateColorMap = commentList => ({
  type: constants.COMMON_COLOR_MAP,
  payload: commentList // 生成头像的颜色匹配
})