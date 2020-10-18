<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <router-view/>
    </a-config-provider>
  </div>
</template>

<script>
import images from '@/assets/images'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { AppDeviceMixin } from '@/mixins'

export default {
  mixins: [AppDeviceMixin],
  provide: {
    images
  },
  data () {
    return {
      locale: zhCN
    }
  }
}
</script>

<style lang="less">
#app {
  height: 100%;
}
</style>
