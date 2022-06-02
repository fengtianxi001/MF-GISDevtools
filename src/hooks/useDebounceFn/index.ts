import { isFunction, debounce } from "lodash-es";
import { DebounceOptionsType } from "../useDebounce/types";
import { onUnmounted, ref } from "vue"
type noop = (...args: any) => any;

export function useDebounceFn<T extends noop>(fn: T, options?: DebounceOptionsType) {
  if (!isFunction(fn)) {
    console.error(`useDebounceFn expected parameter is a function, got ${typeof fn}`);
  }
  const fnRef = ref(fn)
  const wait = options?.wait ?? 1000;
  const debounced = debounce(
    (...args) => {
      return fnRef.value(...args)
    },
    wait,
    options,
  )
  onUnmounted(() => {
    debounced.cancel()
  })
  return {
    run: debounced,
    cancel: debounced.cancel,
    flush: debounced.flush,
  };
}