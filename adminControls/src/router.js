import { createRouter, createWebHistory } from 'vue-router';
import Login from './views/Login.vue';
import Library from './views/Library.vue';

const routes = [
  { path: '/login', component: Login },
  { path: '/library', component: Library },
  // Define more routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
