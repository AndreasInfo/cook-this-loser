import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueAxios from "vue-axios";
import axios from "@/axios";

require("@/bulma/main.scss"); // originally bulma, then extended to global styles
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";

createApp(App).use(store).use(router).use(VueAxios, axios).mount("#app");
