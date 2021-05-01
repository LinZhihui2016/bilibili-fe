<template>
  <teleport to="body">
    <ul class="dialog-manage">
      <li
        v-for="item in storage"
        :key="item.id"
        class="not-select"
        @click="onShow(item.id)"
        :class="{show:item.show,top:item.id === topId}"
      >
        <div>
          {{ item.title }}
        </div>
        <i class="el-icon-close" @click="onClose(item.id)"></i>
        <ul class="dialog-angle">
          <li v-for="i in 4" :key="i"></li>
        </ul>
      </li>
    </ul>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { $dialog } from "@/dialog";

export default defineComponent({
  name: "DialogManage",
  setup() {
    return {
      storage: $dialog.storage,
      topId: $dialog.topId,
      onShow: (id: number) => $dialog.toggle(id, true),
      onClose: (id: number) => $dialog.close(id)
    }
  }
});

</script>

<style lang="scss" scoped>
@import "src/css/base";

.dialog-manage {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  overflow-x: auto;

  > li {
    display: inline-block;
    width: 120px;
    padding: 6px 20px;
    margin: 4px 5px;
    position: relative;
    background: $color-3;
    border: 1px solid $color-5;
    color: $color-10;
    cursor: pointer;
    i {
      position: absolute;
      right:10px;
      top:50%;
      transform: translateY(-50%);
    }

    .dialog-angle {
      display: none;
    }

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

    &.top {
      color: $color-primary;

      &:before {
        display: none;
      }
    }

    &.show .dialog-angle, &.show .dialog-angle {
      display: block;

      li {
        position: absolute;
        width: 16px;
        height: 10px;
        border: 1px solid $color-8;
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
  }
}
</style>