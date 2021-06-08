<template>
  <a-input
    v-if="type === 'text'"
    v-model:value="inputValue"
    class="input-wrap"
    :disabled="inputReadonly"
    :placeholder="inputReadonly ? '' : placeholder"
    @change="onChange"
  />
  <a-input-password
    v-else-if="type === 'password'"
    v-model:value="inputValue"
    class="input-wrap"
    :disabled="inputReadonly"
    :placeholder="inputReadonly ? '' : placeholder"
    @change="onChange"
  />
</template>

<script lang="ts">
import type { Ref } from 'vue'
import { defineComponent, PropType, ref, unref, watch, computed, toRefs } from 'vue'
import { injectDatapage } from '/@/lib/idata/data-page/methods/useDepend'

const useinputReadonly = (readonly: Ref<boolean>, isReadonly: Ref<boolean>) => {
  return computed(() => {
    const dataPage = injectDatapage()
    return readonly.value || (isReadonly.value && dataPage.readonly?.value)
  })
}

export default defineComponent({
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    readonly: {
      type: Boolean as PropType<boolean>,
      default: undefined
    },
    isReadonly: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    type: {
      type: String,
      default: 'text',
      validator: (v: string): boolean => ['text', 'password'].includes(v)
    }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const inputValue = ref<string | number>('')
    const { readonly, isReadonly } = toRefs(props)

    // 内容发送变化触发
    const onChange = () => emit('update:value', inputValue.value)

    const inputReadonly = useinputReadonly(readonly, isReadonly)

    watch(
      () => props.value,
      (newValue) => {
        if (unref(inputValue) === newValue) return
        inputValue.value = newValue
      },
      { immediate: true }
    )

    return { inputValue, inputReadonly, onChange }
  }
})
</script>

<style lang="less" scoped>
.input-wrap[disabled] {
  color: rgba(0, 0, 0, 0.65);
  cursor: default;
}
</style>
