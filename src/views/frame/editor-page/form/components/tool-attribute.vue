<template>
  <a-form-item label="宽度">
    <ui-input v-model:value="dataItem.width" prop="width" type="number" />
  </a-form-item>
  <a-form-item label="高度">
    <ui-input v-model:value="dataItem.height" prop="height" />
  </a-form-item>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { templateInit } from './tools/utils'
import uiInput from '/@/lib/UI/src/input/index'

export default defineComponent({
  components: { uiInput },
  setup() {
    // 数据集合
    const dataItem = reactive({})

    templateInit(dataItem)

    return { dataItem }
  }
})
</script>

<style lang="less" scoped></style>
