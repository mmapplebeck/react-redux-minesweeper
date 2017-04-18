import React, {Component} from 'react'
import Counter from './Counter'
import ResetButton from './ResetButton'
import Timer from '../containers/Timer'
import Grid from './Grid'
import '../style/game.scss'

export default class Game extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.gameOver && !prevProps.gameOver) this.props.endGame()
  }

  render() {
    return (
      <div className="game">
        <div className="game__hud">
          <Counter count={this.props.remainingFlagsCount} />
          <ResetButton status={this.props.status} onClick={this.props.resetGame} />
          <Timer />
        </div>
        <Grid layout={this.props.layout} cells={this.props.cells} />
      </div>
    )
  }
}