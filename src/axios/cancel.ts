import Axios, { AxiosRequestConfig, Canceler } from "axios";

export let cancelMap = new Map<string, Canceler>();
export class AxiosCanceler {
  getPendingUrl({ method, url }: AxiosRequestConfig): string {
    return [method, url].join("&");
  }
  add(config: AxiosRequestConfig) {
    this.remove(config);
    const url = this.getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new Axios.CancelToken(cancel => {
        if (!cancelMap.has(url)) {
          cancelMap.set(url, cancel);
        }
      });
  }
  remove(config: AxiosRequestConfig) {
    const url = this.getPendingUrl(config);
    if (cancelMap.has(url)) {
      const cancel = cancelMap.get(url);
      cancel && cancel();
      cancelMap.delete(url);
    }
  }
  removeAll() {
    cancelMap.forEach(cancel => cancel && cancel());
    cancelMap.clear();
  }
  reset() {
    cancelMap = new Map<string, Canceler>();
  }
}
