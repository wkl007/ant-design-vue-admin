import { ComponentPublicInstance, onUnmounted, ref, Ref } from 'vue'
import { ScreenFull as screenFull } from '@/utils'
import { getTargetElement } from '@/utils/dom'

export interface Options {
  onExitFull?: () => void;
  onFull?: () => void;
}

export type UseFullscreen = readonly [
  Ref<ComponentPublicInstance | null>,
  Ref<boolean>,
  {
    setFull: () => void;
    exitFull: () => void;
    toggleFull: () => void;
  },
]

export function useFullscreen (options?: Options): UseFullscreen {
  const { onExitFull, onFull } = options || {}
  const elRef = ref<ComponentPublicInstance | null>(null)
  const onExitFullRef = ref(onExitFull)
  const onFullRef = ref(onFull)
  const state = ref(false)

  function onChange (): void {
    if (screenFull.isEnabled) {
      const { isFullscreen } = screenFull
      if (isFullscreen) {
        onFullRef.value && onFullRef.value()
      } else {
        screenFull.off('change', onChange)
        onExitFullRef.value && onExitFullRef.value()
      }
      state.value = isFullscreen
    }
  }

  function setFull (): void {
    const el = getTargetElement(elRef)
    if (!el) return
    if (screenFull.isEnabled) {
      screenFull.request(el as HTMLElement)
      screenFull.on('change', onChange)
    }
  }

  function exitFull (): void {
    if (!state.value) return
    if (screenFull.isEnabled) screenFull.exit()
  }

  function toggleFull () {
    if (state.value) {
      exitFull()
    } else {
      setFull()
    }
  }

  onUnmounted(() => {
    if (screenFull.isEnabled) screenFull.off('change', onChange)
  })

  return [
    elRef,
    state,
    {
      setFull,
      exitFull,
      toggleFull
    }
  ]
}
