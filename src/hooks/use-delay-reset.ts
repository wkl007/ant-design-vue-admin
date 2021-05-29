import { onBeforeUnmount, Ref, ref } from 'vue'

export function useDelayReset (timeout = 10): [Ref<boolean>, (val: boolean, callback?: () => void) => void, () => void] {
  const bool = ref(false)
  let delay: number

  function cancelLatest (): void {
    delay && clearTimeout(delay)
  }

  function delaySetBool (value: boolean, callback?: () => void): void {
    cancelLatest()
    delay = setTimeout(() => {
      bool.value = value
      if (callback) callback()
    }, timeout)
  }

  onBeforeUnmount(() => {
    cancelLatest()
  })

  return [bool, delaySetBool, cancelLatest]
}
