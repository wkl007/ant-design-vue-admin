import { v4 as uuidv4 } from 'uuid'
import moment, { MomentInput } from 'moment'
import numeral from 'numeral'
import screenFull from 'screenfull'
import type { App } from 'vue'

/**
 * 全屏
 */
export const ScreenFull = screenFull

/**
 * 生成独一无二标识符
 */
export function generateUuid (): string {
  return uuidv4()
}

/**
 * 判断 url
 * @param url
 */
export function isUrl (url: string): boolean {
  /* eslint no-useless-escape:0 */
  const pattern = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
  return pattern.test(url)
}

/**
 * 时间格式化
 * @param date
 * @param format
 */
export function dateFormat (date: MomentInput, format = 'YYYY-MM-DD HH:mm:ss'): string {
  return moment(date).format(format)
}

/**
 * 当前时间之前
 * @param date
 */
export function dateFromNow (date: MomentInput): string {
  return moment(date).fromNow()
}

/**
 * 格式化数字
 * @param number
 * @param format
 */
export function numberFormat (number?: string | number, format = '0,00.00'): string {
  return numeral(number).format(format)
}

/**
 * 处理 万
 * @param number
 */
export function wanFormat (number: number): [number, string] | null {
  const v = number
  if (!v || Number.isNaN(v)) return null
  let result = [number, ''] as [number, string]
  if (number > 10000) {
    result = [Math.floor(number / 10000), '万']
  }
  return result
}

/**
 * 处理 零
 * @param number
 */
export function fixedZero (number: number): string | number {
  return number < 10 ? `0${number}` : number
}

/**
 * withInstall
 * @param comp
 */
export function withInstall<T> (comp: T): T & Plugin {
  const c = comp as any
  c.install = function (app: App) {
    app.component(c.displayName || c.name, comp)
  }

  return comp as T & Plugin
}
