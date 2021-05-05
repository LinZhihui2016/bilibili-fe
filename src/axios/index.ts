import { AXIOS_OPTION } from "./static";
import VueAxios from "@/axios/axios";
import { AxiosLoading, interceptors } from "@/axios/helper";
import { $fail } from "@/utils";

export const vueAxios = new VueAxios(
    AXIOS_OPTION,
    interceptors,
    AxiosLoading,
    $fail,
);

export const $$ = vueAxios.request;
