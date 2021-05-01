import { ElLoading, ElMessage, ElNotification } from "element-plus";
import qs from "qs";
import { decimal } from "./format";

export const setTitle = (title: string) => {
  if (title) {
    document.title = import.meta.env.VITE_TITLE + title;
  }
};
export const $success = (message = "操作成功") =>
    ElNotification({
      title: "提示",
      message,
      type: "success",
      duration: 1000
    });
export const $fail = (message: string) =>
    ElNotification({
      title: "提示",
      message: message || "发生了错误，请联系技术人员",
      type: "warning"
    });

export const $loading = (
    options?:
        | {
      forbidClick?: boolean;
      delay?: number;
    }
        | true
) => {
  const _opt =
      options === true
          ? {
            forbidClick: false,
            delay: 0
          }
          : options;
  const delay = _opt ? (_opt.delay === undefined ? 300 : _opt.delay) : 300;
  const loading = ElLoading.service({
    body: true,
    fullscreen: true,
    lock: true,
    text: "加载中",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.7)"
  });
  const close = () => {
    setTimeout(loading.close, delay);
  };
  return {
    loading,
    close
  };
};

export const isArr = <T = unknown>(t: T | T[]) => (Array.isArray(t) ? t : [t]);

//动态计算条目的index
export const calIndex = (page: number, index: number, pageSize = 20) =>
    (page - 1) * pageSize + 1 + index;

//是否是空对象
export const emptyObj = (obj: Type.Obj<unknown>) => !!Object.keys(obj).length;

//默认是true
export const defaultTrue = (is?: boolean) => (is === undefined ? true : is);

//默认是false
export const defaultFalse = (is?: boolean) => (is === undefined ? false : is);

// export const $notify = (message: string) =>
//   Notify({ type: "danger", message: message, duration: 3000 });

//复制
export const copyBoard = (value: string, shouldMsg = true) => {
  const el = document.createElement("input");
  el.value = value;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  shouldMsg &&
  ElMessage.success({
    message: "复制成功",
    type: "success",
    duration: 1000
  });
};
//打开新页面
export const $open = (url: string, isBlank = 1) => {
  const newWindow = window.open(url);
  if (isBlank && newWindow) {
    newWindow.opener = null;
  }
  return newWindow;
};


//驼峰
export const upper: (i: string) => string = i =>
    i[0].toUpperCase() + i.slice(1);
export const CamelCase = (strings: string[], type: "T" | "t" = "t") =>
    strings.map((i, j) => (type === "T" ? upper(i) : j ? upper(i) : i)).join("");

export const getQuery = () => {
  const search = location.hash.split("?");
  if (search.length === 2) {
    return qs.parse(search[1]);
  } else {
    return {};
  }
};


export const jsonParse = (json: string) => {
  try {
    return JSON.parse(json);
  } catch (e) {
    return { json };
  }
};

export const enumTrans = ($enum: Record<string | number, string | number>) => {
  const tar: Record<string | number, string | number> = {};
  Object.keys($enum)
      .filter(k => !isNaN(+k))
      .forEach(i => {
        tar[i + ""] = $enum[i];
      });
  return tar;
};

export const uniqueArr = <T>(t: T[]): T[] => Array.from(new Set(t));
export const average = (arr: number[]) =>
    decimal(arr.reduce((a, b) => a + b, 0) / arr.length, 2);

export enum Order {
  descending = "DESC",
  ascending = 'ASC'
}

