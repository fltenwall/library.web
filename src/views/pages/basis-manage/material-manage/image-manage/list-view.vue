<template>
  <div class="list-view">
    <div class="list-view-header">
      <div>{{ title }}</div>
    </div>
    <div class="flex-item flex flex-column list-view-cotent">
      <image-list
        :data-source="dataSource"
        :total-elements="totalElements"
        :classify-id="classifyId"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ProblemManage } from '/@/api/basis-manage/problem-manage'
import { injectListPage } from '/@/lib/idata/data-list/methods/useDepend'
import imageList from './components/image-list.vue'

export default defineComponent({
  components: { imageList },
  props: {
    title: {
      type: String,
      default: '全部'
    },
    classifyId: {
      // 分组
      type: String,
      default: ''
    }
  },
  emits: ['on-page-change', 'on-refresh'],
  setup() {
    // 数据源
    const dataSource = ref<ProblemManage[]>([])
    // 总数据
    const totalElements = ref<number>(0)
    //
    const listPage = injectListPage<ProblemManage>()
    // 选中的 按钮
    const selectRadio = ref<number>(1)
    // 数据加载
    const loading = listPage.loading

    return {
      loading,
      dataSource,
      selectRadio,
      totalElements
    }
  },
  methods: {
    // 设置数据源
    setDataSource(data: ProblemManage[], total: number) {
      this.dataSource = data
      this.totalElements = total
    }
  }
})
</script>

<style lang="less" scoped>
.list-view {
  display: flex;
  flex-direction: column;

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 9px 0 9px;
  }

  &-main {
    flex: 1;
    height: 0;
  }

  &-cotent {
    height: 0;
  }

  &-footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
