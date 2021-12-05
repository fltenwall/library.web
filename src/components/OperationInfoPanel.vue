<template>
  <global-card :title="title">
    <div class="operation">
      <div class="operation-left">
        <div class="index-middle operation-box">
          <user-outlined class="operation-icon" />
          <div class="operation-title">创建者</div>
          <div>{{ data.createBy }}</div>
        </div>
        <div class="index-middle operation-box">
          <user-outlined class="operation-icon" />
          <div class="operation-title">更新者</div>
          <div>{{ data.updateBy }}</div>
        </div>
      </div>
      <div class="operation-right">
        <div class="index-middle operation-box">
          <calendar-outlined class="operation-icon" />
          <div class="operation-title">创建时间</div>
          <div>{{ useMoment(data.createTime) }}</div>
        </div>
        <div class="index-middle operation-box">
          <calendar-outlined class="operation-icon" />
          <div class="operation-title">更新时间</div>
          <div>{{ useMoment(data.updateTime) }}</div>
        </div>
      </div>
    </div>
  </global-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { UserOutlined, CalendarOutlined } from '@ant-design/icons-vue';
import { useMoment } from '/@/utils/dateFormat';

export default defineComponent({
  components: { UserOutlined, CalendarOutlined },
  props: {
    title: {
      type: String,
      default: '操作信息'
    },
    data: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  setup() {
    return { useMoment };
  }
});
</script>

<style lang="less" scoped>
.operation {
  display: flex;

  &-left {
    margin: 0 0 0 90px;
  }

  &-right {
    margin: 0 0 0 80px;
  }

  &-box {
    padding: 10px 0 10px;
  }

  &-title {
    margin: 0 0 0 15px;
  }

  &-title::after {
    margin: 0 15px 0 0;
    content: ' :';
  }

  &-icon {
    font-size: 16px;
  }
}
</style>
