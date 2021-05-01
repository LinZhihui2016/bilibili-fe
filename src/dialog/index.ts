import { App, defineAsyncComponent, Ref, ref } from "vue";
import { DialogConfig, dialogs, MixinConfig } from "@/dialog/dialogs";
import qs from "qs";

export class Dialog {
  show = false
  id: number
  static ID = 0

  constructor(public name: string, public query: string, public config: DialogConfig) {
    Dialog.ID++
    this.id = Dialog.ID
    if (this.config.width){
      this.config.width = this.config.width > 0 ? this.config.width : 400
    } else {
      this.config.width = 400;
    }
    if (this.config.height){
      this.config.height = this.config.height > 0 ? this.config.height : 'auto'
    } else {
      this.config.height = 'auto';
    }
    this.show = true
  }

  get title() {
    return this.config.title
  }

  get key() {
    return this.name + '?' + this.query
  }
}

export class DialogContainer {
  storage: Ref<Dialog[]>
  registerMap: Map<string, boolean> = new Map()
  app?: App
  topId: Ref<number>
  static IS_REG = {
    DialogContainer: false,
    DialogFooter: false,
    DialogItem: false
  }

  constructor(public dialogs: Type.Obj<DialogConfig>, public max: number = 10) {
    this.storage = ref<Dialog[]>([])
    this.topId = ref(0)
  }

  install(app: App) {
    this.app = app
    !DialogContainer.IS_REG.DialogContainer && app.component('DialogContainer', defineAsyncComponent(() => import('@/dialog/components/DialogContainer.vue')))
    DialogContainer.IS_REG.DialogContainer = true
    !DialogContainer.IS_REG.DialogContainer && app.component('DialogFooter', defineAsyncComponent(() => import('@/dialog/components/DialogManage.vue')))
    DialogContainer.IS_REG.DialogContainer = true
    !DialogContainer.IS_REG.DialogFooter && app.component('DialogItem', defineAsyncComponent(() => import('@/dialog/components/DialogItem.vue')))
    DialogContainer.IS_REG.DialogFooter = true
  }

  err(msg: string) {
    return [new Error(msg), null]
  }

  push(name: string, $query?: Type.Obj, config?: MixinConfig) {
    if (this.storage.value.length >= this.max) return this.err('已经达到最大数量：' + this.max)
    if (!this.app) return this.err('未注册app')
    const dialog = this.dialogs[name]
    if (!dialog) return this.err('未注册的窗口')
    if (!this.registerMap.get(name)) {
      this.app.component('Dialog' + name[0].toUpperCase() + name.slice(1), defineAsyncComponent(dialog.component))
      this.registerMap.set(name, true)
    }
    const query = qs.stringify($query)
    const key = name + '?' + query
    const finder = this.storage.value.find(i => i.key === key)
    if (finder) {
      finder.show = true
      this.topId.value = finder.id
    } else {
      const dialogInstance = new Dialog(name, query, { ...dialog, ...config })
      this.storage.value.push(dialogInstance)
      this.topId.value = dialogInstance.id
    }
  }

  toggle(id: number, status = false) {
    const finder = this.storage.value.find(i => i.id === id)
    if (finder) {
      finder.show = status
      if (finder.show) {
        this.topId.value = finder.id
      } else {
        const ids = this.storage.value.filter(i => i.show).map(i => i.id)
        this.topId.value = Math.max(...ids)
      }
    }
  }

  close(id: number) {
    const index = this.storage.value.findIndex(i => i.id === id)
    if (index >= 0) {
      this.storage.value.splice(index, 1)
      const ids = this.storage.value.filter(i => i.show).map(i => i.id)
      this.topId.value = Math.max(...ids)
    }
  }

  top(id: number) {
    this.topId.value = id
  }
}

export const $dialog = new DialogContainer(dialogs)
export const setupDialog = (app: App<Element>) => app.use($dialog);
