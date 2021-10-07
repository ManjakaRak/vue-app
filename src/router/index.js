import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import AddProperty from '@/components/CreateProperty'
import Property from '@/components/Detail'

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
    }
  ],
  mode: 'history'
})
