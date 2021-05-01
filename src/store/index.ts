import { App, computed, InjectionKey } from "vue";
import { createStore, useStore as _useStore } from "vuex";
import { Getter } from "./type";
import { Config } from "@/store/modules/Config";

const modules = { Config };
export const store = createStore({ modules });
export const storeKey: InjectionKey<typeof store> = Symbol();
export const setupStore = (app: App<Element>) => app.use(store, storeKey);
export const useStore = () => _useStore(storeKey);
export const useGetter = <T>(key: Getter<typeof modules>) =>
    computed<T>(() => useStore().getters[key]);
export const $commit = store.commit;
export const $dispatch = store.dispatch;

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: typeof store;
  }
}
