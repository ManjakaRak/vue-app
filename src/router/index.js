import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import AddProperty from '@/components/CreateProperty'
import Property from '@/components/Detail'
import PageNotFound from '@/components/PageNotFound'
import Thanks from '@/components/Thanks'
// Admin component
import AdminLogin from '@/components/AdminLogin'
import AdminPanel from '@/components/dashboard/AdminPanel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/add-property',
      name: 'AddProperty',
      component: AddProperty
    },
    {
      path: '/property/:id',
      name: 'Property',
      component: Property
    },
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/404',
      name: 'PageNotFound',
      component: PageNotFound
    },
    {
      path: '/thanks',
      name: 'Thanks',
      component: Thanks
    },
    // Admin Dashboard
    {
      path: '/admin',
      name: 'AdminPanel',
      component: AdminPanel
    }
  ],
  mode: 'history'
})
