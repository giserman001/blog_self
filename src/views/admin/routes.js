import { lazy } from 'react'
import Layout from '@/components/admin/layout'
import PageNotFound from '@/components/NotFound'



import Home from './home'
const UserManage = lazy(() => import('./user'))

export default {
  path: 'admin',
  component: Layout,
  childRoutes: [
    { path: '', component: Home, name: '首页', icon: 'home' },
    { path: 'UserManage', component: UserManage, name: '用户管理', icon: 'user'},
    { path: '*', component: PageNotFound }
  ]
}
