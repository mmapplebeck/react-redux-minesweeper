import React from 'react'
import '../style/window.scss'

export default props => (
  <div className="window">
    <div className="window__header">
      <div className="window__header-icon sprite"></div>
      <div className="window__header-title">
        {props.title}
      </div>
    </div>
    <div className="window__content">
      {props.children}
    </div>
  </div>
)