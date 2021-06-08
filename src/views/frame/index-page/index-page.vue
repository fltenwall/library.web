<template>
  <PublicHeader>
    <template #right>
      <div class="header-setting">
        设置
      </div>
    </template>
  </PublicHeader>
  <index-main />
  <index-footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import indexMain from './index-main.vue'
import indexFooter from './index-footer.vue'
export default defineComponent({
  components: { indexMain, indexFooter }
})
</script>

<style lang="less" scoped>
.header-setting {
  font-size: 13px;
  cursor: pointer;
}
</style>
