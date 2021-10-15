<template>
  <a-popover
    trigger="click"
    placement="bottomRight"
    overlay-class-name="table-list-popover"
    :arrow-point-at-center="true"
    :get-popup-container="(trigger: HTMLElement) => trigger.parentNode"
  >
    <tooltip-button title="列设置">
      <setting-outlined />
    </tooltip-button>

    <template #title>
      <div class="pt-1 pb-1">
        <a-checkbox
          v-model:checked="checkAll"
          :indeterminate="indeterminate"
          @change="onCheckAllChange"
        >
          列设置
        </a-checkbox>
      </div>
    </template>
    <template #content>
      <a-checkbox-group
        v-model:value="checkedList"
        :options="plainOptions"
        @change="onCheckChange"
      />
    </template>
  </a-popover>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { State, Options } from '/@/lib/props/TableList';
import TooltipButton from './TooltipButton.vue';
import { injectTable } from './useDepend';

export default defineComponent({
  components: { TooltipButton },
  setup() {
    // 获取向上传递方法和数据g
    const table = injectTable();
    // 多选选中
    let plainOptions: Options[] = [];
    // 设置状态
    const state = reactive<State>({
      indeterminate: false,
      checkAll: true,
      checkedList: [],
      defaultCheckList: []
    });

    // 初始化数据
    function init() {
      const result: Options[] = [];
      table.getColumns().forEach((item) => {
        result.push({
          label: item.title as string,
          value: (item.dataIndex || item.title) as string
        });
      });
      plainOptions = result;
      const checkList = table.getColumns().map((item) => item.dataIndex || item.title) as string[];
      state.checkedList = checkList;
    }

    init();

    // 处理多选改变
    function onCheckChange(checkedList: string[]) {
      state.indeterminate = !!checkedList.length && checkedList.length < plainOptions.length;
      state.checkAll = checkedList.length === plainOptions.length;
      table.setColumns(checkedList);
    }

    // 点击全选
    function onCheckAllChange(e: ChangeEvent) {
      state.indeterminate = false;
      const checkList = plainOptions.map((item) => item.value);
      if (e.target.checked) {
        state.checkedList = checkList;
        table.setColumns(checkList);
      } else {
        state.checkedList = [];
        table.setColumns([]);
      }
    }

    return { plainOptions, ...toRefs(state), onCheckAllChange, onCheckChange };
  }
});
</script>

<style lang="less">
.table-list-popover .ant-popover-inner-content {
  padding-right: 0;
  padding-left: 0;

  .ant-checkbox-group {
    width: 100%;

    label {
      display: block;
      padding: 4px 16px;
      margin: 0;
    }

    label:hover {
      background: rgba(1, 143, 251, 0.1);
    }
  }
}
</style>
