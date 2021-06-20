<template>
  <div class="flex flex-column editor-form-wrap">
    <PublicHeader class="editor-form-header" :is-show-user-info="false">
      <template #left>
        <div class="index-theme header-left index-middle index-hidden-newline">
          <div>表单样式设计</div>
          <div class="button index-center-middle ml-10 mr-4">
            <Icon
              icon="ion:arrow-undo-sharp"
              class="point-history mr-4"
              :disable="!linkedState.undo"
              @click="handleUndo"
            />
            <Icon
              icon="ion:arrow-redo-sharp"
              class="point-history"
              :disable="!linkedState.redo"
              @click="handleRedo"
            />
          </div>
        </div>
      </template>
      <template #center>
        <div class="header-input index-theme index-center-middle">
          <input
            ref="inputRef"
            :value="pageOptions.name"
            class="name-input mr-2"
            @focus="onInputFocus"
            @blur="onInputBlur"
            @input="onInputChange"
          >
          <div class="edit-icon-wrap">
            <Icon v-show="!inputState" icon="entypo:edit" class="pointer" @click="onClickEdit" />
          </div>
        </div>
      </template>
      <template #right>
        <div class="header-right flex">
          <div class="button pointer index-center-middle">
            保存
          </div>
          <div class="button pointer index-center-middle">
            预览
          </div>
          <div class="button-primary index-center-middle" @click="onGoBack">
            返回
          </div>
        </div>
      </template>
    </PublicHeader>
    <div class="flex flex-item hidden editor-form-main relative">
      <tool-area />
      <view-area class="flex-item" @on-click-point="handleClickPoint" />
      <action-area v-model:value="actionItem.visible" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, reactive, ref, unref } from 'vue'
import { useRouter } from 'vue-router'
import actionArea from './src/actionArea/index.vue'
import toolArea from './src/toolArea/index.vue'
import viewArea from './src/viewArea/index.vue'
import service from '/@/api/page-manage/form-page'
import { pointStore } from '/@/store/modules/point'
import pointLinked from './utils/pointLinked'
import useViewSize from './utils/useViewSize'

export default defineComponent({
  components: { actionArea, toolArea, viewArea },
  setup() {
    const pageOptions = computed(() => pointStore.getPageOptionsState)

    const { currentRoute, back } = useRouter()

    const inputRef = ref<HTMLElement | null>(null)

    const inputState = ref<boolean>(false)

    const actionItem = reactive<{ visible: boolean }>({ visible: false })
    // 处理点击编辑
    const onClickEdit = () => inputRef.value?.focus()
    // 处理页面返回
    const onGoBack = () => back()
    // 处理输入框获取焦点
    const onInputFocus = () => (inputState.value = true)
    // 处理输入框失去焦点
    const onInputBlur = () => (inputState.value = false)
    // 处理输入内容
    function onInputChange(e: Event) {
      const value = (e.target as unknown as { value: string }).value
      pointStore.commitUpdatePageOptionsState({ key: 'name', value })
    }

    // 使用链表
    const linked = pointLinked()

    // 视图大小
    useViewSize()

    // 通过ID加载数据
    async function onLoadDataById(id: number) {
      const { data } = await service.getItemById(id)
      pointStore.commitSetPageOptionsState(data)
    }

    // 点击 point
    function handleClickPoint() {
      actionItem.visible = false
    }

    onBeforeUnmount(() => pointStore.commitEmptyState())

    onLoadDataById(+unref(currentRoute).params.id)

    return {
      actionItem,
      pageOptions,
      inputRef,
      inputState,
      onClickEdit,
      onInputFocus,
      onInputBlur,
      onInputChange,
      onGoBack,
      ...linked,
      handleClickPoint
    }
  }
})
</script>

<style lang="less" scoped>
.editor-form {
  &-wrap {
    height: 100vh;
    background: #f5f6fa;
  }

  &-header {
    position: relative;
    z-index: 11;
    height: 54px;
    background: #fff;
    box-shadow: 0 2px 4px 0 #dbdbdb99;
  }
}

.header {
  &-left {
    height: 100%;
    font-size: 18px;
    font-weight: bold;
    color: @primary-color;
  }

  &-input {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 0 0 20px;
    font-size: 18px;
    color: @primary-color;
    transform: translate(-50%, -50%);

    .name-input {
      position: relative;
      width: 120px;
      margin: 0 10px 0 0;
      overflow: hidden;
      color: #292b33;
      text-align: center;
      text-overflow: ellipsis;
      cursor: pointer;
      border: 0 solid transparent;
      border-bottom: 1px solid transparent;
      outline: none;
      caret-color: @primary-color;

      &:focus {
        cursor: text;
        // border-bottom-color: @primary-color;
      }
    }
  }

  &-right {
    .button {
      &-primary {
        height: 32px;
        padding: 0 16px;
        color: #fff;
        cursor: pointer;
        background: linear-gradient(0deg, #2c63ff, #2c83ff);
        border-radius: 16px;
        user-select: none;

        &:active {
          background: linear-gradient(0deg, #2758e5, #2775e5);
        }

        &:hover {
          background: linear-gradient(0deg, #4172ff, #418fff);
        }
      }
    }
  }
}

.button {
  height: 32px;
  padding: 0 16px;
  color: #5c5f66;
  border-radius: 16px;
  box-shadow: 0 2px 8px 0 #e6e9f2;
  user-select: none;

  &:hover {
    color: #292b33;
  }

  &:active {
    color: #2c63ff;
  }

  &:not(:last-of-type) {
    margin: 0 24px 0 0;
  }
}

.point-history {
  font-size: 18px;
  cursor: pointer;

  &[disable='true'] {
    color: #dadde6;
    cursor: default;
  }

  &[disable='false'] {
    color: #5c5f66;

    &:hover {
      color: #292b33;
    }
  }
}

.edit-icon {
  &-wrap {
    width: 14px;
  }
}
</style>
