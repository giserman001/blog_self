import { asyncComponent } from '@/components/helper/lazyLoad'

const Login = asyncComponent(() => import('@/views/admin/login'))

export default {
    path: '',
    childRoutes: [{
        path:'login',
        component: Login
    }]
}