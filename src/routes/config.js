import homeRoutes from '@/views/web/routes'
import examplesRoute from '@/examples/routes'
import adminRoutes from '@/views/admin/routes'
import rootRoutes from './rootRoutes'

const childRoutes = [
  rootRoutes,
  adminRoutes,
  homeRoutes
]
const isDev = process.env.NODE_ENV === 'development'
if (isDev) childRoutes.unshift(examplesRoute)
const routes = [
  ...childRoutes.filter(r => r.component || (r.childRoutes && r.childRoutes.length > 0))
]
/**
 * 过滤路由信息，路由信息中含有 isIndex 的在渲染
 *
 * @param {Object} route - 路由对象信息
 */

function handleIndexRoute(route) {
  if (!route.childRoutes || ! route.childRoutes.length) return
  // find() 返回符合测试条件的第一个数组元素值，如果没有符合条件的则返回 undefined。
  const indexRoute = route.childRoutes.find(child => child.isIndex)
  if (indexRoute) {
    const first = { ...indexRoute }
    first.path = ''
    first.exact = true
    first.autoIndexRoute = true // mark it so that the simple nav won't show it.
    route.childRoutes.unshift(first)
  }
  route.childRoutes.forEach(handleIndexRoute)
}

routes.forEach(handleIndexRoute)

export default routes