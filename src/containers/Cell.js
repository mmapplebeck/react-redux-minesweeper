import {connect} from 'react-redux'
import Cell from '../components/Cell'
import {startGame, endGame} from '../actions/game'
import {openCell, toggleFlag, toggleOpening, moveMine} from '../actions/cells'
import {getRemainingFlagsCount, getStarted, getGameOver} from '../selectors'

const mapStateToProps = state => ({
  gameOver: getGameOver(state),
  started: getStarted(state),
  remainingFlagsCount: getRemainingFlagsCount(state),
})

const mapDispatchToProps = (dispatch, {id}) => ({
  openCell: () => dispatch(openCell(id)),
  toggleOpening: () => dispatch(toggleOpening(id)),
  toggleFlag: () => dispatch(toggleFlag(id)),
  startGame: () => dispatch(startGame()),
  endGame: () => dispatch(endGame()),
  moveMine: () => dispatch(moveMine(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cell)