<template>
  <div class="login-account">
    <div v-show="error.is" class="index-msg-error">
      <div class="index-msg-error-error-div index-middle">
        <InfoCircleFilled class="index-msg-error-error-div-icon" />
        <span>{{ error.msg }}</span>
      </div>
    </div>
    <GlobalInput
      v-model:value="formData.account"
      v-model:errorBorder="error.is"
      type="text"
      :placeholder="`手机号/邮件地址/${MixinConfig.shortTitle}账号`"
      @on-enter="onEnter"
    />
    <GlobalInput
      v-model:value="formData.password"
      v-model:errorBorder="error.is"
      class="login-account-password"
      type="password"
      placeholder="密码"
      @on-enter="onEnter"
    />
    <span class="login-account-change-link" @click="onChange"> 短信验证码登录 </span>
    <GlobalButton
      ref="buttonInstance"
      class="login-account-button"
      :size="1"
      :disabled="!(!!formData.account && !!formData.password)"
      @on-click="onButtonClick"
    >
      登 录
    </GlobalButton>
    <div class="login-account-link">
      <router-link :to="{ name: PageEnum.BASE_REGISTER }">
        注册
      </router-link>
      <a-divider type="vertical" />
      <router-link :to="{ name: 'reset-password' }">
        忘记密码
      </router-link>
      <a-divider type="vertical" />
      <router-link :to="{ name: 'help' }">
        帮助中心
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { PageEnum } from '/@/enums/pageEnum'
import { Instance } from '/@/lib/interface/GlobalButton'
import { userStore } from '/@/store/modules/user'

export default defineComponent({
  emits: ['on-change', 'on-success'],
  setup(_props, { emit }) {
    // 数据加载
    const loading = ref<boolean>(false)

    const buttonInstance = ref<Instance | null>(null)

    const formData = reactive({ account: '', password: '' })

    // 错误信息
    const error = reactive({ msg: '', is: false })

    // 点击短信登录
    const onChange = () => emit('on-change', 'account')

    const onEnter = () => handleUserLogin()

    const onButtonClick = (event: MouseEvent) => handleUserLogin(event.offsetX, event.offsetY)

    async function handleUserLogin(x?: number, y?: number) {
      if (!formData.account || !formData.password || loading.value) return
      buttonInstance.value?.startAnimation(x, y)
      try {
        loading.value = true
        const userInfo = await userStore.login(formData)
        emit('on-success', userInfo)
      } catch (err) {
        error.is = true
        error.msg = err.msg
        buttonInstance.value?.stopAnimation()
      } finally {
        loading.value = false
      }
    }

    return {
      error,
      PageEnum,
      formData,
      onEnter,
      onChange,
      onButtonClick,
      buttonInstance
    }
  }
})
</script>

<style lang="less" scoped>
@linkColor: @primary-color;

.login-account {
  &-password {
    margin: 26px 0 0;
  }

  &-change-link {
    display: inline-block;
    padding: 16px 0 0;
    color: @linkColor;
    cursor: pointer;
  }

  &-link {
    margin: 32px 0 0;
    color: @linkColor;
    text-align: center;

    .ant-divider {
      background: #d9d9d9;
    }

    &-button {
      cursor: pointer;
    }
  }

  &-button {
    margin: 32px 0 0;
  }
}
</style>
