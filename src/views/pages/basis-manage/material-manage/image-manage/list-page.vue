<template>
  <div class="index-content">
    <GlobalCard title="图片管理" class="flex-item flex flex-column default-shadow h0">
      <div class="flex-item flex h0">
        <classify-panle class="folder-panle-wrap mr-4" @on-select="handleSelect" />
        <list-view ref="listInstance" class="flex-item" :classify="selectData" />
      </div>
    </GlobalCard>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Classify } from '/@/api/basis-manage/material-manage/image-manage'
import listView from './list-view.vue'
import classifyPanle from './classify-panle.vue'

export default defineComponent({
  components: { listView, classifyPanle },
  setup() {
    // 选中数据
    const selectData = ref<Classify>({})

    // 处理选中数据
    function handleSelect(record: Classify) {
      selectData.value = record
    }

    return { selectData, handleSelect }
  }
})
</script>

<style lang="less" scoped>
.index-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.folder-panle-wrap {
  width: 30%;
  max-width: 350px;
  min-width: 300px;
}
</style>
