import { InjectionKey } from "vue";

type AddPrefix<Prefix, Keys> = `${Prefix & string}/${Keys & string}`;

type GetGetters<Module> = Module extends { getters: infer M } ? M : never;
type GetMutations<Module> = Module extends { mutations: infer M } ? M : never;
type GetActions<Module> = Module extends { actions: infer M } ? M : never;

type GetterKeys<Module, Key> = AddPrefix<Key, keyof GetGetters<Module>>;
type MutationKeys<Module, Key> = AddPrefix<Key, keyof GetMutations<Module>>;
type ActionKeys<Module, Key> = AddPrefix<Key, keyof GetActions<Module>>;

type Action<Modules> = {
  [K in keyof Modules]: ActionKeys<Modules[K], K>;
}[keyof Modules];
type Mutation<Modules> = {
  [K in keyof Modules]: MutationKeys<Modules[K], K>;
}[keyof Modules];
export type Getter<Modules> = {
  [K in keyof Modules]: GetterKeys<Modules[K], K>;
}[keyof Modules];

export type $Store<Modules> = {
  getters: {
    [key in Getter<Modules>]: never;
  };
  dispatch<T>(action: Action<Modules>, payload?: T): Promise<never>;
  commit<T>(mutations: Mutation<Modules>, payload?: T): void;
  install: () => void;
};
export type VuexOptions<Modules> = {
  modules: Modules;
};

declare module "vuex/types/index" {
  export function createStore<S>(options: VuexOptions<S>): $Store<S>;

  export function useStore<S>(
    injectKey?: InjectionKey<$Store<S>> | string
  ): $Store<S>;
}
