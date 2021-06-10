<template>
  <a-modal title="操作日志详细" :width="700" :visible="visible" @cancel="onCancel">
    <a-row type="flex" class="pb-5">
      <a-col span="12">
        <div class="row-title">
          操作模块
        </div>
        <div class="row-content">
          {{ queryModule(data.path) }}
        </div>
      </a-col>
      <a-col span="12">
        <div class="row-title">
          请求地址
        </div>
        <div class="row-content">
          {{ data.path }}
        </div>
      </a-col>
    </a-row>
    <a-row type="flex" class="pb-5">
      <a-col span="12">
        <div class="row-title">
          登录信息
        </div>
        <div class="row-content">
          <span>{{ data.account }}</span>
          <span> / </span>
          <span>{{ data.ip }}</span>
        </div>
      </a-col>
      <a-col span="12">
        <div class="row-title">
          请求方式
        </div>
        <div class="row-content">
          {{ data.method }}
        </div>
      </a-col>
    </a-row>
    <a-row type="flex" class="pb-5">
      <a-col>
        <div class="row-title">
          操作地点
        </div>
        <div class="row-content">
          <span v-if="data.ipRecord.nation">{{ data.ipRecord.nation }}</span>
          <span v-if="data.ipRecord.province">{{ data.ipRecord.province }}</span>
          <span v-if="data.ipRecord.city">{{ data.ipRecord.city }}</span>
          <span v-if="data.ipRecord.district">{{ data.ipRecord.district }}</span>
        </div>
      </a-col>
    </a-row>
    <a-row type="flex" class="pb-5">
      <a-col>
        <div class="row-title">
          请求参数
        </div>
        <div class="row-content index-newline">
          {{ data.param }}
        </div>
      </a-col>
    </a-row>
    <a-row type="flex" class="pb-5">
      <a-col>
        <div class="row-title">
          操作环境
        </div>
        <div class="row-content">
          <span> {{ data.os }}</span>
          <span> / </span>
          <span>{{ data.browser }}</span>
        </div>
      </a-col>
    </a-row>
    <a-row type="flex" class="pb-5">
      <a-col span="12">
        <div class="row-title">
          操作状态
        </div>
        <div class="row-content">
          <span>{{ data.status }}</span>
        </div>
      </a-col>
      <a-col span="12">
        <div class="row-title">
          操作时间
        </div>
        <div class="row-content">
          {{ useFromatlll(data.createTime) }}
        </div>
      </a-col>
    </a-row>

    <template #footer>
      <a-button @click="onCancel">
        关闭
      </a-button>
    </template>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { queryModule } from '/@/utils/regExp'
import { useFromatlll } from '/@/utils/dateFormat'

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: ['update:visible'],
  setup(_props, { emit }) {
    // 用户点击取消
    const onCancel = () => emit('update:visible', false)

    return {
      onCancel,
      queryModule,
      useFromatlll
    }
  }
})
</script>

<style lang="less" scoped>
.row {
  word-break: break-all;
  word-wrap: break-word;

  &-title,
  &-content {
    display: inline-block;
  }

  &-title {
    width: 90px;
    font-size: #606266;
    font-weight: 700;
    text-align: right;

    &::after {
      margin: 0 15px 0 0;
      content: ':';
    }
  }
}
</style>
