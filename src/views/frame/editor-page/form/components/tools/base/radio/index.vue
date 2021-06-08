<template>
  <div>radio</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { queryPoint } from '../../utils'

export default defineComponent({
  props: {
    uuid: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    // 拖拽数据信息
    const point = queryPoint(props.uuid)

    console.log(point)

    return {}
  }
})
</script>

<style lang="less" scoped></style>
