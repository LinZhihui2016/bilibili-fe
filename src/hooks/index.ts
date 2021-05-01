import {
  computed,
  ComputedRef,
  Ref,
  ref,
  toRef,
  UnwrapRef,
  WritableComputedRef
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { router } from "@/router";
import { $RouteMeta } from "@/router/routes";

export const useFlag = (
  v = false
): [Ref<UnwrapRef<boolean>>, () => boolean, (v?: boolean) => boolean] => {
  const flag = ref(v);
  const toggle = () => (flag.value = !flag.value);
  const set = (v = false) => (flag.value = v);
  return [flag, toggle, set];
};
type Use<T> = (init: T) => [Ref<T>, (v: T) => T];

export const useState = <T extends object>(
  init: T
): [[T] extends [Ref] ? T : Ref<UnwrapRef<T>>, (v: T) => T] => {
  const state = ref<T>(init);
  const setState = (v: T) => (state.value = v);
  return [state, setState];
};
export const useNumber: Use<number> = (init = 0) => {
  const state = ref(init);
  const setState = (v: number) => (state.value = v);
  return [state, setState];
};
export const useString: Use<string> = (init = "") => {
  const state = ref(init);
  const setState = (v: string) => (state.value = v);
  return [state, setState];
};
export const useObj = () => useState<Type.Obj<string>>({});

export const useQuery = (key: string): ComputedRef<string> => {
  const route = useRoute();
  return computed(() => (route.query[key] as string) || "");
};
export const useInitByQuery = (key: string, init = "") => {
  const route = useRoute();
  return useString((route.query[key] as string) || init);
};

export const useQueries = () => {
  const route = useRoute();
  return computed(() => route.query as Type.Obj<string>);
};

export const usePush = () => {
  const router = useRouter();
  return (name: string, query: Type.Obj<string | number> = {}) =>
    router.push({ name, query });
};

export const useReplace = (cover = true) => {
  const oldQ = useQueries();
  return (query: Type.Obj<string | undefined> = {}) => {
    const q = cover ? query : { ...oldQ.value, ...query };
    return router.replace({ query: q });
  };
};

export const useModel = <T>(
  get: () => T,
  set: (v: T) => void
): [WritableComputedRef<T>, (v: T) => T] => {
  const model = computed<T>({ get, set });
  const setModel = (v: T) => (model.value = v);
  return [model, setModel];
};

export const useMeta = <T extends keyof $RouteMeta>(
  key: T
): ComputedRef<$RouteMeta[T]> => {
  const route = useRoute();
  return computed(() => route.meta[key]);
};

export const useRouteName = () => toRef(useRoute(), "name") as Ref<string>;
export type DateRange = [Date, Date] | null;
export const useDateRange = (
  init: DateRange = null,
  format?: (e: DateRange, index: number) => string
) => {
  const queryStart = useQuery("start");
  const queryEnd = useQuery("end");
  const dateRange = ref<DateRange>(null);
  if (queryStart.value && queryEnd.value) {
    dateRange.value = [
      new Date(+queryStart.value * 1000),
      new Date(+queryEnd.value * 1000)
    ];
  } else {
    dateRange.value = init;
  }
  const dateHelper = (v: DateRange, index: 0 | 1) =>
    v ? v[index].getTime() / 1000 + "" : undefined;

  const _format = format || dateHelper;
  const start = computed(() => _format(dateRange.value, 0));
  const end = computed(() => _format(dateRange.value, 1));
  return { dateRange, start, end };
};
