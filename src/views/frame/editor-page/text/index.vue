<template>
  <div class="editor-wrap">
    <public-header class="editor-header p-3">
      <template #left>
        <input class="title-input" placeholder="输入标题..." maxlength="80" />
      </template>
    </public-header>
    <public-editor
      v-model:value="handbook"
      v-model:lineCount="lineCount"
      class="editor-content-area"
      :configs="configs"
      :preview="true"
    />

    <div class="editor-footer">
      <div class="index-middle">
        <master-state />
      </div>
      <div class="index-middle fs-3">
        <div class="mr-2">
          <span class="mr-1">lines：</span>
          <span class="w-20 inline-block">{{ lineCount }}</span>
        </div>
        <div>
          <span class="mr-1">words：</span>
          <span class="w-20 inline-block">{{ wordCount(handbook) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import masterState from './components/masterState.vue';
import wordCount from '/@/utils/wordCount';

export default defineComponent({
  components: { masterState },
  setup() {
    const configs = reactive({
      parsingConfig: {
        strikethrough: false,
        underscoresBreakWords: true
      },
      shortcuts: {
        toggleSideBySide: null,
        toggleFullScreen: null
      },
      renderingConfig: {
        singleLineBreaks: false,
        codeSyntaxHighlighting: true
      },
      placeholder: '开始描述您的问题'
    });

    const lineCount = ref<number>(0);

    const handbook = ref<string>('');

    return { configs, lineCount, handbook, wordCount };
  }
});
</script>

<style lang="less" scoped>
.editor-wrap {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .editor {
    &-header {
      border-bottom: 1px solid #ddd;
    }

    &-content-area {
      flex: 1;
      overflow: auto;

      ::v-deep(.vditor) {
        height: 100%;
      }
    }

    &-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 4px 10px;
      border-top: 1px solid #ddd;
    }
  }

  .title-input {
    flex: 1;
    height: 28px;
    font-size: 20px;
    font-weight: 700;
    line-height: 28px;
    color: #000;
    border: none;
    outline: none;
  }
}
</style>
