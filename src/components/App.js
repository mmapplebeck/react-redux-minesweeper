import React from 'react'
import Window from './Window'
import Menu from './Menu'
import Game from '../containers/Game'
import '../assets/spritesheet.png'
import '../style/app.scss'
import '../style/sprite.scss'

const getMenuItems = props => ([
  {
    label: 'Game',
    groups: [[{
      label: 'New',
      onClick: props.resetGame
    }],
    [{
      active: props.settings.id === 'beginner',
      label: 'Beginner',
      onClick: props.setBeginner
    },
    {
      active: props.settings.id === 'intermediate',
      label: 'Intermediate',
      onClick: props.setIntermediate
    },
    {
      active: props.settings.id === 'expert',
      label: 'Expert',
      onClick: props.setExpert
    }]]
  }
])

export default props => (
  <Window title="React/Redux Minesweeper">
    <Menu items={getMenuItems(props)}/>
    <Game />
  </Window>
)