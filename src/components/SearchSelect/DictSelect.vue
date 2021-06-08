<template>
  <select-search v-model:value="selectData" :placeholder="placeholder" @on-change="handleChange">
    <a-select-option v-for="item in options" :key="item.id" :value="item.id">
      {{ item.label }}
    </a-select-option>
  </select-search>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { message } from 'ant-design-vue'
import SelectSearch from './SelectSearch.vue'
import service, { DictionaryDetail } from '/@/api/basis-manage/dictionary-detail'

export default defineComponent({
  components: { SelectSearch },
  props: {
    value: {
      type: String,
      default: undefined
    },
    type: {
      type: String,
      default: '',
      required: true
    },
    placeholder: {
      type: String,
      default: '请输入'
    }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    // 选中的数据
    const selectData = ref<string | undefined>(undefined)

    // 数据集合
    const options = ref<DictionaryDetail[]>([])

    // 加载数据
    async function loadData(query: string) {
      try {
        const { data } = await service.fecthListByType(query)
        options.value = data
      } catch (err) {
        message.error('加载数据失败')
      }
    }

    // 更新数据
    function handleChange(val: string) {
      emit('update:value', val)
    }

    watch(
      () => props.value,
      (val) => (selectData.value = val),
      { immediate: true }
    )

    loadData(props.type)

    return { selectData, options, handleChange }
  }
})
</script>

<style lang="less" scoped></style>
