<template>
  <div :style="{ minWidth: `${rightSize}px` }">
    <div :style="{ paddingRight: '8px' }">
      <slot>
        <div style="color: white; text-align: right;">Right-Content</div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RightContent',
  props: {
    /** 宽度 */
    rightSize: {
      type: Number,
      default: 208
    }
  }
})
</script>
