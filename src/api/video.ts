import { $$ } from "@/axios";
import { Order } from "@/utils";


export interface VideoSqlBase {
  bvid: string,
  isFans?: number
  fans_time?: string
}

export interface VideoSqlBase_ extends VideoSqlBase {
  aid: number,
  title: string,
  pic: string,
  view: number,
  danmaku: number
  reply: number,
  coin: number,
  like: number
  up_mid: number,
  up_name: string
  updated?: string
  created?: string
  isFans?: number
}

export interface NormalVideoSql extends VideoSqlBase_ {
  type: 'normal',
  favorite: number,
  share: number,
  pubdate: number
  desc: string
}

export interface BangumiVideoSql extends VideoSqlBase_ {
  type: 'bangumi',
  epId: number //bangumi
}

export interface DeletedVideoSql extends VideoSqlBase {
  type: 'deleted',
}

export type VideoSql = NormalVideoSql | BangumiVideoSql | DeletedVideoSql

export interface RankSql {
  updated?: string
  created?: string
  id?: number
  rid: number
  date: string
  list: string
  ups: string
}


export interface VideoLogSql {
  updated?: string
  created?: string
  id?: number
  view: number,
  danmaku: number
  reply: number,
  coin: number,
  like: number
  video_id: number
  date: number
}

export type VideoList = Type.ListApi<VideoSql>


export const apiVideoInfo = (bv: string) => $$('/video/info', { bv })
export const apiVideoFansList = (page: number, pageSize: number) => $$<Type.Res<Type.ListApi<VideoSql>>>('/video/fansList', {
  pageSize,
  page
})


export const apiVideoList = (page: number, pageSize: number, sort?: string, orderby?: Order) => $$<Type.Res<VideoList>>('/video/list', {
  page, pageSize, sort, orderby
})

export const apiVideoFans = (id: number, status: number) => $$('/video/fans', { id, status }, {
  method: "POST",
  msg: true
})

