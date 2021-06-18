<template>
  <div class="action-area absolute">
    <GlobalDrawer v-model:value="visible" placement="right">
      <div v-show="pointInfo.name">
        <div class="action-area-header index-middle index-space-between">
          <div>
            {{ pointConfigs.name[pointInfo.name] }}
          </div>
          <div>
            <QuestionCircleOutlined />
          </div>
        </div>
        <a-tabs size="small">
          <a-tab-pane key="1" tab="属性">
            <a-form class="action-area-main" label-align="left">
              <tool-attribute />
            </a-form>
          </a-tab-pane>
          <a-tab-pane key="2" tab="交互">
            <a-form class="action-area-main" label-align="left">
              <component :is="`${pointInfo.name}-point`" />
            </a-form>
          </a-tab-pane>
        </a-tabs>
      </div>
      <div v-show="!pointInfo.name" class="index-center-middle flex-column empty-content">
        <img :src="emptyImage" width="200">
        <div class="empty-content-title">
          暂无数据
        </div>
        <div class="empty-content-tips">
          拖拽组件来生成你的表单页面吧
        </div>
      </div>
    </GlobalDrawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'
import { templateList } from '../../components/tools/template'
import { pointStore } from '/@/store/modules/point'
import { pointConfigs } from '../../components/tools/index'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import toolAttribute from '../../components/tool-attribute.vue'
import emptyImage from '/@/assets/images/original.png'

export default defineComponent({
  components: { ...templateList, toolAttribute, QuestionCircleOutlined },
  props: {
    value: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const pointInfo = computed(() => pointStore.getPointInfo)

    // 折叠面板
    const visible = ref<boolean>(props.value)

    watch(
      () => visible.value,
      (val) => emit('update:value', val)
    )

    watch(
      () => props.value,
      (val) => (visible.value = val)
    )

    return { visible, emptyImage, pointConfigs, pointInfo }
  }
})
</script>

<style lang="less" scoped>
.action-area {
  right: 0;
  z-index: 2;
  width: 300px;
  height: 100%;

  &-header {
    padding: 10px 16px 0;
    font-size: 16px;
    font-weight: 500;
    color: #292b33;
  }

  &-main {
    padding: 0 16px;
  }

  ::v-deep(.ant-row) {
    margin-bottom: 10px;

    .ant-col {
      &.ant-form-item-control-wrapper {
        flex: 1;
        display: flex;
        justify-content: flex-end;

        .ant-form-item-control {
          width: 100%;
        }

        .select-wrap {
          min-width: 100%;
        }
      }
    }
  }

  ::v-deep(.ant-tabs) {
    .ant-tabs-nav-wrap {
      padding: 0 16px;
    }

    .ant-tabs-tab {
      padding: 8px 0;
    }
  }

  .empty-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &-title {
      margin: 20px 0 10px;
      font-size: 24px;
    }

    &-tips {
      color: rgba(0, 0, 0, 0.45);
    }
  }
}
</style>
