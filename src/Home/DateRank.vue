<template>
  <div class="rank-container">
    <ul class="tags">
      <li :class="{active:rid === id }" v-for="(label,id) in result" :key="id" @click="onRid(id)">
        {{ label }}
      </li>
    </ul>
    <div ref="dom" style="width: 100%;height:100%;"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRequest } from "@/hooks/useRequest";
import { apiRankEnum, apiRankPaging } from "@/api/rank";
import { useString } from "@/hooks";
import dayjs from "dayjs";
import { ChartColor, EVideoChart } from "@utils/enum";
import { useChart } from "@/Chart/useChart";
import * as  echarts from "echarts";

export default defineComponent({
  name: "DateRank",
  setup() {
    const [rid, setRid] = useString('0')
    const { result } = useRequest(() => apiRankEnum())
    const {
      result: rank,
      run
    } = useRequest(() => apiRankPaging(rid.value, dayjs().subtract(1, 'day').format('YYYY-MM-DD')), {
      success: () => {
        setLoading(false)
      }
    })
    const options = computed(() => {
      const keys = Object.keys(EVideoChart) as (keyof typeof EVideoChart)[]
      const names = keys.map(i => EVideoChart[i as keyof typeof EVideoChart])
      return {
        grid: { left: 30, right: 30, },
        tooltip: {
          "trigger": "axis",
        },
        legend: {
          data: names
        },
        yAxis: names.map((name, index) => ({
          name: name, type: 'value', offset: [80, 0, 0, 80][index],
          position: index <= 1 ? 'left' : 'right',
        })),
        xAxis: {
          type: 'category',
          data: (rank.value || []).map(i => i.title || '未采集'),
          axisLabel: {
            interval: "0",
            width: '70',
            overflow: "truncate"
          }
        },
        series: keys.map((key, index) => ({
          name: EVideoChart[key],
          type: 'bar',
          data: (rank.value || []).map(i => i[key]),
          yAxisIndex: index,
          color: ChartColor[key],
          itemStyle: {
            borderRadius: [50, 50, 0, 0],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: ChartColor[key] }, //柱图渐变色
              { offset: 1, color: '#ffffff00' }, //柱图渐变色
            ]),
          }
        }))
      }
    })
    const { setLoading, dom } = useChart(options)
    return {
      result, rid, rank, dom,
      onRid(id: string | number) {
        if (+id === +rid.value) {
          return
        } else {
          setRid(id + '')
          run()
        }
      }
    }
  }
});

</script>

<style lang="scss" scoped>
@import "src/css/base";

.rank-container {
  padding-top: 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tags {
  top: 60px;
  position: absolute;
  display: flex;
  left: 20px;
  right: 20px;

  li {
    flex: 1;
    margin-right: 10px;
    margin-bottom: 10px;
    text-align: center;
    cursor: pointer;
    width: 40px;
    background: $color-1;
    color: $color-primary;
    padding: 4px 8px;
    border-radius: 4px;

    &:hover {
      background: $color-5;
      color: $color-1;
    }

    &.active {
      background: $color-8;
      color: $color-1;
    }
  }
}
</style>