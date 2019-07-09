import lazy, { asyncComponent, lazyLoad } from '@/components/helper/lazyLoad'
import Layout from '@/components/admin/layout'
import PageNotFound from '@/components/NotFound'



import Home from './home'
const UserManage = lazy(() => import('./user'))
const Edit = asyncComponent(() => import('./article/edit'))
const Manager = lazyLoad(() => import('./article/manage'))

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
        {path: 'edit', icon: 'edit', name: '新增文章', component: Edit},
        {path: 'manage', icon: 'folder', name: '管理文章', component: Manager}
      ]
    },
    { path: '*', component: PageNotFound }
  ]
}
