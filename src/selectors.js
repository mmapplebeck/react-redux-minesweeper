import {createSelector} from 'reselect'
import {STATUS} from './constants'
import {getGridLayoutUtil} from  './utils'

const getCells = state => state.game.cells 
const getSettings = state => state.game.settings

export const getGridLayout = createSelector(
  getSettings,
  getGridLayoutUtil
)

const getCellCounts = createSelector(
  getSettings,
  getCells,
  (settings, cells) => {
    return Object.keys(cells).reduce((counts, id) => {
      return Object.assign({}, counts, {
        openCellCount: cells[id].open ? counts.openCellCount + 1 : counts.openCellCount,
        openingCellCount: cells[id].opening ? counts.openingCellCount + 1 : counts.openingCellCount,
        flaggedCellCount: cells[id].flagged ? counts.flaggedCellCount + 1 : counts.flaggedCellCount,
        detonatedCellCount: cells[id].detonated ? counts.detonatedCellCount + 1 : counts.detonatedCellCount
      })}, {
      openCellCount: 0,
      openingCellCount: 0,
      flaggedCellCount: 0,
      detonatedCellCount: 0,
      totalCellCount: settings.rowCount * settings.colCount
    })
  }
)

export const getStatus = createSelector(
  getSettings,
  getCellCounts,
  ({mineCount}, cellCounts) => {
    if (cellCounts.detonatedCellCount > 0) return STATUS.FAILED
    if (cellCounts.openCellCount === cellCounts.totalCellCount - mineCount) return STATUS.CLEARED
    if (cellCounts.openingCellCount > 0) return STATUS.DANGER
    return STATUS.NEUTRAL
  }
)

export const getRemainingFlagsCount = createSelector(
  getSettings,
  getCellCounts,
  ({mineCount}, {flaggedCellCount}) => Math.max(mineCount - flaggedCellCount, 0)
)

export const getGameOver = createSelector(
  getStatus,
  status => status === STATUS.CLEARED || status === STATUS.FAILED
)

export const getStarted = createSelector(
  getCellCounts,
  cellCounts => cellCounts.openCount > 0
)