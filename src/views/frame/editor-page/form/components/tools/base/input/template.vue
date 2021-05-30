<template>
  <a-form-item label="字段名称">
    <ui-index v-model:value="dataItem.label" prop="label" />
  </a-form-item>
  <a-form-item label="提示信息">
    <ui-index v-model:value="dataItem.placeholder" prop="placeholder" />
  </a-form-item>
  <a-form-item label="输入长度">
    <ui-index v-model:value="dataItem.maxlength" prop="maxlength" type="number" />
  </a-form-item>
</template>

<script lang="ts">
import type { InputSchema } from './schema'
import { defineComponent, reactive, toRefs } from 'vue'
import { templateInit } from '../../utils'
import uiIndex from '/@/lib/UI/src/input/index'

export default defineComponent({
  components: { uiIndex },
  props: {
    uuid: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { uuid } = toRefs(props)
    // 数据集合
    const dataItem = reactive<Partial<InputSchema>>({})

    templateInit<Partial<InputSchema>>(uuid, dataItem)

    console.log(dataItem)

    return { dataItem }
  }
})
</script>

<style lang="less" scoped></style>
