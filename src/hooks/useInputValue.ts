import { computed, ref } from 'vue'

interface PropsWithModelValue<ValueType> {
  modelValue: ValueType
  [key: string]: unknown
}

export default function useInputValue<ValueType>(
  emit: (e: 'update:modelValue', event: ValueType) => void,
  props: PropsWithModelValue<ValueType>
) {
  const internal = ref()
  return computed({
    get: () => props.modelValue ?? internal.value,
    set: (val) => {
      internal.value = val
      emit('update:modelValue', val)
    }
  })
}
