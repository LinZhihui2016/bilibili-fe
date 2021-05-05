<template>
  <span>
    <span v-for="(i,j) in (text||'').split('')" :key="j" class="text-box">
      <span>
        {{ i }}
      </span>
    </span>
    <span class="append" v-if="$slots.default">
      <slot></slot>
    </span>
  </span>

</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BCount",
  props: {
    text: {
      type: String,
      requited: true
    },
  },
});

</script>

<style lang="scss" scoped>
@import "src/css/base";

.text-box {
  display: inline-block;
  font-size: 22px;
  border-left: 2px solid $color-6;
  border-right: 2px solid $color-6;
  border-image: linear-gradient(to top, $color-8, $color-2, $color-8) 5 5 5 5;
  margin: 0 0.2em;
  font-weight: lighter;
  color: $color-primary;
  vertical-align: center;

  > span {
    display: inline-block;
    width: 1.1em;
    box-sizing: border-box;
    text-align: center;
    border-top: 2px solid $color-6;
    border-bottom: 2px solid $color-6;
    border-image: linear-gradient(to right, $color-8, $color-2, $color-8) 5 5 5 5;
  }
}

.append {
  color: $color-9;
}
</style>