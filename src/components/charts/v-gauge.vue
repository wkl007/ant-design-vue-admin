<template>
  <div class="container" ref="container"></div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, onUnmounted, reactive, ref, toRaw, watch } from 'vue'
import { View } from '@antv/g2'
import { Datum, Gauge, GaugeOptions } from '@antv/g2plot'

export default defineComponent({
  name: 'VGauge',
  props: {
    percent: {
      type: Number,
      default: 0.75
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 200
    }
  },
  setup (props) {
    const isRealDark = inject('isRealDark', ref(false))

    let chart: Gauge | null = null
    const container = ref<HTMLDivElement | null>(null)
    const config = reactive<GaugeOptions>({
      percent: props.percent,
      width: props.width,
      height: props.height,
      theme: isRealDark.value ? 'dark' : 'default',
      autoFit: true,
      range: {
        color: '#1890FF'
      },
      indicator: {
        pointer: {
          style: {
            stroke: '#D0D0D0'
          }
        },
        pin: {
          style: {
            stroke: '#D0D0D0'
          }
        }
      },
      axis: {
        label: {
          formatter (v: string) {
            return Number(v) * 100
          }
        },
        subTickLine: {
          count: 3
        }
      },
      statistic: {
        content: {
          customHtml: (container: HTMLElement, view: View, datum: Datum | undefined) => `<div><div style="font-size: 14px;color: rgba(0,0,0,0.43);">跳出率</div><br/><div style="font-size:24px;color: rgba(0,0,0,0.85);margin-top: -24px; ">${(datum?.percent * 100).toFixed(0)}%</div></div>`
        }
      }
    })

    function initChart () {
      destroyChart()
      if (!container.value) return
      chart = new Gauge(toRaw(container.value), {
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
      () => props.percent,
      (val) => {
        chart?.changeData(val)
      }
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

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
}
</style>
