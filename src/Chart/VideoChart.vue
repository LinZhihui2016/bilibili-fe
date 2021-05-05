<template>
  <div ref="dom" style="width: 100%;height:100%;"></div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, watch } from "vue";
import { useRequest } from "@/hooks/useRequest";
import { apiVideoChart } from "@/api/video";
import { ChartColor, EVideoChart } from "@utils/enum";
import { useChart } from "@/Chart/useChart";

export default defineComponent({
  name: "VideoChart",
  props: {
    orderBy: { type: String as PropType<keyof typeof EVideoChart>, required: true },
    contrast: { type: String as PropType<keyof typeof EVideoChart>, required: true }
  },
  setup(props) {
    const options = computed(() => {
      const arr = [props.orderBy, props.contrast]
      return {
        tooltip: {
          "trigger": "axis",
        },
        legend: {
          data: arr.map(i => EVideoChart[i])
        },
        yAxis: arr.map(name => ({
          name: EVideoChart[name], type: 'value', splitNumber: 2,
        })),
        xAxis: {
          type: 'category',
          data: (result.value || []).map(i => i.title),
        },
        series: arr.map((key, index) => ({
          name: EVideoChart[key],
          type: 'bar',
          data: (result.value || []).map(i => i[key]),
          color: ChartColor[key],
          yAxisIndex: index
        }))
      }
    })
    const { result, run } = useRequest(() => apiVideoChart(props.orderBy), {
      success: () => setLoading(false)
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