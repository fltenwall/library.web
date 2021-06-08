<template>
  <div class="register-page-wrap">
    <div class="register-page">
      <div class="register-page-header">
        创建您的 {{ MixinConfig.shortTitle }} 帐号
      </div>
      <div class="flex register-page-content">
        <div class="content-left">
          <GlobalInput
            v-model:value="dataItem.username"
            placeholder="登录账户"
            :error-border="!!errorTip.username"
            @on-input="handleDataContent('username')"
          />
          <div class="error-tip">
            {{ errorTip.username }}
          </div>
          <GlobalInput
            v-show="content.mode"
            v-model:value="dataItem.email"
            placeholder="邮件地址"
            :error-border="!!errorTip.email"
            @on-input="handleDataContent('email', 'input')"
            @on-blur="handleDataContent('email', 'blur')"
          />
          <div v-show="content.mode" class="error-tip">
            {{ errorTip.email }}
          </div>
          <GlobalInput
            v-show="!content.mode"
            v-model:value="dataItem.mobile"
            type="phone"
            placeholder="手机号码"
            :error-border="!!errorTip.mobile"
            @on-input="handleDataContent('mobile', 'input')"
            @on-blur="handleDataContent('mobile', 'blur')"
          />
          <div v-show="!content.mode" class="error-tip">
            {{ errorTip.mobile }}
          </div>
          <div class="button" @click="onChangeMode">
            使用我的{{ content.mode ? '手机号码' : '邮件地址' }}注册
          </div>
          <GlobalInput
            v-model:value="dataItem.password"
            placeholder="密码"
            type="password"
            :error-border="!!errorTip.password"
            @on-input="handleDataContent('password', 'input')"
            @on-blur="handleDataContent('password', 'blur')"
          />
          <div class="error-tip">
            {{ errorTip.password }}
          </div>
          <GlobalInput
            v-model:value="dataItem.repeat"
            placeholder="确认密码"
            type="password"
            :error-border="!!errorTip.repeat"
            @on-input="handleDataContent('repeat', 'input')"
            @on-blur="handleDataContent('repeat', 'blur')"
          />
          <div class="error-tip">
            {{ errorTip.repeat }}
          </div>
          <router-link class="button" :to="{ name: MixinPageEnum.BASE_LOGIN }">
            登录现有帐号
          </router-link>
          <GlobalButton ref="buttonInstance" :size="1" :disabled="disabled" @on-click="onButtonClick">
            注 册
          </GlobalButton>
        </div>
        <div class="pt-15 index-middle flex-item flex-column">
          <img :src="accountImage" class="account-image">
          <div class="account-content">
            只需一个帐号，您便可以使用 {{ MixinConfig.shortTitle }} 的所有产品和服务。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref } from 'vue'
import { Instance } from '/@/lib/interface/GlobalButton'
import { Register } from '/@/api/security'
import { validDataContent } from './index-page'
import { rules } from '/@/utils/regExp'
import accountImage from '/@/assets/svg/account.svg'
import useToast from '/@/components/Toast'
import service from '/@/api/security'
import { useGo } from '/@/hooks/web/usePage'
import { PageEnum } from '/@/enums/pageEnum'

export default defineComponent({
  setup() {
    // 注册方式 true: 邮箱 ,false: 电话
    const content = reactive({ mode: true, loading: false })
    //  错误提示
    const errorTip = reactive<Register>({})
    // 注册内容
    const dataItem = reactive<Register>({})
    // 使用检查数据方法
    const handleDataContent = validDataContent(dataItem, errorTip)
    // 实例
    const buttonInstance = ref<Instance | null>(null)
    // 切换注册方式
    const onChangeMode = () => (content.mode = !content.mode)
    // 页面跳转
    const go = useGo()

    // 禁用
    const disabled = computed(() => {
      // 用户名
      if (!dataItem.username || !!errorTip.username) return true

      if (content.mode) {
        // 邮箱
        if (!!errorTip.email || !dataItem.email || !rules.email.test(dataItem.email)) {
          return true
        }
      } else {
        // 电话
        if (!!errorTip.mobile || !dataItem.mobile || !rules.telephone.test(dataItem.mobile)) {
          return true
        }
      }
      // 密码
      if (!dataItem.password) return true
      // 确认密码
      if (!dataItem.repeat) return true
      // 密码相等
      if (dataItem.password !== dataItem.repeat) return true

      return false
    })

    const onButtonClick = (event: MouseEvent) => handleUserRegister(event.offsetX, event.offsetY)

    // 处理用户注册
    async function handleUserRegister(x?: number, y?: number) {
      if (content.loading) return
      buttonInstance.value?.startAnimation(x, y)
      try {
        const data = { ...dataItem }
        // 根据方式发送数据
        delete data.repeat
        content.mode ? delete data.mobile : delete data.email
        await service.registerApi(data)
        // 注册成功跳转登录页面
        go({ name: PageEnum.BASE_LOGIN })
      } catch (err) {
        if (err.code === -1) {
          errorTip.username = err.msg
        } else if (err.code === -2) {
          errorTip.email = err.msg
        } else if (err.code === -3) {
          errorTip.mobile = err.msg
        }
        useToast.error(`注册失败：${err.msg}`)
      } finally {
        buttonInstance.value?.stopAnimation()
      }
    }

    return {
      content,
      errorTip,
      dataItem,
      disabled,
      accountImage,
      buttonInstance,
      onChangeMode,
      onButtonClick,
      handleDataContent
    }
  }
})
</script>

<style lang="less" scoped>
.register-page {
  width: 820px;
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 8px;

  &-wrap {
    display: flex;
    justify-items: center;
    height: 100vh;
  }

  &-header {
    margin: 40px 40px 24px;
    font-size: 20px;
  }

  &-content {
    margin: 0 0 40px 40px;

    .content-left {
      width: 360px;
    }
  }
}

.button {
  display: inline-block;
  height: 48px;
  padding: 0 10px;
  margin: 0 0 24px;
  line-height: 48px;
  color: @primary-color;
  cursor: pointer;
  border-radius: 8px;
  user-select: none;

  &:hover {
    background: #f6f9fe;
  }
}

.error-tip {
  height: 30px;
  padding: 2px 0 0;
  margin: 0 0 0 8px;
  color: #c00;
}

.account {
  &-image {
    width: 244px;
    height: 244px;
  }

  &-content {
    width: 244px;
    font-size: 16px;
    letter-spacing: 0.1em;
    text-align: center;
  }
}
</style>
