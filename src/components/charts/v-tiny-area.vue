<template>
  <div class="container" ref="container"></div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, onUnmounted, PropType, reactive, ref, toRaw, watch } from 'vue'
import { TinyArea, TinyAreaOptions } from '@antv/g2plot'

export default defineComponent({
  name: 'VTinyArea',
  props: {
    data: {
      type: Array as PropType<number[]>,
      default: () => []
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 64
    },
    color: {
      type: String,
      default: '#1089ff'
    },
    fill: {
      type: String,
      default: 'rgba(24, 144, 255, 0.2)'
    }
  },
  setup (props) {
    const isRealDark = inject('isRealDark', ref(false))

    let chart: TinyArea | null = null
    const container = ref<HTMLDivElement | null>(null)
    const config = reactive<TinyAreaOptions>({
      data: [],
      autoFit: true,
      smooth: true,
      width: props.width,
      height: props.height,
      theme: isRealDark.value ? 'dark' : 'default',
      line: {
        color: props.color
      },
      areaStyle: {
        fill: props.fill
      }
    })

    function initChart () {
      destroyChart()
      if (!container.value) return
      chart = new TinyArea(toRaw(container.value), {
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
