import { createRouter, createWebHashHistory, Router } from "vue-router";
import { App } from "vue";
import { setTitle } from "@/utils";
import { vueAxios } from "@/axios";
import { routes } from "@/router/routes";

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  strict: true,
  scrollBehavior(to, from, savePosition) {
    if (savePosition) {
      return savePosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth"
      };
    } else {
      return { top: 0 };
    }
  }
});


export const setRouterBefore = (router: Router) => {
  router.beforeEach((to, from) => {
    const title = to.meta.title as string;
    setTitle(title);
    // 取消上个路由的请求
    to.name !== from.name && vueAxios.axiosCanceler.removeAll();
    return true;
  });
};

export const setupRouter = (app: App<Element>) => {
  setRouterBefore(router);
  app.use(router);
};
