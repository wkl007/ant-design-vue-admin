import { Fragment, isVNode, VNode } from 'vue'

export function isEmptyElement (c: VNode): boolean | null | '' {
  return (
    c.type === Comment ||
    (c.type === Fragment && c.children && c.children.length === 0) ||
    (c.type === Text && c.children && (c.children as string).trim() === '')
  )
}

export function isStringElement (c: VNode): boolean {
  return c && c.type === Text
}

export function filterEmpty (children: VNode[] = []): VNode[] {
  const res: VNode[] = []
  children.forEach((item: any) => {
    if (Array.isArray(item)) {
      res.push(...item)
    } else if (item.type === Fragment) {
      res.push(...item.children)
    } else {
      res.push(item)
    }
  })
  return res.filter(c => !isEmptyElement(c))
}

/**
 * 展开嵌套数组
 * @param children
 * @param filterEmpty
 */
export function flattenChildren (children: VNode[] = [], filterEmpty = true): VNode[] {
  const temp = Array.isArray(children) ? children : [children]
  const res: VNode[] = []
  temp.forEach((item: VNode) => {
    if (Array.isArray(item)) {
      res.push(...flattenChildren(item, filterEmpty))
    } else if (item && item.type === Fragment) {
      res.push(...flattenChildren((item as any).children, filterEmpty))
    } else if (item && isVNode(item)) {
      if (filterEmpty && !isEmptyElement(item)) {
        res.push(item)
      } else if (!filterEmpty) {
        res.push(item)
      }
    } else if (item) {
      res.push(item)
    }
  })
  return res
}
