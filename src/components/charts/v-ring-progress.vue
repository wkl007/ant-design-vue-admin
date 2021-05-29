<template>
  <div class="container" ref="container"></div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, onUnmounted, PropType, reactive, ref, toRaw, watch } from 'vue'
import { Datum, RingProgress, RingProgressOptions } from '@antv/g2plot'

export default defineComponent({
  name: 'VRingProgress',
  props: {
    percent: {
      type: Number,
      default: 0.75
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    },
    color: {
      type: Array as PropType<string[]>,
      default: () => ['#5B8FF9', '#E8EDF3']
    }
  },
  setup (props) {
    const isRealDark = inject('isRealDark', ref(false))

    let chart: RingProgress | null = null
    const container = ref<HTMLDivElement | null>(null)
    const config = reactive<RingProgressOptions>({
      percent: props.percent,
      width: props.width,
      height: props.height,
      theme: isRealDark.value ? 'dark' : 'default',
      color: props.color,
      autoFit: true,
      statistic: {
        content: {
          style: {
            fontSize: '20px',
            fontWeight: 'normal',
            color: '#363636'
          },
          formatter: (datum: Datum | undefined) => `${(datum?.percent * 100).toFixed(0)}%`
        }
      }
    })

    function initChart () {
      destroyChart()
      if (!container.value) return
      chart = new RingProgress(toRaw(container.value), {
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
