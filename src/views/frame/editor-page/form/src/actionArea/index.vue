<template>
  <div class="action-area absolute">
    <GlobalDrawer v-model:value="visible" placement="right">
      <div class="action-area-header index-middle">
        {{ pointConfigs.name[pointInfo.name || 'form'] }}
      </div>
      <a-form class="action-area-main" label-align="left">
        <component :is="`${pointInfo.name || 'form'}-point`" />
      </a-form>
    </GlobalDrawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'
import { templateList } from '../../components/tools/template'
import { pointStore } from '/@/store/modules/point'
import { pointConfigs } from '../../components/tools/index'
import formPoint from '../../components/form-point.vue'

export default defineComponent({
  components: { formPoint, ...templateList },
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

    return { visible, pointConfigs, pointInfo }
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
    height: 64px;
    padding: 0 0 0 20px;
    font-size: 18px;
    color: #292b33;
  }

  &-main {
    padding: 0 20px;

    ::v-deep(.ant-row) {
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
  }
}
</style>
