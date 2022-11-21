import { createRouter, createWebHashHistory } from "vue-router";

import CtlHome from "../views/CtlHome.vue";
import CtlAdd from "../views/CtlAdd.vue";
import CtlEdit from "../views/CtlEdit.vue";
import CtlRecipe from "../views/CtlRecipe.vue";
import CtlLogin from "../views/CtlLogin.vue";

const routes = [
  {
    path: "/",
    name: "CtlHome",
    component: CtlHome,
  },
  {
    path: "/login",
    name: "CtlLogin",
    component: CtlLogin,
  },
  {
    path: "/add",
    name: "CtlAdd",
    component: CtlAdd,
  },
  {
    path: "/edit/c/:creator/n/:name",
    name: "CtlEdit",
    component: CtlEdit,
  },
  {
    path: "/recipe/c/:creator/n/:name",
    name: "CtlRecipe",
    component: CtlRecipe,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
