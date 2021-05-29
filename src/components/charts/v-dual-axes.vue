<template>
  <div class="container" ref="container"></div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, onUnmounted, PropType, reactive, ref, toRaw, watch } from 'vue'
import { DualAxes, DualAxesOptions } from '@antv/g2plot'
import { dateFormat } from '@/utils'

export default defineComponent({
  name: 'VDualAxes',
  props: {
    data: {
      type: Array as PropType<Record<string, any>[]>,
      default: () => []
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 400
    }
  },
  setup (props) {
    const isRealDark = inject('isRealDark', ref(false))

    let chart: DualAxes | null = null
    const container = ref<HTMLDivElement | null>(null)
    const config = reactive<DualAxesOptions>({
      data: [props.data, props.data],
      width: props.width,
      height: props.height,
      theme: isRealDark.value ? 'dark' : 'default',
      autoFit: true,
      xField: 'x',
      yField: ['y1', 'y2'],
      /* slider: {
        start: 0,
        end: 1,
        formatter: v => dateFormat(v, 'HH:ss')
      }, */
      yAxis: {
        y1: {
          min: -20,
          max: 120
        },
        y2: {
          min: -20,
          max: 120
        }
      },
      meta: {
        y1: {
          alias: '客流量'
        },
        y2: {
          alias: '支付笔数'
        },
        x: {
          formatter: v => dateFormat(v, 'HH:ss')
        }
      },
      legend: {
        position: 'top'
      },
      geometryOptions: [
        {
          smooth: true,
          geometry: 'line',
          color: '#5B8FF9'
        },
        {
          smooth: true,
          geometry: 'line',
          color: '#5AD8A6'
        }
      ]
    })

    function initChart () {
      destroyChart()
      if (!container.value) return
      chart = new DualAxes(toRaw(container.value), {
        ...config
      })
      chart.render()
    }

    function destroyChart () {
      chart?.destroy()
    }

    onMounted(() => {
      initChart()
    })

    onUnmounted(() => {
      destroyChart()
    })

    watch(
      () => props.data,
      (val) => {
        chart?.changeData(val)
      },
      { deep: true }
    )

    watch(
      () => isRealDark.value,
      () => {
        chart?.update({
          theme: isRealDark.value ? 'dark' : 'default'
        })
      }
    )

    return {
      container
    }
  }
})
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
