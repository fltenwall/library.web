<template>
  <Preview class="index-content" :value="selectContent" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Preview from '/@/components/PublicEditor/src/Preview'
export default defineComponent({
  components: { Preview },
  props: {
    selectContent: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="less" scoped></style>
