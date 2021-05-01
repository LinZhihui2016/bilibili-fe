import { $$ } from "@/axios";
import { Order } from "@/utils";

export interface UpLogSql {
  updated?: string
  created?: string
  id?: number
  up_id: number
  date: number
  follower: number,
  archive: number,
  likes: number,
}

export interface UpSql {
  name: string,
  sign: string,
  face: string,
  mid: number,
  follower: number,
  archive: number,
  likes: number,
  id?: number
  updated?: string
  created?: string
  isFans?: number
  fans_time?:string
}
export type UpList = Type.ListApi<UpSql>

export const apiUpInfo = (bv: string) => $$('/up/info', { bv })
export const apiUpFansList = (page: number, pageSize: number) => $$<Type.Res<UpList>>('/up/fansList', {
  pageSize,
  page
})

export const apiUpList = (page: number, pageSize: number, sort?: string, orderby?: Order) => $$<Type.Res<UpList>>('/up/list', {
  page, pageSize, sort, orderby
})

export const apiUpFans = (id: number, status: number) => $$('/up/fans', { id, status }, { method: "POST", msg: true })

