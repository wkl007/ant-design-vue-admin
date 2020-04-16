<template>
  <a-result
    status="404"
    title="404"
    subTitle="抱歉，你访问的页面不存在或仍在开发中"
  >
    <template v-slot:extra>
      <a-button type="primary" @click="$router.push('/')">返回首页</a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  name: 'Exception404'
}
</script>
