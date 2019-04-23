import { lazy } from 'react'
import Layout from '@/components/admin/layout'
import PageNotFound from '@/components/NotFound'

import Home from './home'

const Login = lazy(() => import('./login'))

export default {
  path: 'admin',
  name: 'home',
  component: Layout,
  childRoutes: [
    { path: '', component: Home, name: '首页', icon: 'home' },
    { path: 'login', component: Login },
    { path: '*', component: PageNotFound }
  ]
}
