declare namespace Type {
  export interface Obj<T = any> {
    [key: string]: T;
  }

  export interface Err {
    err: string,
    msg: string
  }

  export type Res<S = Obj> = {
    timestamp: Alias.Timestamp;
    data: S;
    end: string;
    start: string;
    time: string
    status: boolean
    err: string
    msg: string
  }

  export type PromiseRes<S = Obj> = Promise<Res<S>>;

  export type ListApi<T, S = {}> = {
    totalPage: number;
    total: number;
    list: T[];
  } & S;
}

declare namespace Alias {
  export type Price = number;
  export type Json = string;
  export type Timestamp = number;
  export type ID = string | number;
  export type Url = string;
  export type Status = number;
  export type Image = string;
  export type HTML = string;
  export type Query = Type.Obj<string>;
  export type Timer = NodeJS.Timeout;
  export type Style = Partial<CSSStyleDeclaration>;
  export type Empty = {};
  export type UnknownStr = "";
}

interface ImportMetaEnv {
  VITE_PORT: string;
  VITE_TITLE: string;
  VITE_API: string;
  VITE_ICON: string;
  VITE_STORAGE: string;
}

