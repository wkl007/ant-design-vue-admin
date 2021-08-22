<template>
  <a-config-provider :locale="zhCN">
    <router-view/>
  </a-config-provider>
</template>

<script lang="ts">
import { computed, defineComponent, provide, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { MENU_STATE_STORE_KEY, useMenuState } from '@/hooks/useMenuState'
import { useMultiTabStateProvider } from '@/components'
import images from '@/assets/images'

export default defineComponent({
  name: 'App',
  setup () {
    const store = useStore()

    // 多标签
    const multiTabState = useMultiTabStateProvider()

    // 媒体查询设置
    const colSize = useMediaQuery()
    const isMobile = computed(() => colSize.value === 'sm' || colSize.value === 'xs')

    // 菜单状态管理
    const menuState = useMenuState(
      {
        collapsed: isMobile.value,
        openKeys: [] as string[],
        selectedKeys: [] as string[],
        isMobile
      },
      multiTabState
    )

    // 主题
    const theme = computed(() => store.getters.navTheme)

    // 主题设置
    watch(
      theme,
      () => {
        if (theme.value === 'realDark') {
          document
            .getElementsByTagName('html')[0]
            .setAttribute('theme', 'dark')
        } else {
          document
            .getElementsByTagName('html')[0]
            .setAttribute('theme', 'light')
        }
      },
      { immediate: true }
    )

    provide('images', reactive(images))
    provide('isMobile', isMobile)
    provide('isRealDark', computed(() => theme.value === 'realDark'))
    provide(MENU_STATE_STORE_KEY, menuState)

    return {
      zhCN
    }
  }
})
</script>
