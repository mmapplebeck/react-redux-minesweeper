import {connect} from 'react-redux'
import Counter from '../components/Counter'
import {toThreeDigits} from '../utils'

const mapStateToProps = state => ({
  count: toThreeDigits(Math.min(state.game.secondsElapsed, 999))
})

export default connect(mapStateToProps)(Counter)