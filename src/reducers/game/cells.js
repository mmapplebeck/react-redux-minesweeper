import {INITIAL_STATE as INITIAL_SETTINGS} from './settings'
import {OPEN_CELLS, OPEN_CELL, TOGGLE_FLAG, TOGGLE_OPENING, TOGGLE_ARMED, INCREMENT_ADJACENT_MINE_COUNT, DECREMENT_ADJACENT_MINE_COUNT} from '../../actions/cells'
import {END_GAME, RESET_GAME} from '../../actions/game'
import {getAdjacentCellIds, getGridLayoutUtil} from '../../utils'
import {getGridLayout} from '../../selectors'

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
    case TOGGLE_ARMED:
      return Object.assign({}, state, {
        armed: !state.armed
      })
    case INCREMENT_ADJACENT_MINE_COUNT:
      return Object.assign({}, state, {
        adjacentMineCount: state.adjacentMineCount + 1
      })
    case DECREMENT_ADJACENT_MINE_COUNT:
      return Object.assign({}, state, {
        adjacentMineCount: state.adjacentMineCount - 1
      })
    case END_GAME:
      return Object.assign({}, state, {
        open: state.flagged ? false : (state.armed ? true : state.open)
      })
    default:
      return state
  }
}

const cells = (state = {}, action) => {
  return action.payload
    .map(id => ({
      [id]: cell(state[id], action)
    }))
    .reduce((cells, cell) => Object.assign({}, cells, cell), {})
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case OPEN_CELLS:
    case TOGGLE_ARMED:
    case INCREMENT_ADJACENT_MINE_COUNT:
    case DECREMENT_ADJACENT_MINE_COUNT:
      return Object.assign({}, state, cells(state, action))
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