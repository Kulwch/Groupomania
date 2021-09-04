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
    path: '/logout',
    name: 'Logout',
    component: () => import('../views/Logout.vue')
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
  },
  {
    path: '/allComments',
      name: 'AllComments',
      component: () => import('../views/Comments.vue'),
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