import { ref, Ref } from 'vue'

export const MediaQueryEnum = {
  xs: {
    maxWidth: 575,
    matchMedia: '(max-width: 575px)'
  },
  sm: {
    minWidth: 576,
    maxWidth: 767,
    matchMedia: '(min-width: 576px) and (max-width: 767px)'
  },
  md: {
    minWidth: 768,
    maxWidth: 991,
    matchMedia: '(min-width: 768px) and (max-width: 991px)'
  },
  lg: {
    minWidth: 992,
    maxWidth: 1199,
    matchMedia: '(min-width: 992px) and (max-width: 1199px)'
  },
  xl: {
    minWidth: 1200,
    maxWidth: 1599,
    matchMedia: '(min-width: 1200px) and (max-width: 1599px)'
  },
  xxl: {
    minWidth: 1600,
    matchMedia: '(min-width: 1600px)'
  }
}

export type MediaQueryKey = keyof typeof MediaQueryEnum

/**
 * 获取当前屏幕媒体查询类型
 */
export function getScreenClassName (): MediaQueryKey {
  let className: MediaQueryKey = 'md'
  if (typeof window === 'undefined') return className
  const mediaQueryKey = (Object.keys(MediaQueryEnum) as MediaQueryKey[]).find(key => {
    const { matchMedia } = MediaQueryEnum[key]
    return window.matchMedia(matchMedia).matches
  })
  className = mediaQueryKey as MediaQueryKey
  return className
}

/**
 * 媒体查询 hooks
 */
export function useMediaQuery (): Ref<MediaQueryKey> {
  const colSpan = ref(getScreenClassName())
  const mediaQueryKeyList = Object.keys(MediaQueryEnum) as MediaQueryKey[]
  mediaQueryKeyList.forEach(key => {
    const { matchMedia } = MediaQueryEnum[key]
    const mediaQuery = window.matchMedia(matchMedia)
    if (mediaQuery.matches) colSpan.value = key
    mediaQuery.onchange = e => {
      if (e.matches) colSpan.value = key
    }
  })
  return colSpan
}
