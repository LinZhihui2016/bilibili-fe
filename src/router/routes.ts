import { RouteRecordRaw } from "vue-router";

export interface $RouteMeta {
  noLogin?: boolean;
  hideLayout?: boolean;
  title?: string;
  PRoute?: string;
}

declare module "vue-router" {
  interface RouteMeta extends $RouteMeta {
  }
}

export interface AsideItem {
  index: string;
  title: string;
  icon?: string;
  routes?: AsideItem[];
}


export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@pages/home/Index.vue"),
    name: "home",
    meta: {
      title: "首页"
    }
  },
];
