import {DEFAULT_SETTINGS} from '../../constants'
import {RESET_GAME} from '../../actions/game'

export const INITIAL_STATE = DEFAULT_SETTINGS.BEGINNER

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case RESET_GAME:
      return action.payload
    default:
      return state
  }
}