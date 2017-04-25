import {range, chunk} from 'lodash'

export const toThreeDigits = num => {
  return (num < 10 ? '00' + num : (num < 100 ? '0' + num : num)) 
}

export const getGridLayoutUtil = ({rowCount, colCount}) => {
  return chunk(range(rowCount * colCount), colCount)
}

export const getAdjacentCellIds = (grid, origin) => {
  let ids = []
  for (let i = -1; i < 2; i++) {
    let row = grid[origin.y + i]
    if (row === undefined) continue
    for (let j = -1; j < 2; j++) {
      let id = row[origin.x + j]
      if (id === undefined 
        || (i === 0 && j === 0)) {
        continue
      }
      ids.push(id)
    }
  }
  return ids
}