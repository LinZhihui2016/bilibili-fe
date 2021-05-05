<template>
  <div ref="dom" style="width: 100%;height:100%;"></div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRequest } from "@/hooks/useRequest";
import { apiCreatedInWeek } from "@/api/sql";
import { useChart } from "@/Chart/useChart";
import { ChartColor } from "@utils/enum";

export default defineComponent({
  name: "CollectDaily",
  setup() {
    const { result } = useRequest(() => apiCreatedInWeek())
    const dates = computed(() => (result.value || []).map(i => i.date.split('-').slice(1).join('-')));
    const options = computed(() => {
      const up = (result.value || []).map(i => i.up)
      const video = (result.value || []).map(i => i.video)
      const name = ['up主', '视频']
      return {
        grid: {
          right: '5%'
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: name
        },
        xAxis: { type: "category", data: dates.value, boundaryGap: false },
        yAxis: { name: '个', type: 'value', splitNumber: 3 },
        series: [up, video].map((data, index) => ({
          name: name[index], type: 'line', data,
          emphasis: { focus: 'series', label: { show: true } },
          color: [ChartColor.up, ChartColor.video][index]
        }))
      }
    })
    const { dom } = useChart(options)
    return { dom }

  }
});

</script>

<style lang="scss" scoped>

</style>