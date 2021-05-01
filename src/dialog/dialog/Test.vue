<template>
  <div>
    <p>
      {{ query }}
    </p>
    <p>
      {{ query }}
    </p>
    <p>
      {{ query }}
    </p>
    <p>
      {{ query }}
    </p>
    <p>
      {{ query }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Test",
  props: {
    query: String
  }
});

</script>

<style lang="scss" scoped>
p{
  line-height: 10em;
}
</style>