import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Loading from '@/components/Loading'
import routes from '@/routes/config'
import { connect } from 'react-redux'
import { getTags, getCategories } from '@/redux/article/action'
@connect(state => ({
  state: state.user
}),{ getTags, getCategories })
class App extends Component {
  componentDidMount() {
    this.props.getTags()
    this.props.getCategories()
  }
  /**
  * 根据路由表生成路由组件
  * @param {Array} routes - 路由配置表
  * @param {String} contextPath - 父级路径。比如后台 admin...
  */
  renderRoutes(routes, contextPath) {
    const children = []

    const renderRoute = (item, routeContextPath) => {
      // auth handler
      if (item.protected && this.props.auth !== 1) {
        item = {
          ...item,
          component: () => <Redirect to="/login" />,
          children: []
        }
      }
      let newContextPath = item.path ? `${routeContextPath}/${item.path}` : routeContextPath
      newContextPath = newContextPath.replace(/\/+/g, '/')
      if (item.component && item.childRoutes) {
        const childRoutes = this.renderRoutes(item.childRoutes, newContextPath)
        children.push(
          <Route
            key={newContextPath}
            render={props => <item.component {...props}>{childRoutes}</item.component>}
            path={newContextPath}
          />
        )
      } else if (item.component) {
        if (typeof item.component === 'function') {
          children.push(<Route key={newContextPath} component={item.component} path={newContextPath} exact />)
        } else {
          // 修复: Failed prop type: Invalid prop `component` of type `object` supplied to `Route`, expected `function`
          // object 时 即为 lazyload 返回的对象时，使用 () => <Component /> 去装载路由组件
          children.push(<Route key={newContextPath} component={() => <item.component />} path={newContextPath} exact />)
        }
      } else if (item.childRoutes) {
        item.childRoutes.forEach(r => renderRoute(r, newContextPath))
      }
    }

    routes.forEach(item => renderRoute(item, contextPath))

    return <Switch>{children}</Switch>
  }
  render() {
    const children = this.renderRoutes(routes, '/')
    return (
      <BrowserRouter>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </BrowserRouter>
    )
  }
}

export default App;

// 路由结构大致为
/*
const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route
        path="/example"
        render={() => (
          <ExampleLayout>
            <Route path="" component={component} exact />
            <Route path="path" component={component} exact />
          </ExampleLayout>
        )}
      />
      <Route
        path="/admin"
        render={() => (
          <ExampleLayout>
            <Route path="path" component={component} exact />
          </ExampleLayout>
        )}
      />
      <Route
        path="/"
        render={() => (
          <ExampleLayout>
            <Route path="/" component={home} exact />
            <Route path="path" component={component} exact />
          </ExampleLayout>
        )}
      />
    </Switch>
  </BrowserRouter>
)
*/

