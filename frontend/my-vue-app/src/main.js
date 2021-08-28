import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
    path: '/',
    name: 'Home',
    component: () => import('./views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('./views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('./views/Signup.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('./views/Profile.vue')
  },
  {
    path: '/admin/',
    name: 'Admin',
    component: () => import('./views/Admin.vue')
  }
    ]
})




import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

createApp(App)
.use(router)
.mount('#app')
