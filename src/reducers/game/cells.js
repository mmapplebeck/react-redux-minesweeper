import {INITIAL_STATE as INITIAL_SETTINGS} from './settings'
import {OPEN_CELLS, OPEN_CELL, TOGGLE_FLAG, TOGGLE_OPENING} from '../../actions/cells'
import {END_GAME, RESET_GAME} from '../../actions/game'
import {getAdjacentCellIds, getGridLayoutUtil} from '../../utils'

export const generateCells = (settings) => {
  let cells = {}
  for (let y = 0; y < settings.rowCount; y++) {
    for (let x = 0; x < settings.colCount; x++) {
      cells[(y * settings.colCount) + x] = {
        x, y,
        open: false,
        opening: false,
        armed: false,
        detonated: false,
        flagged: false,
        adjacentMineCount: 0
      }
    }
  }

  let armedCells = []
  while (armedCells.length < settings.mineCount) {
    let cell = cells[Math.floor(Math.random() * (settings.rowCount * settings.colCount))]
    if (!cell.armed) {
      cell.armed = true
      armedCells.push(cell)
    }
  }

  armedCells.forEach(cell => {
    let adjacentCellIds = getAdjacentCellIds(getGridLayoutUtil(settings), cell)
    adjacentCellIds.forEach(id => {
      cells[id].adjacentMineCount += 1
    })
  })

  return cells
}

const INITIAL_STATE = generateCells(INITIAL_SETTINGS)

const cell = (state = {}, action) => {
  switch(action.type) {
    case OPEN_CELLS:
    case OPEN_CELL:
      return Object.assign({}, state, {
        open: true,
        detonated: state.armed ? true : state.detonated
      })
    case TOGGLE_OPENING:
      return Object.assign({}, state, {
        opening: !state.opening
      })
    case TOGGLE_FLAG:
      return Object.assign({}, state, {
        flagged: !state.flagged
      })
    case END_GAME:
      return Object.assign({}, state, {
        open: state.flagged ? false : (state.armed ? true : state.open)
      })
    default:
      return state
  }
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case OPEN_CELLS:
      const cells = action.payload
        .map(id => ({
          [id]: cell(state[id], action)
        }))
        .reduce((cells, cell) => Object.assign({}, cells, cell), {})
      return Object.assign({}, state, cells)
    case OPEN_CELL:
    case TOGGLE_FLAG:
    case TOGGLE_OPENING:
      return Object.assign({}, state, {
        [action.payload]: cell(state[action.payload], action)
      })
    case END_GAME:
      return Object.keys(state)
        .map(id => ({
          [id]: cell(state[id], action)
        })).reduce((cells, cell) => Object.assign({}, cells, cell), {})
    case RESET_GAME:
      return generateCells(action.payload)
    default:
      return state
  }
}