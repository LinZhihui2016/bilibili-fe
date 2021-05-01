<template>
  <teleport to="body">
    <ul>
      <template
        v-for="item in storage"
        :key="item.id">
        <DialogItem
          :name="item.name"
          :query="item.query"
          :id="item.id"
          :config="item.config"
          :show="item.show"
        >
        </DialogItem>
      </template>
    </ul>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { $dialog } from "@/dialog";

export default defineComponent({
  name: "DialogContainer",
  setup() {
    return {
      storage: $dialog.storage
    }
  }
});

</script>

<style lang="scss" scoped>

</style>