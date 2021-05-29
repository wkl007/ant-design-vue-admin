<template>
  <div class="container" ref="container"></div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, onUnmounted, PropType, reactive, ref, toRaw, watch } from 'vue'
import { Bullet, BulletOptions } from '@antv/g2plot'

export default defineComponent({
  name: 'VBullet',
  props: {
    data: {
      type: Array as PropType<Record<string, any>[]>,
      default: () => [{
        title: '满意度',
        ranges: [100],
        measures: [60],
        target: 85
      }]
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 64
    },
    measure: {
      type: String,
      default: '#5B8FF9'
    },
    target: {
      type: String,
      default: '#3D76DD'
    }
  },
  setup (props) {
    const isRealDark = inject('isRealDark', ref(false))

    let chart: Bullet | null = null
    const container = ref<HTMLDivElement | null>(null)
    const config = reactive<BulletOptions>({
      data: props.data,
      width: props.width,
      height: props.height,
      theme: isRealDark.value ? 'dark' : 'default',
      autoFit: true,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
      color: {
        range: '#f0efff',
        measure: props.measure,
        target: props.target
      },
      size: {
        range: 10,
        measure: 10,
        target: 10
      },
      xAxis: {
        line: null
      },
      yAxis: false
    })

    function initChart () {
      destroyChart()
      if (!container.value) return
      chart = new Bullet(toRaw(container.value), {
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
