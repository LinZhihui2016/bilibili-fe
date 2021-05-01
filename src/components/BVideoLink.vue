<template>
  <el-link :href="`https://www.bilibili.com/video/${bvid}`"
           target="_blank"
           rel="noreferrer"
           :underline="false">
    <slot></slot>
  </el-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BVideoLink",
  props: {
    bvid: { type: String, required: true }
  }
});

</script>

<style lang="scss" scoped>

</style>