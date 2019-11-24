<template>
  <div class="user-layout">
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'userLayout'
  }
</script>

<style scoped lang="less">
  .user-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    background-repeat: no-repeat;
    background-position: top center;
    background-size: cover;

    .content {
      position: relative;
      flex: 1;
      padding: 32px 0;
    }
  }
</style>
