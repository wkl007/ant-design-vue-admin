<template>
  <div id="app">
    <a-locale-provider :locale="locale">
      <router-view/>
    </a-locale-provider>
  </div>
</template>

<script>
import images from '@/assets/images'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
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
  },
}
</script>

<style lang="less">
#app {
  height: 100%;
}
</style>
