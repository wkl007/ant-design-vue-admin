<template>
  <div class="container" ref="container"></div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, onUnmounted, PropType, reactive, ref, toRaw, watch } from 'vue'
import { Column, ColumnOptions } from '@antv/g2plot'

export default defineComponent({
  name: 'VColumn',
  props: {
    data: {
      type: Array as PropType<Record<string, any>[]>,
      default: () => []
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 260
    }
  },
  setup (props) {
    const isRealDark = inject('isRealDark', ref(false))
    let chart: Column | null = null
    const container = ref<HTMLDivElement | null>(null)
    const config = reactive<ColumnOptions>({
      data: props.data,
      width: props.width,
      height: props.height,
      theme: isRealDark.value ? 'dark' : 'default',
      autoFit: true,
      xField: 'x',
      yField: 'y',
      label: {
        // 可手动配置 label 数据标签位置
        position: 'middle', // 'top', 'bottom', 'middle',
        // 配置样式
        style: {
          fill: '#FFFFFF',
          opacity: 0.6
        }
      },
      xAxis: {
        label: {
          autoHide: true,
          autoRotate: false
        }
      },
      meta: {
        x: {
          alias: '类别'
        },
        y: {
          alias: '销售额'
        }
      }
    })

    function initChart () {
      destroyChart()
      if (!container.value) return
      chart = new Column(toRaw(container.value), {
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
