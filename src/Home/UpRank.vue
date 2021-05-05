<template>
  <el-form inline size="mini" >

    <el-form-item label="排序">
      <el-select v-model="orderBy">
        <el-option
          :disabled="contrast === value+''"
          v-for="(label,value) in arr" :key="value" :label="label" :value="value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="对比">
      <el-select v-model="contrast">
        <el-option :disabled="orderBy === value+''"
                   v-for="(label,value) in arr"
                   :key="value"
                   :label="label"
                   :value="value"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <UpChart :order-by="orderBy" :contrast="contrast"/>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import UpChart from "../Chart/UpChart.vue";
import { EUpChart } from "@utils/enum";

export default defineComponent({
  name: "UpRank",
  components: { UpChart },
  setup() {
    return {
      arr: ref(EUpChart),
      orderBy: ref<keyof typeof EUpChart>('follower'),
      contrast: ref<keyof typeof EUpChart>('likes')
    }
  }
});

</script>

<style lang="scss" scoped>

</style>