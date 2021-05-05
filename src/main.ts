import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "@css/element.theme.scss";
// import "element-plus/lib/theme-chalk/index.css";
import "@css/common.scss";
import { setupIcon } from "@utils/icon";
import { setupStore } from "@/store";
// 设置语言
import locale from "element-plus/lib/locale/lang/zh-cn";
import { setupDialog } from "@/dialog";

const app = createApp(App);
const init = () => {
  app.use(ElementPlus, { locale, zIndex: 7000 });
  setupStore(app);
  setupDialog(app)
  setupIcon();
  app.mount("#app");
};
init();

