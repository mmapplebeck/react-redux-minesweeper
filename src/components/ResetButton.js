import React, {Component} from 'react'
import '../style/reset-button.scss'

export default props => (
  <button
    className={`reset-button reset-button--${props.status.toLowerCase()}`}
    onClick={props.onClick}>
    <div className="reset-button__content sprite"></div>
  </button>
)