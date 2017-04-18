import React from 'react'
import Cell from '../containers/Cell'
import '../style/grid.scss'

export default props => (
  <div className="grid">
    {
      props.layout.map((row, i) => (
        <div key={i} className="grid__row">
          {
            row.map(cellId => (
              <Cell key={cellId} id={cellId} {...props.cells[cellId]} />
            ))
          }
        </div>
      ))
    }
  </div>
)