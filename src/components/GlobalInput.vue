<template>
  <div
    :class="['global-input', 'index-middle', errorBorder ? 'error-border' : '']"
    :style="{ 'border-color': borderColor }"
  >
    <div v-if="type === 'phone'" class="global-input-phone">中国 +86</div>
    <input
      v-model="userInput.value"
      :type="userInput.type"
      :placeholder="placeholder"
      :maxlength="maxlength"
      @blur="handleBlur"
      @focus="handleFocus"
      @input="handleInput"
      @keydown.enter="handleEnter"
    />
    <!-- 验证码 -->
    <div
      v-if="type === 'code'"
      class="global-input-code"
      :class="{ 'index-disabled': codeDisabled || codeContent.instance }"
      @click="handleCode"
    >
      {{ codeContent.tip }}
    </div>
    <!-- 密码显示 -->
    <eye-invisible-outlined
      v-if="type === 'password' && passwordType"
      class="global-input-password"
      @click="handleSwitch(false)"
    />
    <eye-outlined
      v-else-if="type === 'password' && !passwordType"
      class="global-input-password"
      @click="handleSwitch(true)"
    />
    <!-- 加载中 -->
    <loading-outlined v-if="loading" />
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, ref, reactive, onBeforeUnmount } from 'vue';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons-vue';

enum InputTypeMap {
  text = 'text',
  password = 'password',
  phone = 'text',
  code = 'text'
}

enum TypeMap {
  text = 'text',
  password = 'password',
  phone = 'phone',
  code = 'code'
}

interface UserInput {
  type: string;
  value: string;
}

interface CodeContent {
  instance: NodeJS.Timeout | null;
  time: number;
  tip: string;
}

export default defineComponent({
  components: { EyeInvisibleOutlined, EyeOutlined },
  props: {
    // 类型
    type: {
      type: String as PropType<string>,
      default: 'text',
      validator: (v: string): boolean => {
        return ['text', 'password', 'phone', 'code'].includes(v);
      }
    },
    // 提示文件
    placeholder: {
      type: String as PropType<string>,
      default: ''
    },
    // 值
    value: {
      type: String as PropType<string>,
      default: ''
    },
    // 最大长度
    maxlength: {
      type: Number as PropType<number>,
      default: undefined
    },
    // code (验证码) 类型 禁止点击
    codeDisabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    // 错误边框
    errorBorder: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    // 输入框是否高亮
    focusHighlight: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    // 加载
    loading: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  emits: ['update:value', 'update:errorBorder', 'on-enter', 'on-blur', 'on-input', 'on-focus'],
  setup(props, { emit }) {
    const userInput = reactive<UserInput>({
      type: InputTypeMap[props.type as InputTypeMap],
      value: props.value
    });
    const codeContent = reactive<CodeContent>({
      instance: null,
      tip: '获取验证码',
      time: 0
    });
    const passwordType = ref<boolean>(true);
    const borderColor = ref<string>('');

    // 密码切换
    function handleSwitch(value: boolean) {
      passwordType.value = value;
      if (value) userInput.type = TypeMap.password;
      else userInput.type = TypeMap.text;
    }

    // 失去焦点
    function handleBlur() {
      borderColor.value = '';
      emit('on-blur');
    }

    // 获得焦点
    function handleFocus() {
      if (props.focusHighlight) {
        borderColor.value = '#1890ff';
      }
      emit('on-focus');
    }

    // 输入内容
    function handleInput() {
      if (props.type === TypeMap.phone) {
        userInput.value = userInput.value.replace(/[^0-9]+/g, '');
      }
      emit('update:value', userInput.value);
      emit('update:errorBorder', false);
      emit('on-input', userInput.value);
    }

    // 点击 code
    function handleCode() {
      if (props.codeDisabled || codeContent.instance) {
        return;
      }
      setCountdown();
    }

    // 用户按下 enter
    function handleEnter() {
      if (userInput.value) {
        emit('on-enter');
      }
    }

    // 设置定时器
    function setCountdown() {
      codeContent.time = 60;
      codeContent.instance = setInterval(() => {
        codeContent.time--;
        codeContent.tip = `重新获取 (${codeContent.time})`;
        if (codeContent.time === -1) {
          codeContent.tip = '重新获取';
          clearInterval(codeContent.instance!);
          codeContent.instance = null;
        }
      }, 1000);
    }

    onBeforeUnmount(() => {
      // 页面卸载时销毁 定时器
      codeContent.instance && clearInterval(codeContent.instance);
    });

    return {
      userInput,
      codeContent,
      borderColor,
      passwordType,
      handleCode,
      handleBlur,
      handleFocus,
      handleInput,
      handleEnter,
      handleSwitch
    };
  }
});
</script>

<style lang="less" scoped>
@height: 48px;

.global-input {
  width: 100%;
  height: @height;
  padding: 0 16px;
  font-size: 16px;
  color: #141414;
  background: var(--public-header-background);
  border: 1px solid transparent;
  border-radius: 8px;
  transition: border 0.2s ease-in-out;

  input {
    flex: 1;
    height: @height;
    background: transparent;
    border: none;
    outline: none;
  }

  ::v-deep(input::placeholder) {
    color: #ccc;
  }

  &-password {
    margin: 0 0 0 4px;
    font-size: 20px;
    cursor: pointer;
    user-select: none;
  }

  &-phone {
    padding: 0 16px 0 0;
    margin: 0 16px 0 0;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }

  &-code {
    color: @primary-color;
    cursor: pointer;
  }
}

.error-border {
  border-color: #fa2a2d !important;
}
</style>
