<template>
  <div class="container" ref="container"></div>
</template>

<script lang="ts">
import {
  CSSProperties,
  defineComponent,
  inject,
  onMounted,
  onUnmounted,
  PropType,
  reactive,
  ref,
  toRaw,
  watch
} from 'vue'
import { measureTextWidth, Pie, PieOptions } from '@antv/g2plot'

function renderStatistic (containerWidth: number, text: string, style: CSSProperties) {
  const { width: textWidth, height: textHeight } = measureTextWidth(text, style)
  const R = containerWidth / 2
  // r^2 = (w / 2)^2 + (h - offsetY)^2
  let scale = 1
  if (containerWidth < textWidth) {
    scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1)
  }
  const textStyleStr = `width:${containerWidth}px;`
  return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`
}

export default defineComponent({
  name: 'VPie',
  props: {
    data: {
      type: Array as PropType<Record<string, any>[]>,
      default: () => []
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    }
  },
  setup (props) {
    const isRealDark = inject('isRealDark', ref(false))

    let chart: Pie | null = null
    const container = ref<HTMLDivElement | null>(null)
    const config = reactive<PieOptions>({
      data: props.data,
      width: props.width,
      height: props.height,
      theme: isRealDark.value ? 'dark' : 'default',
      autoFit: true,
      angleField: 'y',
      colorField: 'x',
      radius: 0.9,
      innerRadius: 0.7,
      label: {
        type: 'inner',
        offset: '-50%',
        content: '{value}',
        style: {
          textAlign: 'center',
          fontSize: 14
        }
      },
      interactions: [{ type: 'element-selected' }, { type: 'element-active' }, { type: 'pie-statistic-active' }],
      statistic: {
        title: {
          offsetY: -4,
          customHtml: (container, view, datum) => {
            const { width, height } = container.getBoundingClientRect()
            const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2))
            const text = datum ? datum.x : '总计'
            return renderStatistic(d, text, { fontSize: 28 })
          }
        },
        content: {
          offsetY: 4,
          style: {
            fontSize: '24px'
          },
          customHtml: (container, view, datum, data) => {
            const { width } = container.getBoundingClientRect()
            const text = datum ? `¥ ${datum.y}` : `¥ ${data?.reduce((r, d) => r + d.y, 0)}`
            return renderStatistic(width, text, { fontSize: 26 })
          }
        }
      }
    })

    function initChart () {
      destroyChart()
      if (!container.value) return
      chart = new Pie(toRaw(container.value), {
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
