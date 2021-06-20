<template>
  <div class="folder-panle">
    <div class="folder-panle-header">
      <div>分组名称</div>
      <div>操作</div>
    </div>
    <Scrollbar class="folder-panle-main">
      <div class="folder-item">
        <div class="folder-item-title">
          全部
        </div>
      </div>
      <div class="folder-item">
        <div class="folder-item-title">
          分组
        </div>
        <div class="folder-item-operation">
          <span>编辑</span>
          <span>删除</span>
        </div>
      </div>
    </Scrollbar>
    <div class="index-center-middle mb-2 mt-2">
      <a-button @click="handleNewGroup">
        新建分组
      </a-button>
    </div>

    <a-modal v-model:visible="visible" title="新建分组" width="300px" centered>
      <a-input :maxlength="8">
        <template #suffix>
          <span>0/8</span>
        </template>
      </a-input>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Scrollbar } from '/@/components/Scrollbar'

export default defineComponent({
  components: { Scrollbar },
  setup() {
    // 对话框显示
    const visible = ref<boolean>(false)

    // 处理新建分组
    function handleNewGroup() {
      visible.value = true
    }

    return { visible, handleNewGroup }
  }
})
</script>

<style lang="less" scoped>
.folder-panle {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #e3e3e3;
  border-radius: 8px;

  &-header {
    display: flex;
    justify-content: space-between;
    padding: 13px 20px;
    color: rgba(0, 0, 0, 0.45);
    background: #f3f5f7;
  }

  &-main {
    flex: 1;
    height: 0;
  }

  .folder-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    padding: 0 20px;
    cursor: pointer;

    &-title {
      display: flex;
      align-items: center;

      &::before {
        width: 18px;
        height: 18px;
        margin: 0 10px 0 0;
        background-image: url('../../../../../assets/svg/folder.svg');
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

    &:hover {
      background: rgba(98, 60, 235, 0.05);

      span {
        opacity: 1;
      }
    }
  }
}
</style>
