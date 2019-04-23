import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader' //局部刷新
import { Provider } from 'react-redux'
import store from '@/redux'
import App from './App';
// 样式重置
import '@/style/reset.less'
// 阿里图标引入
import '@/assets/iconfont/iconfont.css'

// 全局样式引入
import '@/style/index.less'

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store = {store}>
        <Component/>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App)
  })
}
