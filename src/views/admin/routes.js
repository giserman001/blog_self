import { lazy } from 'react'
import { asyncComponent } from '@/components/helper/lazyLoad'
import Layout from '@/components/admin/layout'
import PageNotFound from '@/components/NotFound'



import Home from './home'
// import Edit from './article/edit'
const UserManage = lazy(() => import('./user'))
// const Edit = lazy(() => import('./article/edit'))
const Edit = asyncComponent(() => import('./article/edit'))

export default {
  path: 'admin',
  component: Layout,
  childRoutes: [
    // 注意这里的顺序 tips: { path: '*', component: PageNotFound }一定要放到最后面
    { path: '', component: Home, name: '首页', icon: 'home' },
    { path: 'UserManage', component: UserManage, name: '用户管理', icon: 'user'},
    {
      path: 'articles',
      icon: 'edit',
      name: '文章管理',
      childRoutes: [
        {path: 'edit', icon: 'edit', name: '新增文章', component: Edit}
      ]
    },
    { path: '*', component: PageNotFound }
  ]
}
