<template>
  <div class="container">
    <h3 v-if="title">
      <span>
        {{ title }}
      </span>
    </h3>
    <slot></slot>
    <ul class="dialog-angle">
      <li v-for="i in 4" :key="i" :style="style"/>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "BBlock",
  props: {
    title: String,
    size: { type: Number, default: 3 },
    width: { type: Number }
  },
  setup(prop) {
    return {
      style: computed(() => ({
        borderWidth: (prop.width || prop.size) + 'px',
        width: prop.size * 8 + 'px',
        height: prop.size * 5 + 'px'
      }))
    }
  }
});

</script>

<style lang="scss" scoped>
@import "src/css/base";

.container {
  position: relative;
  padding: 20px;
  border: 1px solid $color-5;
  display: flex;
  flex-direction: column;

  > h3 {
    border-bottom: 2px solid $color-5;
    color: $color-7;
    margin-top: -20px;
    margin-bottom: 20px;
    padding: 8px 0 0;
    height: 32px;
    line-height: 32px;

    span {
      padding-bottom: 5px;
      position: relative;
    }

    span:after {
      position: absolute;
      background: $color-9;
      content: '';
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
    }
  }

}

.dialog-angle {
  li {
    position: absolute;
    width: 24px;
    height: 15px;
    border: solid $color-8;
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

</style>