<template>
  <el-link :href="`https://space.bilibili.com/${mid}`"
           target="_blank"
           rel="noreferrer"
           :icon="icon?'el-icon-user-solid':''"
           :underline="false">
    <slot></slot>
  </el-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BUpLink",
  props: {
    mid: { type: [String, Number], required: true },
    icon: Boolean
  }
});

</script>

<style lang="scss" scoped>

</style>