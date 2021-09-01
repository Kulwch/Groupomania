import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'

const routes =[
    {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/signoff',
    name: 'Signoff',
    component: () => import('../views/Signoff.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
      path: '/gifs',
      name: 'Gifs',
      component: () => import('../views/Gifs.vue'),
      props:true,
        meta: {
            title: 'Gifs',
            requiresAuth: true,
        },
  },
  {
    path: '/admin/',
    name: 'Admin',
    component: () => import('../views/Admin.vue')
  }
    ]

const router = createRouter({
    history: createWebHistory(),
    routes 
})

export default router