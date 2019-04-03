import React from 'react'
import ReactDOM from 'react-dom'
import { Spin, Icon } from 'antd'

const loadingRoot = document.getElementById('component-loading')
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />

const style = {
  position: 'absolute',
  right: '20px',
  top: '20px',
}

// 全局的 loading 主要是配合 React.lazy React.Suspense fallback 使用。
// React16.0中发布了很多新特性，我们来看portal,React提供了一个顶级API—portal，用来将子节点渲染到父节点之外的dom节点
const Loading = () => {
  return ReactDOM.createPortal(<Spin indicator={antIcon} style={style}/>, loadingRoot)
}

export default Loading
