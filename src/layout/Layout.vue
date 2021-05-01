<template>
  <div id="layout">
    <!--    <LayoutAside id="aside"></LayoutAside>-->
    <div id="content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Layout",
  setup() {
    return {};
  }
});
</script>

<style scoped lang="scss">
@import "src/css/base";

#content {
  //margin-top: $headerHeight+$routesHeight;
  //margin-left: $asideWidth;
  padding: 20px;
  box-sizing: border-box;
  min-height: calc(100vh);
}

#header {
  position: fixed;
  top: 0;
  width: 100%;
  height: $headerHeight;
}

#routes {
  position: fixed;
  top: $headerHeight;
  width: 100%;
  height: $routesHeight;
}

#aside {
  position: fixed;
  left: 0;
  top: $headerHeight+$routesHeight;
  bottom: 0;
  width: $asideWidth;
  background: blue;
}
</style>