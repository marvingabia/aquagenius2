import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Reports from '../views/Reports.vue';
import Settings from '../views/Settings.vue';
import Scheduler from '../views/Scheduler.vue';
import Login from '../views/Login.vue';

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/reports', name: 'Reports', component: Reports },
  { path: '/settings', name: 'Settings', component: Settings },
  { path: '/scheduler', name: 'Scheduler', component: Scheduler },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;