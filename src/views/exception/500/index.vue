<template>
  <a-result
    status="500"
    title="500"
    subTitle="抱歉，服务器出错了"
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
