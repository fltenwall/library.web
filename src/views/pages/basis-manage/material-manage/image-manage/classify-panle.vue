<template>
  <div class="classify-panle">
    <div class="classify-panle-header">
      <div>分组名称</div>
      <div>操作</div>
    </div>
    <Scrollbar class="classify-panle-main">
      <a-spin :spinning="loading">
        <a-menu v-model:selectedKeys="selectedKeys" class="main-menu" @select="handleSelect">
          <a-menu-item key="">
            <div class="classify-item-title">
              全部
            </div>
          </a-menu-item>
          <a-menu-item v-for="item in dataSource" :key="item.id">
            <div class="classify-item">
              <div class="classify-item-title">
                {{ item.title }}
              </div>
              <div class="classify-item-operation">
                <span @click="handleEditor(item)">编辑</span>
                <span>删除</span>
              </div>
            </div>
          </a-menu-item>
          <a-menu-item v-if="visible" key="new-classify">
            <a-input
              ref="inputRef"
              v-model:value="cTitle"
              placeholder="新建分组"
              @blur="onNewData"
            />
          </a-menu-item>
        </a-menu>
      </a-spin>
    </Scrollbar>
    <div class="classify-panle-footer index-center-middle pb-2 pt-2">
      <a-button @click="handleNewGroup">
        新建分组
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref, unref } from 'vue'
import { Scrollbar } from '/@/components/Scrollbar'
import service, { ImageManage } from '/@/api/basis-manage/material-manage/image-manage'
import { message } from 'ant-design-vue'

export default defineComponent({
  components: { Scrollbar },
  emits: ['on-select'],
  setup(_props, { emit }) {
    // 对话框显示
    const inputRef = ref<{ focus: () => void } | null>(null)
    const visible = ref<boolean>(false)
    // 数据
    const cTitle = ref<string>('')
    const loading = ref<boolean>(false)
    // 数据源
    const dataSource = ref<ImageManage[]>([])
    // 选中数据
    const selectedKeys = ref<string[]>([''])

    // 处理新建分组
    function handleNewGroup() {
      if (loading.value) return
      visible.value = true
      cTitle.value = ''
      selectedKeys.value = ['new-classify']
      nextTick(() => inputRef.value?.focus())
    }

    // 获取服务器数据
    async function fetchDataFromServer() {
      try {
        const { data } = await service.fecthClassifyList()
        dataSource.value = data
      } catch (err) {
        message.error(err.msg)
      } finally {
        loading.value = false
      }
    }

    // 保存数据
    async function onNewData() {
      if (!unref(cTitle)) {
        visible.value = false
        return
      }

      try {
        loading.value = true
        await service.saveClassifyNewItem({ title: unref(cTitle) })
        visible.value = false
        fetchDataFromServer()
      } catch (err) {
        message.error(err.msg)
      } finally {
        loading.value = false
      }
    }

    // 选中数据
    async function handleSelect({ key }: { key: string }) {
      const record = unref(dataSource).find((el) => el.id === key) || {}
      emit('on-select', record)
    }

    // 处理编辑
    function handleEditor(record: ImageManage) {
      console.log(record)
    }

    fetchDataFromServer()

    return {
      cTitle,
      visible,
      inputRef,
      loading,
      dataSource,
      selectedKeys,
      onNewData,
      handleSelect,
      handleEditor,
      handleNewGroup
    }
  }
})
</script>

<style lang="less" scoped>
.classify-panle {
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &-header {
    display: flex;
    justify-content: space-between;
    padding: 13px 20px;
    color: rgba(0, 0, 0, 0.45);
    background: #f3f5f7;
    border: 1px solid #e3e3e3;
    border-radius: 2px 2px 0 0;
  }

  &-main {
    flex: 1;
    height: 0;
    border-right: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;

    .main-menu {
      border-right-width: 0;
    }
  }

  &-footer {
    border: 1px solid #e3e3e3;
    border-radius: 0 0 2px 2px;
  }

  .classify-item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-title {
      display: flex;
      align-items: center;

      &::before {
        width: 18px;
        height: 18px;
        margin: 0 10px 0 0;
        background-image: url('../../../../../assets/svg/classify.svg');
        background-size: 100% 100%;
        content: '';
      }
    }

    &-operation {
      font-size: 12px;

      span:not(:first-of-type) {
        margin: 0 0 0 5px;
      }

      span {
        color: @primary-color;
        // opacity: 0;

        &:hover {
          color: @primary-hover-color;
        }
      }
    }
  }
}
</style>
