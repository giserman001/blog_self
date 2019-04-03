import React, { Component, lazy } from 'react'
import Lazy, { asyncComponent, lazyLoad } from '@/components/helper/lazyLoad'

// 1.react提供的 code-split 利用react.lazy 配合 react.Suspense实现
const ReactLazyDemo = lazy(() => import('./demo'))
// 2.配合webpack import实现组件code-split
const WebpackDemo = asyncComponent(() => import('./demo'))
// 3.配合react-loadable实现组件code-split
const ReactLoadableDemo = lazyLoad(() => import('./demo'))

@Lazy
class CodeSplitting extends Component {
  render() {
    return (
      <div>
        <h1>CodeSplitting</h1>
        <WebpackDemo />
        <br />
        <ReactLazyDemo />
        <br/>
        <ReactLoadableDemo />
      </div>
    )
  }
}

export default CodeSplitting