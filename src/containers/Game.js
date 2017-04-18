import {connect} from 'react-redux'
import Game from '../components/Game'
import {getGridLayout, getStatus, getRemainingFlagsCount, getGameOver} from '../selectors'
import {resetGame, endGame} from '../actions/game'
import {toThreeDigits} from '../utils'

const mapStateToProps = state => ({
  cells: state.game.cells,
  layout: getGridLayout(state),
  status: getStatus(state),
  remainingFlagsCount: toThreeDigits(getRemainingFlagsCount(state)),
  gameOver: getGameOver(state)
})

const mapDispatchToProps = dispatch => ({
  resetGame: () => dispatch(resetGame()),
  endGame: () => dispatch(endGame())
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)