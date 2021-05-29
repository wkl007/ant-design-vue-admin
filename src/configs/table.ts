import SurelyTable from '@surely-vue/table'
import '@surely-vue/table/dist/index.css'
import type { App, Plugin } from 'vue'

/**
 * 高性能表格配置
 * @param app
 */
export function setupTable (app: App<Element>): void {
  app.use(SurelyTable as Plugin)
}
