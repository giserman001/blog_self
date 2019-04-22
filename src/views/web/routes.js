import React from 'react'
import Layout from '@/components/web/layout'
import PageNotFound from '@/components/NotFound'

import Home from './home'
const Demo = () => <span>demo</span>

export default {
  path: '/',
  name: 'home',
  component: Layout,
  childRoutes: [
    { path: '', component: Home },
    { path: 'demo', component: Demo },
    { path: '*', component: PageNotFound },
  ]
}
