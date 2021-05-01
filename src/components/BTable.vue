<template>
  <div>
    <table class="b-table-header"></table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BTable",
  props: {
    data: { type: Array, default: () => [] },
    maxHeight: String
  },
  setup(props) {

  }
});

</script>

<style lang="scss" scoped>

</style>