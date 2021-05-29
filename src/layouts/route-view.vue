<template>
  <router-view v-slot="{Component}">
    <transition
      :name="transitionName"
      appear
    >
      <multi-tab-store-consumer>
        <component v-if="Component" :is="Component"/>
        <slot v-else/>
      </multi-tab-store-consumer>
    </transition>
  </router-view>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { MultiTabStoreConsumer } from '@/components'
import { injectMenuState } from '@/hooks/use-menu-state'

export default defineComponent({
  name: 'RouteView',
  components: {
    MultiTabStoreConsumer
  },
  setup () {
    const menuState = injectMenuState()

    return {
      transitionName: computed(() => menuState.transitionName.value)
    }
  }
})
</script>
