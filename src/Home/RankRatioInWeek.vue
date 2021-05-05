<template>
  <div ref="dom" style="width: 100%;height:100%;"></div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useRequest } from "@/hooks/useRequest";
import { apiRankRationInWeek } from "@/api/rank";
import { useChart } from "@/Chart/useChart";
import { ChartColor } from "@utils/enum";

export default defineComponent({
  name: "RankRatioInWeek",
  setup() {
    const { result } = useRequest(() => apiRankRationInWeek())
    const dates = computed(() => (Object.values(result.value || {})[0] || []).map(i => i.date))
    const index = ref(0)

    const options = computed(() => {
      const names = Object.keys(result.value || {})
      const pieData = names.map(name => ({ name, value: result.value![name][index.value].value }))
      return {
        grid: { bottom: "40", left: '20', right: '35%', top: "10" },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          top: "bottom",
          left: "center"
        },
        xAxis: { type: "category", data: dates.value, boundaryGap: false },
        yAxis: { name: '个数', type: 'value', splitNumber: 3 },
        series: [...names.map(name => ({
          name, type: 'line', data: (result.value || {})[name] || [],
          emphasis: { focus: 'series' },
          color: ChartColor[name as keyof typeof ChartColor]
        })), {
          name: '排行榜占比',
          id: "pie",
          type: 'pie',
          radius: '55%',
          emphasis: { focus: 'data' },
          label: {
            formatter: '{b}({c})'
          },
          center: ['85%', '40%'],
          data: pieData
        }]
      }
    })
    const { dom } = useChart(options, (chart) => {
      chart.on('updateAxisPointer', (e) => {
        if (e.dataIndex !== undefined && e.dataIndex !== index.value) {
          index.value = e.dataIndex
        }
      })
    })
    return { dom }
  }
});

</script>

<style lang="scss" scoped>

</style>