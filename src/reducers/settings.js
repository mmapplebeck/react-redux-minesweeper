import {UPDATE_SETTINGS} from '../actions/menu'
import {DEFAULT_SETTINGS} from '../constants'

export default (state = DEFAULT_SETTINGS.BEGINNER, action) => {
  switch(action.type) {
    case UPDATE_SETTINGS:
      return action.payload
    default:
      return state
  }
}