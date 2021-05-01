import { AXIOS_OPTION } from "./static";
import VueAxios from "@/axios/axios";
import { AxiosLoading, interceptors } from "@/axios/helper";
import { $fail } from "@/utils";
import { router } from "@/router";

export const vueAxios = new VueAxios(
    AXIOS_OPTION,
    interceptors,
    AxiosLoading,
    $fail,
    query => {
      const cur = { ...(router.currentRoute.value.query as Type.Obj<string>) };
      Object.keys(query).forEach(k => {
        if (query[k] === "") {
          delete cur[k];
        } else {
          cur[k] = query[k];
        }
      });
      router.replace({ query: cur });
    }
);

export const $$ = vueAxios.request;
