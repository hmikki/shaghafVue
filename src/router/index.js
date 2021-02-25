import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import home from "@/views/pages/home";
import about_section from "@/components/sections/home/about_section.vue";
import carosel_section from "@/components/sections/home/carosel_section.vue";
import my_account from "@/views/pages/my_account";

const routes = [
  {
    path: '/shaghaf',
    name: 'shaghaf',
    component:  home, carosel_section, about_section,
  },
  {
    path: '/my_account',
    name: 'my_account',
    component:  my_account
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
