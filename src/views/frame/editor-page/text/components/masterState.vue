<template>
  <a-dropdown>
    <icon class="pointer" icon="mdi:language-markdown" size="30" />
    <template #overlay>
      <div class="master-content" @click.stop>
        <div class="master-content-title">快捷键</div>
        <table class="w100">
          <thead>
            <tr>
              <th>Markdown</th>
              <th>结果</th>
              <th>快捷键</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in tableContent" :key="item.title">
              <td>{{ item.title }}</td>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <td v-html="item.result" />
              <td>{{ item.shortcut }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </a-dropdown>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const tableContent: { title: string; result: string; shortcut: string }[] = [
      { title: '# 标题', result: 'H1', shortcut: '' },
      { title: '## 标题', result: 'H2', shortcut: 'Ctrl / ⌘ + H' },
      { title: '*斜体*', result: '<em>斜体</em>', shortcut: 'Ctrl / ⌘ + I' },
      { title: '**bold**', result: '<b>粗体</b>', shortcut: 'Ctrl / ⌘ + B' },
      { title: 'preview', result: '预览', shortcut: 'Ctrl / ⌘ + P' },
      { title: '[描述](http://)', result: '<a>链接</>', shortcut: 'Ctrl / ⌘ + K' },
      { title: '* item', result: '无序列表', shortcut: 'Ctrl / ⌘ + L' },
      { title: '![alt](http://)', result: '图片', shortcut: 'Ctrl / ⌘ + Alt + I' },
      { title: '1. item', result: '有序列表', shortcut: 'Ctrl / ⌘ + Alt + L' },
      { title: '`code`', result: '<pre>Inline Code</pre>', shortcut: 'Ctrl / ⌘ + Alt + C' }
    ];

    return { tableContent };
  }
});
</script>

<style lang="less" scoped>
.master {
  &-content {
    width: 408px;
    padding: 25px;
    margin: 0 0 5px;
    cursor: default;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;

    &-title {
      font-size: 20px;
      color: rgba(119, 127, 141, 0.8);
    }

    th,
    td {
      padding: 10px 0;

      ::v-deep(a) {
        cursor: default;
      }

      ::v-deep(pre) {
        display: inline-block;
        padding: 0 4px;
        margin: 0;
        color: #4e5980;
        background-color: #f8f8f8;
        border-radius: 2px;
      }
    }
  }
}
</style>
