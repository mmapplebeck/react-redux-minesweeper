export const START_GAME = 'START_GAME'
export const RESET_GAME = 'RESET_GAME'
export const END_GAME = 'END_GAME'
export const TIMER_TICK = 'TIMER_TICK'

let then = null
let now = null
let stop = true

const tick = (dispatch) => {
  if (stop) return

  window.requestAnimationFrame(() => tick(dispatch))

  now = Date.now()
  let elapsed = now - then
  if (elapsed > 1000) {
    then = now
    dispatch({
      type: TIMER_TICK
    })
  }
}

export const startGame = () => {
  return dispatch => {
    dispatch({
      type: START_GAME
    })
    then = Date.now()
    stop = false
    tick(dispatch)
  }
}

export const resetGame = () => {
  stop = true
  return (dispatch, getState) => {
    dispatch({
      type: RESET_GAME,
      payload: getState().settings
    })
  }
}

export const endGame = () => {
  stop = true
  return {
    type: END_GAME
  }
}