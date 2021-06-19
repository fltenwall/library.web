<template>
  <div class="c333 mb-2">
    页面尺寸
  </div>
  <div class="flex flex-space-between index-middle">
    <div>宽度</div>
    <ui-input class="w-100" />
  </div>
  <div class="flex flex-space-between index-middle mt-2">
    <div>高度</div>
    <ui-input class="w-100" />
  </div>
  <a-divider />
  <div class="flex flex-space-between index-middle">
    <div class="c333">
      布局类型
    </div>
    <a-radio-group class="flex-end flex" value="a">
      <a-radio-button value="a">
        自由布局
      </a-radio-button>
      <a-radio-button value="b">
        弹性布局
      </a-radio-button>
    </a-radio-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import uiInput from '/@/lib/UI/src/input/index'

export default defineComponent({
  components: { uiInput }
})
</script>
