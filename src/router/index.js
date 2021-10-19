import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import AddProperty from '@/components/CreateProperty'
import Property from '@/components/Detail'
import Contacts from '@/components/ContactsList'
import PageNotFound from '@/components/PageNotFound'
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
      path: '/contacts',
      name: 'ContactsList',
      component: Contacts
    },
    {
      path: '/admin',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/404',
      name: 'PageNotFound',
      component: PageNotFound
    },
    // Admin Dashboard
    {
      path: '/admin/main',
      name: 'AdminPanel',
      component: AdminPanel
    }
  ],
  mode: 'history'
})
