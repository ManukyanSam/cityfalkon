import { createStore } from "vuex";

// Modules
import stories from "./modules/stories";

export default createStore({
  modules: {
    stories,
  },
});
