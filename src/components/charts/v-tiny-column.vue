<template>
  <div class="container" ref="container"></div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, onUnmounted, PropType, reactive, ref, toRaw, watch } from 'vue'
import { TinyColumn, TinyColumnOptions } from '@antv/g2plot'

export default defineComponent({
  name: 'VTinyColumn',
  props: {
    data: {
      type: Array as PropType<number[]>,
      default: () => [274, 337, 81, 497, 666, 219, 269]
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 64
    }
  },
  setup (props) {
    const isRealDark = inject('isRealDark', ref(false))

    let chart: TinyColumn | null = null
    const container = ref<HTMLDivElement | null>(null)
    const config = reactive<TinyColumnOptions>({
      data: props.data,
      width: props.width,
      height: props.height,
      theme: isRealDark.value ? 'dark' : 'default',
      autoFit: true
    })

    function initChart () {
      destroyChart()
      if (!container.value) return
      chart = new TinyColumn(toRaw(container.value), {
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
