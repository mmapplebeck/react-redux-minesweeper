import React, {Component} from 'react'
import '../style/menu.scss'


class Dropdown extends Component {
  onClick(e, callback) {
    e.stopPropagation()
    this.props.closeMenuItems()
    callback()
  }

  render() {
    return (
      <div className="dropdown">
        {
          this.props.groups.map((group, i) => (
            <div key={i} className="dropdown-group">
              {
                group.map((item, i) => (
                  <div
                    key={i}
                    className={`dropdown-item${item.active ? ' dropdown-item--active' : ''}`}
                    onClick={(e) => this.onClick(e, item.onClick)}>
                    <div className="dropdown-item__icon sprite"></div>
                    {item.label}
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
    )
  }
}

export default class Menu extends Component {
  constructor(props) {
    super(props)
    this.closeMenuItems = this.closeMenuItems.bind(this)
    this.state = {
      openItemIndex: null
    }
  }

  onItemClick(i) {
    if (i === this.state.openItemIndex) {
      this.closeMenuItems()
      return
    }
    this.setState({
      openItemIndex: i
    })
  }

  closeMenuItems() {
    this.setState({
      openItemIndex: null
    })
  }

  render() {
    return (
      <div className={'menu' + (this.state.openItemIndex !== null ? ' menu--open' : '')}>
        <div className="menu-backdrop" onClick={this.closeMenuItems}></div>
        {
          this.props.items.map((item, i) => (
            <div
              key={i}
              className={'menu-item' + (this.state.openItemIndex === i ? ' menu-item--open' : '')}
              onClick={() => this.onItemClick(i)}>
              {item.label}
              <Dropdown groups={item.groups} closeMenuItems={this.closeMenuItems} />
            </div>
          ))
        }
      </div>
    )
  }
}