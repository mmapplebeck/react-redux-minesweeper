import {TIMER_TICK, RESET_GAME} from '../../actions/game'

export default (state = 0, action) => {
  switch(action.type) {
    case TIMER_TICK:
      return state + 1
    case RESET_GAME:
      return 0
    default:
      return state
  }
}