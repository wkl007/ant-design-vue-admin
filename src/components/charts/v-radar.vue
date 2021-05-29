<template>
  <div class="container" ref="container"></div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, onUnmounted, PropType, reactive, ref, toRaw, watch } from 'vue'
import { Radar, RadarOptions } from '@antv/g2plot'

export default defineComponent({
  name: 'VRadar',
  props: {
    data: {
      type: Array as PropType<Record<string, any>[]>,
      default: () => []
    },
    width: {
      type: Number,
      default: 560
    },
    height: {
      type: Number,
      default: 400
    }
  },
  setup (props) {
    const isRealDark = inject('isRealDark', ref(false))

    let chart: Radar | null = null
    const container = ref<HTMLDivElement | null>(null)
    const config = reactive<RadarOptions>({
      data: [],
      legend: {
        position: 'bottom'
      },
      width: props.width,
      height: props.height,
      padding: [100, 50],
      autoFit: true,
      seriesField: 'name',
      xField: 'label',
      yField: 'value',
      theme: isRealDark.value ? 'dark' : 'default',
      color: [
        '#167CDB',
        '#FACC14',
        '#2FC25B'
      ]
    })

    function initChart () {
      destroyChart()
      if (!container.value) return
      chart = new Radar(toRaw(container.value), {
        ...config,
        data: props.data
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

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
}
</style>
