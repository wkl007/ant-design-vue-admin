<template>
  <div id="map"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

const colors = ['#eff3ff', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#084594']

export default defineComponent({
  name: 'VMap',
  props: {},
  setup (props) {
    function initMap () {
      /* const scene = new Scene({
        id: 'map',
        map: new Mapbox({
          style: 'blank',
          pitch: 0,
          center: [110.097892, 33.853662],
          zoom: 4.056
        })
      })
      scene.on('loaded', () => {
        fetch(
          'https://gw.alipayobjects.com/os/bmw-prod/3dadb1f5-8f54-4449-8206-72db6e142c40.json'
        )
          .then(res => res.json())
          .then(data => {
            const layer = new HeatmapLayer({
              autoFit: true
            })
              .source(data, {
                transforms: [
                  {
                    type: 'hexagon',
                    size: 5 * 100000
                  }
                ]
              })
              .shape('circle')
              .active(false)
              .color('#aaa')
              .style({
                coverage: 0.7,
                angle: 0,
                opacity: 1.0
              })
            scene.addLayer(layer)
          })
      })
      scene.on('loaded', () => {
        fetch(
          'https://gw.alipayobjects.com/os/basement_prod/d3564b06-670f-46ea-8edb-842f7010a7c6.json'
        )
          .then(res => res.json())
          .then(data => {
            const pointLayer = new PointLayer({})
              .source(data)
              .shape('circle')
              .size('mag', [1, 25])
              .color('mag', mag => {
                return mag > 4.5 ? '#5B8FF9' : '#5CCEA1'
              })
              .active(true)
              .style({
                opacity: 0.3,
                strokeWidth: 1
              })
            scene.addLayer(pointLayer)
          })
      }) */
    }

    onMounted(() => {
      initMap()
    })
  }
})
</script>

<style scoped lang="less">
#map {
  width: 100%;
  height: 100%;
}
</style>
