<template>
  <a-row>
    <a-col :span="24" :lg="{ span: 12 }">
      <a-form layout="vertical">
        <a-form-item label="昵称">
          <a-input v-model:value="dataItem.nickname" />
        </a-form-item>
        <a-form-item label="个人介绍">
          <a-textarea
            v-model:value="dataItem.description"
            placeholder="最多输入 100 字"
            :maxlength="100"
            :auto-size="{ minRows: 2, maxRows: 5 }"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary"> 保存 </a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { userStore } from '/@/store/modules/user';
import { UserInfo } from '/@/api/security';
import { cloneDeep } from 'lodash-es';

export default defineComponent({
  setup() {
    const dataItem = reactive<UserInfo>(cloneDeep(userStore.getUserInfoState!));

    return { dataItem };
  }
});
</script>

<style lang="less" scoped></style>
