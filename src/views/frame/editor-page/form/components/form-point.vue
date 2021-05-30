<template>
  <a-form-item label="标签宽度">
    <InputWrap />
  </a-form-item>
  <a-form-item label="标签位置">
    <SelectWrap>
      <a-select-option value="jack">
        左对齐
      </a-select-option>
      <a-select-option value="lucy">
        右对齐
      </a-select-option>
    </SelectWrap>
  </a-form-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    uuid: {
      type: String,
      default: ''
    }
  }
})
</script>
