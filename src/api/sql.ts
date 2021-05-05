import { $$ } from "@/axios";

export interface SqlCount {
  up: { total: number, fans: number, fansMax: number, update: number },
  video: { total: number, fans: number, fansMax: number, update: number },
  rank: { date: number },
  date: string
}

export const apiCount = () => $$<Type.Res<SqlCount>>('/sql/count')
export const apiCreatedInWeek = () => $$<Type.Res<{ date: string, up: number, video: number }[]>>('/sql/CreatedInWeek')