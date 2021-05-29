<template>
  <a-result
    status="403"
    title="403"
    style="background: none;"
    sub-title="Sorry, you don't have access to this page."
  >
    <template #extra>
      <router-link to="/">
        <a-button type="primary">Back Home</a-button>
      </router-link>
    </template>
  </a-result>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: '403'
})
</script>
