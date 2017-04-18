import {connect} from 'react-redux'
import Game from '../components/Game'
import {getGridLayout, getStatus, getRemainingFlagsCount} from '../selectors'
import {resetGame} from '../actions/game'
import {toThreeDigits} from '../utils'

const mapStateToProps = state => ({
  cells: state.game.cells,
  layout: getGridLayout(state),
  status: getStatus(state),
  remainingFlagsCount: toThreeDigits(getRemainingFlagsCount(state))
})

const mapDispatchToProps = dispatch => ({
  resetGame: () => dispatch(resetGame())
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)