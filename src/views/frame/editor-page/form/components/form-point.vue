<template>
  <div class="flex">
    <div class="flex-item mr-3 index-middle">
      <div class="flex-shrink-0 w-6">
        w
      </div>
      <ui-input />
    </div>
    <div class="flex-item index-middle">
      <div class="flex-shrink-0 w-6">
        h
      </div>
      <ui-input />
    </div>
  </div>
  <div class="mt-4 flex flex-space-between index-middle">
    <div>布局类型</div>
    <a-radio-group value="a">
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
