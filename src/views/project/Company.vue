<template>
  <div class="company">
    <icon-font type="icon-tuichu" />
    <icon-font type="icon-facebook" />
    <icon-font type="icon-twitter" />
  </div>
</template>

<script>
  import IconFont from '@/components/Iconfont'

  export default {
    name: 'Company',
    components: {
      IconFont
    }
  }
</script>

<style scoped lang="less">
  .company {
    height: auto;
  }
</style>
