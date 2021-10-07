<template>
  <a-button type="link">
    {{ isOpen ? '收起 ' : '展开' }}
    <DownOutlined
      :class="['index-table-search-close']"
      :style="['transition: all 0.3s ease 0s;', `transform: rotate(${isOpen ? '0.5' : '0'}turn)`]"
    />
  </a-button>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import { DownOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  components: { DownOutlined },
  props: {
    isOpen: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  }
});
</script>
