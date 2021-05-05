import { $$ } from "@/axios";
import { VideoSql } from "@/api/video";

export const apiRankEnum = () => $$<Type.Res<Type.Obj<string>>>('/rank/rid')
export const apiRankPaging = (rid: string, date: string) => $$<Type.Res<VideoSql[]>>('/rank/paging', { rid, date })

export interface RatioItem {
  value: number
  name: string
}

export const apiRankRatio = (date: string) => $$<Type.Res<RatioItem[]>>('/rank/ratio', { date })

export interface RatioInWeekItem {
  date: string,
  value: number
}

export const apiRankRationInWeek = () => $$<Type.Res<Type.Obj<RatioInWeekItem[]>>>('/rank/RatioInWeek')