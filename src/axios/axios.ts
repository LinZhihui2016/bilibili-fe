import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { AxiosCanceler } from "@/axios/cancel";
import { store } from "@/store";

export type Interceptor<S = any, T = void> = (res: AxiosResponse<S>) => T;

export interface Interceptors<Res> {
  checkResponse?: Interceptor<Res, boolean>;
  isFail?: Interceptor<Res, boolean>;
  failMsg?: Interceptor<Res, string>;
}

export type AlertFn = (msg: string) => unknown;

export default class VueAxios<Res, LoadingOpt> {
  private axiosInstance: AxiosInstance;
  private readonly options: AxiosRequestConfig;
  axiosCanceler: AxiosCanceler;
  checkResponse: Interceptor<Res, boolean>; //从返回体里检查请求
  isFail: Interceptor<Res, boolean>; //从返回体里检查错误条件
  failMsg: Interceptor<Res, string>; //从返回体里获取错误信息

  constructor(
      options: AxiosRequestConfig,
      interceptors: Interceptors<Res>,
      public Loading?: LoadingConstructor<LoadingOpt>,
      public alert?: AlertFn,
      public updateQuery?: (query: { [key: string]: string }) => void
  ) {
    this.options = options;
    this.axiosInstance = Axios.create({ ...options });
    this.axiosCanceler = new AxiosCanceler();
    this.checkResponse = interceptors.checkResponse || (() => false);
    this.isFail = interceptors.isFail || (() => false);
    this.failMsg = interceptors.failMsg || (() => "");
    this.setupAxiosHooks();
  }

  setupAxiosHooks() {
    this.axiosInstance.interceptors.request.use(req => {
      this.axiosCanceler.add(req);
      return req;
    });
    this.axiosInstance.interceptors.response.use(
        (res: AxiosResponse<Res>) => {
          this.axiosCanceler.remove(res.config);
          return res;
        },
        (error: AxiosError) => {
          if (Axios.isCancel(error)) {
            //
          }
          return Promise.reject(error);
        }
    );
  }


  request = <T extends Res>(
      url: string,
      data?: { [key: string]: string | number | undefined },
      opt?: RequestOptions<T, LoadingOpt>
  ) => {
    const {
      loading: loadingOpt,
      method = "get",
      msg = false,
      updateQuery = []
    } = opt || {};

    const loadingInstance =
        loadingOpt && this.Loading
            ? new this.Loading(loadingOpt)
            : {
              close: (fn: CallableFunction) => fn(), run: () => {
              }
            };
    store.commit("Config/setLoading", true);
    return new Promise<T>((resolve, reject) => {
      loadingInstance.run();
      this.axiosInstance
          .request({
            url,
            method,
            params: method === "get" ? data : {},
            data: method !== "get" ? data : {}
          })
          .then(
              res => {
                if (this.checkResponse(res)) return;
                const errmsg = this.failMsg(res);
                if (msg && this.isFail(res) && errmsg) {
                  this.alert && this.alert(errmsg);
                }
                loadingInstance.close(() => resolve(res.data));
                if (this.updateQuery && data) {
                  const query: { [key: string]: string } = {};
                  updateQuery.forEach(i => {
                    if (
                        data[i] === undefined ||
                        data[i] === null ||
                        data[i] === ""
                    ) {
                      query[i] = "";
                    } else {
                      query[i] = data[i] + "";
                    }
                  });
                  this.updateQuery(query);
                }
              },
              () => {
              }
          )
          .catch(reject)
          .finally(() => {
            store.commit("Config/setLoading", false);
          });
    });
  };
}
