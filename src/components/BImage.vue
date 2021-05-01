<template>
  <el-image :src="src+(suffix||'')" :style="style" :fit="fit"/>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "BImage",
  props: {
    height: String,
    width: String,
    src: String,
    suffix: String,
    fit: String,
  },
  setup(props) {
    return {
      style: computed(() => {
        const width = props.width || 'auto'
        const height = props.height || 'auto'
        return { width, height }
      })
    }
  }
});

</script>

<style lang="scss" scoped>

</style>