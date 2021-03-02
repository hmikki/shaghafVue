import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import home from "@/views/pages/home";
import about_section from "@/components/sections/home/about_section.vue";
import carosel_section from "@/components/sections/home/carosel_section.vue";
import my_account from "@/views/pages/my_account";
import my_account_2 from "@/views/pages/my_account_2";
import serve_user from "@/views/pages/serve_user";
import user_services from "@/components/sections/serve_user/user_services";
import portfolio from "@/components/sections/serve_user/portfolio";
import our_serve from "@/views/pages/our_serve";
import add_service from "@/views/pages/add_service";
import orders from "@/views/pages/orders";
import orders_2 from "@/views/pages/orders_2";
import orders_details from "@/views/pages/orders_details";
import orders_details_2 from "@/views/pages/orders_details_2";

const routes = [
  {
    path: '/',
    name: 'shaghaf',
    component:  home, carosel_section, about_section,
  },
  {
    path: '/my_account',
    name: 'my_account',
    component:  my_account
  },
  {
    path: '/my_account_2',
    name: 'my_account_2',
    component:  my_account_2
  },
  {
    path: '/serve_user',
    name: 'serve_user',
    component:  serve_user
  },
  {
    path: '/user_services',
    name: 'user_services',
    component:  user_services
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component:  portfolio
  },
  {
    path: '/our_serve',
    name: 'our_serve',
    component:  our_serve
  },
  {
    path: '/serve_user',
    name: 'serve_user',
    component:  serve_user
  },
  {
    path: '/add_service',
    name: 'add_service',
    component:  add_service
  },
  {
    path: '/orders',
    name: 'orders',
    component:  orders
  },
  {
    path: '/orders_2',
    name: 'orders_2',
    component:  orders_2
  },
  {
    path: '/orders_details',
    name: 'orders_details',
    component:  orders_details
  },
  {
    path: '/orders_details_2',
    name: 'orders_details_2',
    component:  orders_details_2
  },
  {
    path: '/Home',
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
