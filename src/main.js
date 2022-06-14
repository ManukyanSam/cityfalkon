import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vClickOutside from "click-outside-vue3";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueAxios from "vue-axios";
import axiosInstance from "@/plugins/axios";
import "@/plugins/fontAwesomeLibrary";

const app = createApp(App);

app.use(store);
app.use(router);
app.use(vClickOutside);
app.use(VueAxios, axiosInstance);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
