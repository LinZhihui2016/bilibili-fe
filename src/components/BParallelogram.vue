<template>
  <b-block class="para-container" :class="classList" :size="1.5" :width="2">
    <div>
      <slot></slot>
    </div>
  </b-block>

</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import BBlock from "@components/BBlock.vue";

export default defineComponent({
  name: "BParallelogram",
  components: { BBlock },
  props: {
    size: String,
    value: String,
    label: String,
    direction: String as PropType<'left' | 'right'>
  },
  setup(prop) {
    return {
      style: computed(() => ({
        fontSize: prop.size,
      })),
      classList: computed(() => prop.direction )
    }
  }
});

</script>

<style lang="scss" scoped>
@import "src/css/base";

.para-container {
  padding: 0;
  background: $color-3;
  color: $color-primary;
  cursor: pointer;
  transition: all 0.5s;
  margin: 0 5px;
  &.left {
    transform: skew(30deg, 0);

    > div {
      transform: skew(-30deg, 0);
    }
  }

  &.right {
    transform: skew(-30deg, 0);
    > div {
      transform: skew(30deg, 0);
    }
  }
  &:hover {
    background: $color-5;
    color: $color-1;
  }

  > div {
    height: 32px;
    box-sizing: border-box;
    line-height: 32px;

    padding: 0 2.5vw;
  }
}
</style>