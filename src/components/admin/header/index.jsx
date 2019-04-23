import React, { Component } from 'react'
import './index.less'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AuthorAvatar from '@/components/web/AuthorAvatar'

import { Button, Icon, Dropdown, Menu } from 'antd'

const DropdownMenu = () => (
  <Menu className="menu">
    <Menu.ItemGroup title="用户中心" className="menu-group">
      <Menu.Item>你好</Menu.Item>
      <Menu.Item>个人信息</Menu.Item>
      <Menu.Item>
        <span>退出登录</span>
      </Menu.Item>
    </Menu.ItemGroup>
    <Menu.ItemGroup title="设置中心" className="menu-group">
      <Menu.Item>个人设置</Menu.Item>
      <Menu.Item>系统设置</Menu.Item>
    </Menu.ItemGroup>
  </Menu>
)

@connect(
  null,
  null
)
@withRouter
class AdminHeader extends Component {
  static propTypes = {
    collapsed: PropTypes.bool.isRequired,
    onToggle: PropTypes.func
  }
  handleLogout = () => {
    console.log('退出登录')
    // this.props.history.push('/login')
  }
  renderDropDownMenu = () => {
    return (
      <Menu className="menu">
        <Menu.Item>
          <span onClick={() => this.props.history.push('/')}>返回主页</span>
        </Menu.Item>
        <Menu.Item>
          <span onClick={this.handleLogout}>退出登录</span>
        </Menu.Item>
      </Menu>
    )
  }
  render () {
    const { collapsed } = this.props
    return (
      <div className="admin-header-container">
        <Icon
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          className="trigger"
          onClick={this.props.onToggle}
        />
        <div className="header-right">
          <Dropdown overlay={this.renderDropDownMenu()}>
            <span>
              <AuthorAvatar size="large" />
            </span>
          </Dropdown>
        </div>
      </div>
    )
  }
}
export default AdminHeader