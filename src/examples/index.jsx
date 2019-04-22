import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import routes from './routes'


// 这里其实隐含一个内容（组件是一个函数，组件属性就是函数的参数）
const NavList = ({ routes, contextPath }) => {
  const renderRoute = (item, routeContextPath) => {
    const link = item.path.replace(/:.+/, '1') // 处理类似 form/:formId 的路由
    return (
      <li key={item.path}>
        <Link to={`${routeContextPath}/${link}`}>{item.name || item.path}</Link>
        {item.childRoutes && (
          <ul>{item.childRoutes.map(sub => renderRoute(sub, `${routeContextPath}/${item.path}`))}</ul>
        )}
      </li>
    )
  }
  return <ul>{routes.map(item => renderRoute(item, contextPath))}</ul>
}

class ExampleIndex extends Component {
  render() {
    return (
      <div>
        <h1>ExampleIndex</h1>
        <NavList routes={routes.childRoutes} contextPath="/examples" />
      </div>
    )
  }
}

export default ExampleIndex
