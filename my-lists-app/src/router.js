import { createRouter, createWebHistory } from "vue-router";

import Clothes from "./views/Clothes.vue";
import Tattoos from "./views/Tattoos.vue";
import Measurements from "./views/Measurements.vue";

const routes = [
  { path: "/", redirect: "/clothes" },
  { path: "/clothes", component: Clothes },
  { path: "/tattoos", component: Tattoos },
  { path: "/measurements", component: Measurements },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
