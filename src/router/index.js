import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../views/Home.vue";
import Add from "../views/Add.vue";
import Edit from "../views/Edit.vue";
import Recipe from "../views/Recipe.vue";
import Login from "../views/Login.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/add",
    name: "Add",
    component: Add,
  },
  {
    path: "/edit/c/:creator/n/:name",
    name: "Edit",
    component: Edit,
  },
  {
    path: "/recipe/c/:creator/n/:name",
    name: "Recipe",
    component: Recipe,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
