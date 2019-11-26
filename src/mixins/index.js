import { DEVICE_TYPE, deviceEnquire } from '@/utils/device'
import { mapActions, mapGetters } from 'vuex'

const mixin = {
  computed: {
    ...mapGetters(['settings']),
  },
  data () {
    return {
      fixedHeader: false,
      fixSiderbar: false,
      fixSidebar: false,
      layoutMode: 'sidemenu',
      contentWidth: 'Fixed',
      autoHideHeader: false,
      navTheme: 'dark',
      multiTab: false
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

const mixinDevice = {
  computed: {
    ...mapGetters(['settings']),
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

const AppDeviceEnquire = {
  computed: {
    ...mapGetters(['settings'])
  },
  mounted () {
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
  methods: {
    ...mapActions(['setSettings'])
  }
}

export { mixin, AppDeviceEnquire, mixinDevice }
