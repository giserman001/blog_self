import { combineReducers } from 'redux'

import demo from './demo/reducer'
import user from './user/reducer'

export default combineReducers({
  demo,
  user
})
