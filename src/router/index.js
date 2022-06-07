import Vue from 'vue'
import VueRouter from 'vue-router'
//import forget from '../components/forget.vue'

// 懒加载
const login = () => import('../components/Login')
const forget = () => import('../components/forget')
const home = () => import('../components/Home')
const salaryManage1 = () => import('../components/salaryManage1')
const salaryManage2 = () => import('../components/salaryManage2')
const salaryManage3 = () => import('../components/salaryManage3')
const salaryManage4 = () => import('../components/salaryManage4')
const salaryManage5 = () => import('../components/salaryManage5')
const blockManage1 = () => import('../components/blockManage1')
const blockManage2 = () => import('../components/blockManage2')
const blockManage3 = () => import('../components/blockManage3')
const messageManage1 = () => import('../components/messageManage1')
const messageManage2 = () => import('../components/messageManage2')
const messageManage3 = () => import('../components/messageManage3')
const test = () => import('../components/test/test')
Vue.use(VueRouter)

export default new VueRouter({
  routes: [{
      path: '/',
      component: login
    },
    {
      path: '/forget',
      name: forget,
      component: forget
    },
    {

      path: '/home',
      name: home,
      component: home,
      children: [{
          path: '/home/salaryManage1',
          name: salaryManage1,
          component: salaryManage1
        },
        {
          path: '/home/salaryManage2',
          name: salaryManage2,
          component: salaryManage2
        },
        {
          path: '/home/salaryManage3',
          name: salaryManage3,
          component: salaryManage3
        },
        {
          path: '/home/salaryManage4',
          name: salaryManage4,
          component: salaryManage4
        },
        {
          path: '/home/salaryManage5',
          name: salaryManage5,
          component: salaryManage5
        },
        {
          path: '/test',
          name: test,
          component: test
        },

        {
          path: '/home/messageManage1',
          name: messageManage1,
          component: messageManage1
        },
        {
          path: '/home/messageManage2',
          name: messageManage2,
          component: messageManage2
        },
        {
          path: '/home/messageManage3',
          name: messageManage3,
          component: messageManage3
        },

        {
          path: '/home/blockManage1',
          name: blockManage1,
          component: blockManage1
        },
        {
          path: '/home/blockManage2',
          name: blockManage2,
          component: blockManage2
        },
        {
          path: '/home/blockManage3',
          name: blockManage3,
          component: blockManage3
        }
      ]

    }
  ],
  mode: 'history'
})
