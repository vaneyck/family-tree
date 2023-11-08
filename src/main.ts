import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "@/router";

const vueApp = createApp(App);
vueApp.use(store);
vueApp.use(router);
vueApp.mount("#app");
