import React, {Component} from 'react'
import '../style/cell.scss'

export default class Cell extends Component {
  constructor(props) {
    super(props)
    this.getClassName = this.getClassName.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseOut = this.onMouseOut.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onContextMenu = this.onContextMenu.bind(this)
  }

  getClassName() {
    let className = 'cell'
    if (this.props.open) {
      className += ' cell--open'
      if (this.props.armed) {
        className += ' cell--armed'
        if (this.props.detonated) {
          className += ' cell--detonated'
        }
      } else if (this.props.adjacentMineCount > 0) {
        className += ` cell--${this.props.adjacentMineCount}`
      }
    } else {
      if (this.props.opening) {
        className += ' cell--opening'
      }
      if (this.props.flagged) {
        className += ' cell--flagged'
      }
    }
    return className
  }

  ignoreClick() {
    return this.props.gameOver || this.props.flagged || this.props.open
  }

  onMouseDown(e) {
    if (this.ignoreClick() || e.button !== 0) return
    this.props.toggleOpening()
  }

  onMouseOut() {
    if (!this.props.opening) return
    this.props.toggleOpening()
  }

  onClick(e) {
    if (this.ignoreClick()) return
    if (!this.props.started) {
      this.props.startGame()
      if (this.props.armed) this.props.moveMine()
    }
    if (this.props.opening) this.props.toggleOpening()
    this.props.openCell()
  }

  onContextMenu(e) {
    e.preventDefault()
    if (this.props.gameOver
      || this.props.open
      || (!this.props.flagged && this.props.remainingFlagsCount === 0)) return   
    this.props.toggleFlag()
  }

  render() {
    return (
      <div
        className={this.getClassName()}
        onMouseDown={this.onMouseDown}
        onMouseOut={this.onMouseOut}
        onClick={this.onClick}
        onContextMenu={this.onContextMenu}>
          <div className="cell__content sprite"></div>
      </div>
    )
  }
}