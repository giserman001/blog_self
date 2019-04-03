import { lazy } from 'react'

import Layout from '@/components/Layout'
import WelcomePage from './index'
import FormBuilder from './FormBuilder'
import CodeSplitting from './Code-Splitting'

// 市县code-Splitting
const AuthPage = lazy(() => import('./AuthPage'))
const Demo = lazy(() => import('./Code-Splitting/demo'))

export default {
  path: 'examples',
  component: Layout,
  childRoutes: [
    { path: '', name: 'Welcome page', component: WelcomePage },
    { path: 'auth', protected: true, component: AuthPage },
    { path: 'demo', component: Demo },
    { path: 'form/:formId', component: FormBuilder },
    { path: 'code-splitting', component: CodeSplitting }
  ]
}