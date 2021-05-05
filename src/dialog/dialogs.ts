export interface DialogConfig {
  component: () => Promise<typeof import("*.vue")>,
  width?: string | number,
  height?: string | number,
  title: string
}

export type MixinConfig = Partial<Omit<DialogConfig, 'component'>>
export const dialogs: Type.Obj<DialogConfig> = {
  fansUpList: {
    component: () => import("@/dialog/dialog/FansUpList.vue"),
    width: 1000,
    title: '关注up主列表'
  },
  upList: {
    component: () => import("@/dialog/dialog/UpList.vue"),
    width: 1000,
    title: 'up主列表'
  },
  fansVideoList: {
    component: () => import("@/dialog/dialog/FansVideoList.vue"),
    width: 1260,
    title: '关注视频列表'
  },
  videoList: {
    component: () => import("@/dialog/dialog/VideoList.vue"),
    width: 1160,
    title: '视频列表'
  },
}