<template>
  <div class="container" ref="container"></div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, onUnmounted, PropType, reactive, ref, toRaw, watch } from 'vue'
import { WordCloud, WordCloudOptions } from '@antv/g2plot'

export default defineComponent({
  name: 'VWordCloud',
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
      default: 200
    }
  },
  setup (props) {
    const isRealDark = inject('isRealDark', ref(false))

    let chart: WordCloud | null = null
    const container = ref<HTMLDivElement | null>(null)
    const config = reactive<WordCloudOptions>({
      data: props.data,
      width: props.width,
      height: props.height,
      theme: isRealDark.value ? 'dark' : 'default',
      autoFit: true,
      wordField: 'name',
      weightField: 'value',
      colorField: 'name',
      wordStyle: {
        fontFamily: 'Verdana',
        fontSize: [8, 32],
        rotation: 0
      },
      random: () => 0.5
    })

    function initChart () {
      destroyChart()
      if (!container.value) return
      chart = new WordCloud(toRaw(container.value), {
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

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
}
</style>
