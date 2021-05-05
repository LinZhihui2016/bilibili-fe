<template>
  <div ref="dom" style="width: 100%;height:100%;"></div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, watch } from "vue";
import { ChartColor, EUpChart } from "@utils/enum";
import { useRequest } from "@/hooks/useRequest";
import { apiUpChart } from "@/api/up";
import { useChart } from "@/Chart/useChart";

export default defineComponent({
  name: "UpChart",
  props: {
    orderBy: { type: String as PropType<keyof typeof EUpChart>, required: true },
    contrast: { type: String as PropType<keyof typeof EUpChart>, required: true }
  },
  setup(props) {
    const options = computed(() => {
      const left = EUpChart[props.orderBy];
      const right = EUpChart[props.contrast]
      return {
        grid: {
          right: '50',
          bottom: '10'
        },
        tooltip: {
          "trigger": "axis",
        },
        legend: {
          data: [left, right]
        },
        xAxis: [left, right].map(name => ({
          name, type: 'value',
          splitNumber: 3,
        })),
        yAxis: {
          type: 'category',
          data: (result.value || []).map(i => i.name),
          axisLabel: {
            interval: 0,
          },
        },
        series: [
          {
            name: left,
            type: 'bar',
            data: (result.value || []).map(i => i[props.orderBy]),
            color: ChartColor[props.orderBy]

          },
          {
            name: right,
            type: 'bar',
            data: (result.value || []).map(i => i[props.contrast]),
            xAxisIndex: 1,
            color: ChartColor[props.contrast]
          }]
      }
    })
    const { result, run } = useRequest(() => apiUpChart(props.orderBy), {
      success: (res) => {
        res.data.sort((a, b) => a[props.orderBy] - b[props.orderBy])
        setLoading(false)
      }
    })
    const { setLoading, dom } = useChart(options)
    watch(() => props.orderBy, () => {
      setLoading(true)
      run()
    })

    return { dom }
  }
});

</script>

<style lang="scss" scoped>

</style>