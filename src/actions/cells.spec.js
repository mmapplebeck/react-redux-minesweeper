import expect from 'expect'
import * as cellActions from './cells'

describe('cell action creators', () => {

  describe('toggleFlag', () => {

    it('should return the correct action', () => {
      const expected = {
        type: cellActions.TOGGLE_FLAG,
        payload: 1
      }
      const actual = cellActions.toggleFlag(1)
      expect(actual).toEqual(expected)
    })
  })

  describe('toggleOpening', () => {

    it('should return the correct action', () => {
      const expected = {
        type: cellActions.TOGGLE_OPENING,
        payload: 1
      }
      const actual = cellActions.toggleOpening(1)
      expect(actual).toEqual(expected)
    })
  })

  describe('moveMine', () => {
    function Cell(x, y, armed, adjacentMineCount) {
      this.x = x
      this.y = y
      this.armed = armed
      this.adjacentMineCount = adjacentMineCount
    }

    it('should dispatch the correct actions', () => {
      // 1 1 1
      // 1 x 1
      // 1 1 1
      const thunk = cellActions.moveMine(4)
      expect(thunk).toBeA('function')
      const getState = () => ({
        game: {
          settings: {
            rowCount: 3,
            colCount: 3
          },
          cells: {
            0: new Cell(0, 0, false, 1),
            1: new Cell(1, 0, false, 1),
            2: new Cell(2, 0, false, 1),
            3: new Cell(0, 1, false, 1),
            4: new Cell(1, 1, true, 0),
            5: new Cell(2, 1, false, 1),
            6: new Cell(0, 2, false, 1),
            7: new Cell(1, 2, false, 1),
            8: new Cell(2, 2, false, 1)
          }
        }
      })
      const dispatch = expect.createSpy()
      thunk(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith({
        type: cellActions.TOGGLE_ARMED,
        payload: [4, 0]
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: cellActions.DECREMENT_ADJACENT_MINE_COUNT,
        payload: [0, 1, 2, 3, 5, 6, 7, 8]
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: cellActions.INCREMENT_ADJACENT_MINE_COUNT,
        payload: [1, 3, 4]
      })
    })
  })
})