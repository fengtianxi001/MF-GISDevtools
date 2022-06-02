import { ref, Ref, watch, UnwrapRef } from "vue";
import { DebounceOptionsType } from "./types";
import { useDebounceFn } from "../useDebounceFn/index";
export function useDebounce<T>(value: Ref<T>, options?: DebounceOptionsType) {
    let debounced = ref(value.value)
    const { run } = useDebounceFn(() => {
        debounced.value = value.value as UnwrapRef<T>
    }, options);
    watch([value], run)
    return { debounced };
}