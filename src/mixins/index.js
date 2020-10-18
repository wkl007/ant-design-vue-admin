import { deviceEnquire } from '@/utils/device'
import { DEVICE_TYPE } from '@/utils/constants'
import { mapActions, mapGetters } from 'vuex'

/**
 * 全局设置mixin
 */
const SettingsMixin = {
  computed: {
    ...mapGetters(['settings'])
  },
  data () {
    return {
      fixedHeader: true, // 固定 Header : boolean
      fixSiderbar: true, // 固定左侧菜单栏 ： boolean
      fixSidebar: true, // 固定左侧菜单栏 ： boolean ,与 fixSiderbar 设置保持一致
      layoutMode: 'sidemenu', // 整体布局方式 ['sidemenu', 'topmenu'] 两种布局
      contentWidth: 'Fixed', // 内容区布局： 流式 |  固定
      autoHideHeader: false, // 向下滚动时，隐藏 Header : boolean
      navTheme: 'dark', // sidebar theme ['dark', 'light'] 两种主题
      multiTab: false // 固定标签页 : boolean
    }
  },
  methods: {
    isTopMenu () {
      return this.layoutMode === 'topmenu'
    },
    isSideMenu () {
      return !this.isTopMenu()
    },
    ...mapActions(['setSettings'])
  }
}

/**
 * 设备类型mixin
 */
const DeviceTypeMixin = {
  computed: {
    ...mapGetters(['settings'])
  },
  methods: {
    isMobile () {
      return this.settings.device === DEVICE_TYPE.MOBILE
    },
    isDesktop () {
      return this.settings.device === DEVICE_TYPE.DESKTOP
    },
    isTablet () {
      return this.settings.device === DEVICE_TYPE.TABLET
    },
    ...mapActions(['setSettings'])
  }
}

/**
 * App设备媒体查询mixin
 */
const AppDeviceMixin = {
  computed: {
    ...mapGetters(['settings', 'loginStatus'])
  },
  mounted () {
    this.processDeviceEnquire()
  },
  watch: {
    loginStatus (val) {
      if (val) this.processDeviceEnquire()
    }
  },
  methods: {
    processDeviceEnquire () {
      if (!this.loginStatus) return
      const settings = { ...this.settings }
      deviceEnquire(deviceType => {
        switch (deviceType) {
          case DEVICE_TYPE.DESKTOP:
            settings.device = 'desktop'
            settings.sidebar = true
            this.setSettings(settings)
            break
          case DEVICE_TYPE.TABLET:
            settings.device = 'tablet'
            settings.sidebar = false
            this.setSettings(settings)
            break
          case DEVICE_TYPE.MOBILE:
          default:
            settings.device = 'mobile'
            settings.sidebar = true
            this.setSettings(settings)
            break
        }
      })
    },
    ...mapActions(['setSettings'])
  }
}

export { SettingsMixin, AppDeviceMixin, DeviceTypeMixin }
