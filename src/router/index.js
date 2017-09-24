import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/index'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: {name: 'index'}},
    {
      path: '/index',
      name: 'index',
      component: Index
    }
  ]
})
