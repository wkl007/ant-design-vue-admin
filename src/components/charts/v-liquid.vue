<template>
  <div class="container" ref="container"></div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, onUnmounted, reactive, ref, toRaw, watch } from 'vue'
import { Datum, Liquid, LiquidOptions } from '@antv/g2plot'

export default defineComponent({
  name: 'VLiquid',
  props: {
    percent: {
      type: Number,
      default: 0.34
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

    let chart: Liquid | null = null
    const container = ref<HTMLDivElement | null>(null)
    const config = reactive<LiquidOptions>({
      percent: props.percent,
      width: props.width,
      height: props.height,
      theme: isRealDark.value ? 'dark' : 'default',
      autoFit: true,
      outline: {
        border: 2,
        distance: 2
      },
      wave: {
        length: 128
      },
      statistic: {
        content: {
          style: {
            fontSize: '24px',
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
      chart = new Liquid(toRaw(container.value), {
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
