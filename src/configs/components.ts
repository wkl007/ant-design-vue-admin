import type { App } from 'vue'
import { PageContainer, ProProvider, TransformVNode } from '@/components'

/**
 * 全局组件配置
 * @param app
 */
export function setupComponents (app: App<Element>): void {
  const componentList = [PageContainer, ProProvider, TransformVNode]

  componentList.forEach(component => {
    app.component(component.name, component)
  })
}
