import { Interceptors } from "@/axios/axios";
import { ILoadingInstance, ILoadingOptions } from "element-plus/es/el-loading/src/loading.type";
import { ElLoading } from "element-plus";

export const interceptors: Interceptors<Type.Res<any>> = {
  isFail: res => !!res.data.err,
  failMsg: res => res.data.msg,
  checkResponse: () => false
};
export type AxiosLoadingOpt = ILoadingOptions & { delay?: number };

export class AxiosLoading {
  options: AxiosLoadingOpt;
  delay: number;
  loading?: ILoadingInstance;

  constructor(options: AxiosLoadingOpt = {}) {
    this.options = options === true ? {} : options;
    this.delay = options.delay || 100;
  }

  run() {
    this.loading = ElLoading.service({
      body: true,
      fullscreen: true,
      lock: true,
      text: "加载中",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)"
    });
  }

  close(fn?: Function | undefined): void {
    setTimeout(() => {
      if (this.loading) {
        this.loading.close();
      }
      fn && fn();
    }, this.delay);
  }
}

export const idsToString = (ids: string[]) =>
    ids.length ? "[" + ids.join(",") + "]" : undefined;
