import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './index.less'
import { connect } from 'react-redux'
import { Button, message, Input, Icon } from 'antd'
import { login } from '@/redux/demo/actions'
import logo from '@/assets/logo.svg'

@withRouter
@connect(
  state => state.demo,
  { login }
)
class Login extends Component {
  state = {
    username: 'liuya',
    password: 'liuya'
  }
  handleSubmit = async () => {
    await this.props.login({ username: this.state.username, password: this.state.password })
    if (this.props.isLogin) {
      message.success('success login')
      this.props.history.push('/examples')
    }
  }
  handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    this.setState({ [name]: value })
  }
  render() {
    return (
      <div className="login-container">
        <div className="login-form">
          <img src={logo} alt="" className="App-logo" />
          <Input
            size="large"
            style={{ marginBottom: 25 }}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <Input
            size="large"
            style={{ marginBottom: 25 }}
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <Button style={{ width: '100%' }} size="large" type="primary" onClick={this.handleSubmit}>
            登录
          </Button>
        </div>
      </div>
    )
  }
}

export default Login
