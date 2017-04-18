import React, {Component} from 'react'
import Counter from './Counter'
import ResetButton from './ResetButton'
import Timer from '../containers/Timer'
import Grid from './Grid'
import '../style/game.scss'

export default props => (
  <div className="game">
    <div className="game__hud">
      <Counter count={props.remainingFlagsCount} />
      <ResetButton status={props.status} onClick={props.resetGame} />
      <Timer />
    </div>
    <Grid layout={props.layout} cells={props.cells} />
  </div>
)