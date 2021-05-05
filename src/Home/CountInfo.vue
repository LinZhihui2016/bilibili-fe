<template>
  <div class="info-container">
    <div class="flex-center" v-if="date[0]">
      <b-count :text="date[0]">
        年
      </b-count>
      <b-count :text="date[1]">
        月
      </b-count>
      <b-count :text="date[2]">
        日
      </b-count>
    </div>
    <div ref="dom" style="width: 100%;height:100%;"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRequest } from "@/hooks/useRequest";
import { apiCount } from "@/api/sql";
import BCount from "@components/BCount.vue";
import { useChart } from "@/Chart/useChart";

export default defineComponent({
  name: "CountInfo",
  components: { BCount },
  setup() {
    const { result } = useRequest(() => apiCount())
    const options = computed(() => {
      if (!result.value) return {}
      const up = result.value.up
      const video = result.value.video
      return {
        tooltip: {
          formatter: ({ seriesName }: { seriesName: string }) => {
            const obj = { up, video }[seriesName]!
            return `${ seriesName }今日更新数量<br/>${ obj.update }个 / ${ obj.total }个`
          }
        },
        series: [up, video].map((item, index) => ({
          name: ['up', 'video'][index],
          type: 'gauge',
          center: [['25%', '75%'][index], '50%'],
          splitNumber: 10,
          axisLine: {
            lineStyle: {
              width: 2,
              color: [
                [0, '#e3fafb'],
                [0.2, '#b7f3f6'],
                [0.4, '#86dee7'],
                [0.6, '#59c1d2'],
                [0.8, '#31a5be'],
                [1, '#267fa0'],
              ]
            }
          },
          progress: {
            show: true,
            width: 2,
            color: "#267fa0"
          },
          pointer: {
            show: true,
            length: "50%",
            itemStyle: {
              color: "#fff"
            }
          },
          axisTick: {
            distance: 5,
            length: 5,
            lineStyle: {
              color: 'auto',
              width: 1
            }
          },
          splitLine: {
            length: 10,
            distance: 5,

            lineStyle: {
              color: 'auto',
              width: 2
            }
          },
          axisLabel: {
            show: false,
          },
          title: {
            show: true,
            color: '#e3fafb',
            offsetCenter: [0, '50%'],
            fontSize: '10'
          },
          detail: {
            show: true,
            color: '#39c1d5',
            offsetCenter: [0, '80%'],
            fontSize: 16,
          },
          min: 0,
          max: item.total,
          data: [{
            value: item.update,
            name: '今日更新'
          }]
        }))
      }
    })
    const { dom } = useChart(options)
    const date = computed(() => result.value ? result.value.date.split('-') : [])
    return { result, date, dom }
  }
});

</script>

<style lang="scss" scoped>
@import "src/css/base";

.info-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

}
</style>