<template>
  <watermark content="Admin Pro">
    <left-menu-layout v-if="layout==='left'"/>
    <basic-layout v-else/>
  </watermark>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { injectMenuState } from '@/hooks/useMenuState'
import { Watermark } from '@/components'
import LeftMenuLayout from './left-menu-layout.vue'
import BasicLayout from './basic-layout.vue'

export default defineComponent({
  name: 'GlobalLayout',
  components: {
    LeftMenuLayout,
    BasicLayout,
    Watermark
  },
  setup () {
    return {
      ...injectMenuState()
    }
  }
})
</script>
