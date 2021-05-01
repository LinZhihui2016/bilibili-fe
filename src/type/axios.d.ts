import { Method } from "axios";

export interface RequestOptions<T> {
  method?: Method;
  loading?:
    | {
        forbidClick?: boolean;
        delay?: number;
      }
    | true;
  msg?: boolean;
  cache?: boolean | string;
  cacheBy?: "localStorage" | "sessionStorage" | "memory";
  cacheCtrl?: (value: { v: T; t: number }, clearCache: () => void) => void;
}
