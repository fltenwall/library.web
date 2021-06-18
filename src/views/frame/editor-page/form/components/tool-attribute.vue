<template>
  <div class="flex">
    <div class="flex-item mr-3 index-middle">
      <div class="flex-shrink-0 w-6">
        w
      </div>
      <ui-input v-model:value="dataItem.width" prop="width" type="number" />
    </div>
    <div class="flex-item index-middle">
      <div class="flex-shrink-0 w-6">
        h
      </div>
      <ui-input v-model:value="dataItem.height" prop="height" type="number" />
    </div>
  </div>
  <div class="flex mt-4">
    <div class="flex-item mr-3 index-middle">
      <div class="flex-shrink-0 w-6">
        x
      </div>
      <ui-input v-model:value="dataItem.x" prop="x" type="number" />
    </div>
    <div class="flex-item index-middle">
      <div class="flex-shrink-0 w-6">
        y
      </div>
      <ui-input v-model:value="dataItem.y" prop="y" type="number" />
    </div>
  </div>
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
