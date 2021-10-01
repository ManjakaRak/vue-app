import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import CreateProperty from '@/components/CreateProperty'
import Test from '@/components/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/create-property',
      name: 'CreateProperty',
      component: CreateProperty
    }
  ]
})
