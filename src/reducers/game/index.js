import {combineReducers} from 'redux'
import settings from './settings'
import secondsElapsed from './secondsElapsed'
import cells from './cells'

export default combineReducers({
  settings,
  secondsElapsed,
  cells
})