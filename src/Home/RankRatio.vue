<template>
  <div ref="dom" style="width: 100%;height:100%;"></div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRequest } from "@/hooks/useRequest";
import { apiRankRatio } from "@/api/rank";
import dayjs from "dayjs";
import { useChart } from "@/Chart/useChart";

export default defineComponent({
  name: "RankRatio",
  setup() {
    const { result } = useRequest(() => apiRankRatio(dayjs().subtract(1, 'day').format('YYYY-MM-DD')))
    const options = computed(() => {
      return {
        title: { text: "昨日全站排行榜占比" },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          show:false
        },
        series: [
          {
            name: '排行榜占比',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '60%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: result.value || []
          }
        ]
      }
    })
    const { dom } = useChart(options)
    return {
      dom
    }
  }
});

</script>

<style lang="scss" scoped>

</style>