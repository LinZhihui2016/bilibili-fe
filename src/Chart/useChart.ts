import { ComputedRef, onMounted, onUnmounted, shallowRef, watch } from "vue";
import * as echarts from "echarts";
import $theme from "@/Chart/theme.json";
import { useFlag } from "@/hooks";
import { ECBasicOption } from "echarts/types/dist/shared";


echarts.registerTheme('primary', Object.assign($theme, {  }))
const loadingOpt = {
  text: 'loading...',
  color: '#04033d',
  textColor: '#04033d',
  maskColor: '#e3fafb80',
  spinnerRadius: 12,
  fontSize: 18,
}
export const useChart = (options: ComputedRef<ECBasicOption>, after: (chart: echarts.ECharts) => void = () => {
}) => {
  const dom = shallowRef<HTMLDivElement>();
  const chart = shallowRef<echarts.ECharts>()
  const [loading, , setLoading] = useFlag(false)
  const update = () => chart.value!.setOption(options.value)
  const hideLoading = () => setTimeout(() => chart.value!.hideLoading(), 300)
  const showLoading = () => chart.value!.showLoading(loadingOpt)
  watch(loading, () => loading.value ? showLoading() : hideLoading())
  watch(options, update)
  let timer: NodeJS.Timeout
  const resize = () => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
    }, 300)
    if (chart.value) {
      chart.value.clear()
      chart.value.resize()
      chart.value.setOption(options.value)
    }
  }
  onMounted(() => chart.value = echarts.init(dom.value!, 'primary'))
  onMounted(() => chart.value && after(chart.value))
  onMounted(() => window.addEventListener('resize', resize))
  onUnmounted(() => window.removeEventListener('resize', resize))
  return {
    setLoading, chart, update, resize, dom
  }
}