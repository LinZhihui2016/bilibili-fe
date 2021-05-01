<template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { $dialog } from "@/dialog";

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    $dialog.push('fansUpList')
    $dialog.push('fansVideoList')
    $dialog.push('upList')
    $dialog.push('videoList')
    return {
    }
  }
});

</script>

<style lang="scss" scoped>
ul {
  display: flex;
  flex-wrap: wrap;

  li {
    width: 25%;
  }
}
</style>