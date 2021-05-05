import { computed, Ref, ref, UnwrapRef, WritableComputedRef } from "vue";

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


export const useModel = <T>(
    get: () => T,
    set: (v: T) => void
): [WritableComputedRef<T>, (v: T) => T] => {
  const model = computed<T>({ get, set });
  const setModel = (v: T) => (model.value = v);
  return [model, setModel];
};


export type DateRange = [Date, Date] | null;
export const useDateRange = (
    init: DateRange = null,
    format?: (e: DateRange, index: number) => string
) => {
  const dateRange = ref<DateRange>(init);
  const dateHelper = (v: DateRange, index: 0 | 1) =>
      v ? v[index].getTime() / 1000 + "" : undefined;

  const _format = format || dateHelper;
  const start = computed(() => _format(dateRange.value, 0));
  const end = computed(() => _format(dateRange.value, 1));
  return { dateRange, start, end };
};
