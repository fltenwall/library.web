<template>
  <div class="account-setting-base">
    <!-- 左边 -->
    <a-form layout="vertical" class="account-setting-base__left">
      <a-form-item label="昵称">
        <a-input v-model:value="userInfo.nickname" />
      </a-form-item>
      <a-form-item label="个人介绍">
        <a-textarea
          v-model:value="userInfo.description"
          placeholder="最多输入 100 字"
          :maxlength="100"
          :auto-size="{ minRows: 2, maxRows: 5 }"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary"> 保存 </a-button>
      </a-form-item>
    </a-form>

    <!-- 右边 -->
    <div class="account-setting-base__right">
      <a-avatar :size="144" :src="`${MixinConfig.preview}${userInfo.portrait}`">
        <template #icon>
          <user-outlined />
        </template>
      </a-avatar>

      <a-button class="mt5" @click="visible = true"> 修改 </a-button>
    </div>
  </div>

  <material-modal
    v-model:value="visible"
    :dict-type="DICT_TYPE"
    :dict-value="DICT_VALUE"
    :maxlength="1"
    @select="handleSelectMaterial"
  />
</template>

<script setup lang="ts">
import type { ImageManage } from '/@/api/basis-manage/material-manage/image-manage';
import { reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import { userStore } from '/@/store/modules/user';
import service, { UserInfo } from '/@/api/security';

const DICT_TYPE = 'image_manage';
const DICT_VALUE = 'user_portrait';

const userInfo = reactive<UserInfo>({ ...userStore.getUserInfoState });
// 对话框
const visible = ref<boolean>(false);

// 处理上传成功 更新图片

function handleSelectMaterial([content]: ImageManage[]) {
  updateUserAccount({ portrait: content.hash });

  userInfo.portrait = content.hash;
}

// 更新数据
async function updateUserAccount(params: UserInfo) {
  try {
    const { data } = await service.updateAccountInfo(params);

    userStore.commitUserInfoState(data);
  } catch (err) {
    message.error((err as { msg: string }).msg);
  }
}
</script>

<style lang="less" scoped>
.account-setting-base {
  display: flex;

  &__left {
    width: 318px;
  }

  &__right {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 318px;
    padding-top: 30px;
  }
}

@media screen and (max-width: 1200px) {
  .account-setting-base {
    flex-direction: column-reverse;
  }
}
</style>
