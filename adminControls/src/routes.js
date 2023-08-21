import Home from '@/views/Login.vue';
import Library from '@/views/Library.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/library', component: Library, name: 'library' },
  // Define more routes as needed
];

export default routes;