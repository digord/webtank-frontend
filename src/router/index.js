import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import WebTank from '@/components/WebTank'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Hello
    },
    {
      path: '/webtank',
      component: WebTank
    }
  ]
})
