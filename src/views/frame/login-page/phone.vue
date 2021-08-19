<template>
  <div class="login-phone">
    <div v-show="error.phone" class="index-msg-error">
      <div class="index-msg-error-error-div index-middle">
        <InfoCircleFilled class="index-msg-error-error-div-icon" />
        <span v-if="error.code">帐号或者短信验证码错误，请重新输入</span>
        <span v-else-if="error.phone">手机号格式不正确 </span>
      </div>
    </div>
    <GlobalInput
      v-model:value="formData.phone"
      v-model:errorBorder="error.phone"
      type="phone"
      placeholder="手机号"
      :maxlength="20"
      @on-enter="onEnter"
      @on-blur="onPhoneBlur"
    />
    <GlobalInput
      v-model:value="formData.code"
      v-model:errorBorder="error.code"
      class="login-phone-code"
      type="code"
      placeholder="短信验证码"
      :code-disabled="!validData({ data: formData.phone, rule: 'telephone' })"
      :maxlength="8"
      @on-enter="onEnter"
    />
    <span class="login-phone-change-link" @click="onChange"> 密码登录 </span>
    <GlobalButton class="login-phone-button" :disabled="!(!!formData.phone && !!formData.code)">
      登 录
    </GlobalButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { validData } from '/@/utils/regExp';

export default defineComponent({
  emits: ['on-change'],
  setup(_props, { emit }) {
    const formData = reactive({
      phone: '',
      code: ''
    });
    // 错误信息
    const error = reactive({
      code: false,
      phone: false
    });
    const onChange = () => emit('on-change', 'phone');

    // 按下 Enter
    const onEnter = () => {
      // console.log(formData)
    };

    // 输入电话失去焦点
    const onPhoneBlur = () => {
      if (!formData.phone || validData({ data: formData.phone, rule: 'telephone' })) {
        error.phone = false;
      } else {
        error.phone = true;
      }
    };

    return { formData, error, validData, onEnter, onChange, onPhoneBlur };
  }
});
</script>

<style lang="less" scoped>
@linkColor: @primary-color;

.login-phone {
  color: #000;

  &-code {
    margin: 26px 0 0;
  }

  &-change-link {
    display: inline-block;
    padding: 16px 0 0;
    color: @linkColor;
    cursor: pointer;
  }

  &-button {
    margin: 32px 0 0;
  }
}
</style>
