type CacheBy = "localStorage" | "sessionStorage" | "memory";

type CacheCtrl<T> = (
    value: { v: T; t: number },
    clearCache: () => void
) => void;

interface RequestOptions<T, L extends { delay?: number }> {
  method?: "POST";
  loading?: L;
  updateQuery?: string[];
  msg?: boolean;
}

interface AxiosCache<T> {
  v: T;
  t: number;
}

interface LoadingConstructor<T extends { delay?: number }> {
  new(options?: T): LoadingInterface;
}

interface LoadingInterface {
  run: () => void;
  close: (fn?: CallableFunction) => void;
}
