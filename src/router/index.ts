import { createRouter,createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      component: import('../views/login/index.vue')
    },
    {
      path: '/dataClient',
      component: import('../views/dataClient/index.vue')
    },
    {
      path: '/home',
      component: import('../views/home/index.vue'),
      children:[
        {
          path: '',
          redirect: '/home/welcome'
        },
        {
          path: 'welcome',
          component: import('../views/welcome/index.vue')
        },
        {
          path: 'echarts',
          component: import('../views/echarts/index.vue')
        },
        {
          path: 'table',
          component: import('../views/table/index.vue')
        },
        {
          path: 'about',
          component: import('../views/about/index.vue')
        }
      ]
    }
  ]
})