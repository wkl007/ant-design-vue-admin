import { useStore } from 'vuex'
import { App, computed, ComputedRef, inject, provide, RenderFunction, SetupContext, toRefs } from 'vue'
import type { ContentWidth } from '@/types/store/app'

export interface ProProviderProps {
  /** 类名前缀 */
  prefixCls: string;
}

export interface ProProviderData {
  /** 获取类名前缀 */
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  /** 内容区域宽度 */
  contentWidth: ComputedRef<ContentWidth>;
}

// export const PRO_PROVIDER_STORE_KEY: InjectionKey<ProProviderData> = Symbol('proProviderStore')
export const PRO_PROVIDER_STORE_KEY = 'proProviderStore'

/**
 * 默认值
 */
export const defaultProProvider: ProProviderData = {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls
    return `ant-pro-${suffixCls}`
  },
  contentWidth: computed(() => 'Fluid')
}

/**
 * 提供 contentWidth getPrefixCls 供全局使用
 */
const ProProvider = {
  name: 'ProProvider',
  props: {
    /** 类名前缀 */
    prefixCls: {
      type: String,
      default: 'ant-pro'
    }
  },
  setup (props: ProProviderProps, { slots }: SetupContext): RenderFunction | void {
    const store = useStore()
    const { prefixCls } = toRefs(props)
    const contentWidth = computed(() => store.getters.contentWidth)

    // 获取类名
    function getPrefixCls (suffixCls?: string, customizePrefixCls?: string): string {
      if (customizePrefixCls) return customizePrefixCls
      return suffixCls ? `${prefixCls.value}-${suffixCls}` : prefixCls.value
    }

    const proConfigProvider = {
      contentWidth,
      getPrefixCls
    }

    provide(PRO_PROVIDER_STORE_KEY, proConfigProvider)

    return () => slots.default?.()
  },
  install (app: App): void {
    app.component(ProProvider.name, ProProvider)
  }
}

/**
 * 获取 contentWidth getPrefixCls
 */
export function injectProProvider (): ProProviderData {
  return inject(PRO_PROVIDER_STORE_KEY, defaultProProvider)
}

export default ProProvider
