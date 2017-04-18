import {getGridLayout} from '../selectors'
import {getAdjacentCellIds} from '../utils'

export const OPEN_CELL = 'OPEN_CELL'
export const OPEN_CELLS = 'OPEN_CELLS'
export const TOGGLE_FLAG = 'TOGGLE_FLAG'
export const TOGGLE_OPENING = 'TOGGLE_OPENING'

const getCellPos = (id, settings) => {
  const y = Math.floor(id / settings.colCount)
  const x = id - (y * settings.colCount)
  return {x, y}
}

const openArea = (id, state, cellsMarkedOpen) => {
  const cells = state.game.cells
  getAdjacentCellIds(getGridLayout(state), getCellPos(id, state.game.settings))
    .filter(id =>
      !cells[id].armed
      && !cells[id].flagged
      && cellsMarkedOpen.indexOf(id) === -1
    )
    .forEach(id => {
      cellsMarkedOpen.push(id)
      if (cells[id].adjacentMineCount > 0) return
      cellsMarkedOpen = openArea(id, state, cellsMarkedOpen)
    })
  return cellsMarkedOpen
}

export const openCell = id => {
  return (dispatch, getState) => {
    const state = getState()
    if (state.game.cells[id].armed || state.game.cells[id].adjacentMineCount > 0) {
      dispatch({
        type: OPEN_CELL,
        payload: id
      })
    } else {
      dispatch({
        type: OPEN_CELLS,
        payload: openArea(id, state, [id])
      })
    }
  }
}

export const toggleFlag = id => ({
  type: TOGGLE_FLAG,
  payload: id
})

export const toggleOpening = id => ({
  type: TOGGLE_OPENING,
  payload: id
})