import { useEffect, useState } from 'react'

/**
 * @param {T} value - state to be saved after update
 * @param {number} delay - delay of update in ms (default: 300)
 * @returns debounced `value` after no changes in last `delay`ms
 */
function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 300)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
