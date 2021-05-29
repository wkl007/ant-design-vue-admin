import { onBeforeUpdate } from 'vue'

export function useLock (duration = 250): [() => boolean | null, (lock: boolean) => void] {
  let lock: boolean | null = null
  let timer: number

  function doLock (locked: boolean): void {
    if (locked || locked === null) lock = locked
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      lock = null
    }, duration)
  }

  onBeforeUpdate(() => {
    timer && clearTimeout(timer)
  })

  return [() => lock, doLock]
}
