<template>
  <a-result
    status="500"
    title="500"
    style="background: none;"
    sub-title="Sorry, the server is reporting an error."
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
  name: '500'
})
</script>
