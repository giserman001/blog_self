import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader' //局部刷新
import '@/style/index.less'
import { Provider } from 'react-redux'
import store from '@/redux'
import App from './App';

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
