<template>
  <li ref="dom" :i="id" v-show="show" class="dialog-item" :style="style" :class="classList" @click.capture="onTop">
    <div class="dialog-item-title-container not-select">
      <div class="dialog-item-title">{{ config.title }}</div>
      <el-space>
        <span class="el-icon-rank icon" @click="onMouseDown"></span>
        <span class="el-icon-minus icon" @click="onHide"></span>
        <span class="el-icon-close icon" @click="onClose"></span>
      </el-space>
    </div>
    <div class="dialog-content">
      <component :is="dialogName" :query="query"></component>
    </div>
    <ul class="dialog-angle">
      <li v-for="i in 4" :key="i"></li>
    </ul>
    <div class="dialog-position" v-show="isDrag">
      x:{{ left }} y:{{ top }}
    </div>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref } from "vue";
import { DialogConfig } from "@/dialog/dialogs";
import { $dialog } from "@/dialog";
import { useFlag, useNumber, useState } from "@/hooks";

export default defineComponent({
  name: "DialogItem",
  props: {
    name: { type: String, required: true },
    query: { type: String, required: true },
    id: { type: Number, required: true },
    config: { type: Object as PropType<DialogConfig>, required: true },
    show: { type: Boolean, required: true }
  },
  setup(prop) {
    const dialogName = computed(() => 'Dialog' + prop.name[0].toUpperCase() + prop.name.slice(1))
    const isTop = computed(() => $dialog.topId.value === prop.id)
    const [isDrag, , setDrag] = useFlag()
    const [left, setLeft] = useNumber(0)
    const [top, setTop] = useNumber(0)
    const [start, setStart] = useState({ x: 0, y: 0, left: 0, top: 0 })
    const dom = ref<HTMLLIElement>()
    onMounted(() => {
      const li = dom.value!
      const { offsetLeft, offsetTop } = li
      setLeft(offsetLeft)
      setTop(offsetTop)
    })
    const mouseMove = (e: MouseEvent) => {
      if (!isDrag.value) return
      const { x, y, left, top } = start.value
      const $left = left + e.x - x
      const $top = top + e.y - y
      const maxLeft = window.innerWidth - dom.value!.clientWidth
      const maxTop = window.innerHeight - dom.value!.clientHeight
      if ($left < 0) {
        setLeft(1)
      } else if ($left > maxLeft) {
        setLeft(maxLeft)
      } else {
        setLeft($left)
      }
      if ($top < 0) {
        setTop(1)
      } else if ($top > maxTop) {
        setTop(maxTop)
      } else {
        setTop($top)
      }
    }
    const onMouseUp = () => {
      setDrag(false)
      document.documentElement.removeEventListener('mousemove', mouseMove)
      document.documentElement.removeEventListener('click', onMouseUp)
      document.documentElement.removeEventListener('keyup', onEsc)
    }
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onMouseUp()
      }
    }
    return {
      dom, isDrag,
      dialogName, left, top,
      onHide: () => $dialog.toggle(prop.id),
      onClose: () => $dialog.close(prop.id),
      onTop: () => $dialog.top(prop.id),
      classList: computed(() => {
        return [{
          active: isTop.value,
          drag: isDrag.value
        }]
      }),
      style: computed(() => {
        return {
          zIndex: isTop.value ? 2999 : (1000 + prop.id),
          width: prop.config.width + 'px',
          height: prop.config.height + 'px',
          left: left.value ? (left.value + 'px') : 0,
          right: left.value ? 'auto' : 0,
          top: top.value ? (top.value + 'px') : '100px',
        }
      }),
      onMouseDown: (e: MouseEvent) => {
        if (isDrag.value) return;
        $dialog.top(prop.id)
        const li = dom.value!
        const { offsetLeft, offsetTop } = li
        const { x, y } = e
        setStart({ x, y, left: offsetLeft, top: offsetTop })
        setDrag(true)
        e.stopPropagation();
        document.documentElement.addEventListener('mousemove', mouseMove)
        document.documentElement.addEventListener('click', onMouseUp)
        document.documentElement.addEventListener('keyup', onEsc)
      },
      onMouseUp
    }
  }
});

</script>

<style lang="scss" scoped>
@import "src/css/base";

.dialog-angle {
  li {
    position: absolute;
    width: 24px;
    height: 15px;
    border: 3px solid $color-8;
  }

  :nth-child(1), :nth-child(3) {
    left: -1px;
    border-right: 0;
  }

  :nth-child(2), :nth-child(4) {
    right: -1px;
    border-left: 0;
  }

  :nth-child(1), :nth-child(2) {
    top: -1px;
    border-bottom: 0;
  }

  :nth-child(3), :nth-child(4) {
    bottom: -1px;
    border-top: 0;
  }
}

.dialog-position {
  position: absolute;
  right: 3px;
  bottom: 3px;
  font-size: 12px;
  color: $color-10;
}

.dialog-item {
  background: $color-3;
  border: 1px solid $color-5;

  &:before {
    content: '';
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 3;
    position: absolute;
    background: #ffffff30;
  }

  li {
    &:before, &:after {
      background: $color-9;
    }
  }

  .dialog-item-title-container {
    border-bottom: 2px solid $color-5;
    color: $color-10;

    &:after {
      background: $color-9;
    }
  }
}

.dialog-item.active, .dialog-item.drag {
  .dialog-item-title-container {
    color: $color-primary;
  }

  &:before {
    display: none;
  }
}

.dialog-item {
  position: fixed;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding: 0 20px 10px;

  &.drag {
    cursor: move !important;
  }

  .dialog-item-title-container {
    padding: 8px 0 4px;
    height: 32px;
    line-height: 32px;
    display: flex;
    justify-content: space-between;
    z-index: 2;
    position: relative;

    .icon {
      cursor: pointer;

      &.el-icon-rank {
        cursor: move;
      }

      &:hover {
        color: $color-10
      }
    }

    &:after {
      position: absolute;
      content: '';
      bottom: -2px;
      left: 0;
      width: 50px;
      height: 2px;
    }
  }

  .dialog-item-title {
    font-size: 16px;
    flex: 1;
  }

  .dialog-content {
    z-index: 1;
    padding: 8px;
    flex: 1;
    overflow: auto;
  }
}

</style>