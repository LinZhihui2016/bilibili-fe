<template>
  <Layout>
    <router-view />
  </Layout>
  <DialogContainer />
  <DialogManage />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Layout from "@/layout/Layout.vue";
import DialogManage from "@/dialog/components/DialogManage.vue";

export default defineComponent({
  name: "App",
  components: { DialogManage, Layout }
});
</script>

<style lang="scss" scoped></style>
