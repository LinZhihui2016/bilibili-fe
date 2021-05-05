<template>
  <el-form inline size="mini">
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
  <VideoChart :order-by="orderBy" :contrast="contrast"/>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import VideoChart from "@/Chart/VideoChart.vue";
import { EVideoChart } from "@utils/enum";

export default defineComponent({
  name: "VideoRank",
  components: { VideoChart },
  setup() {
    return {
      arr: ref(EVideoChart),
      orderBy: ref<keyof typeof EVideoChart>('views'),
      contrast: ref<keyof typeof EVideoChart>('likes')
    }
  }
});

</script>

<style lang="scss" scoped>

</style>