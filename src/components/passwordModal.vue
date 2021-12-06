<template>
  <a-modal v-model:visible="visible" :width="400" :footer="null" :mask-closable="false" :closable="false">
    <div class="header">
      {{ title }}
    </div>
    <a-form layout="vertical">
      <a-form-item v-bind="validateInfos.password">
        <a-input-password
          v-model:value="dataItem.password"
          placeholder="输入密码"
          :visibility-toggle="false"
        />
      </a-form-item>
      <a-form-item v-bind="validateInfos.repeat">
        <a-input-password v-model:value="dataItem.repeat" placeholder="确认密码" :visibility-toggle="false" />
      </a-form-item>
    </a-form>
    <div class="footer">
      <a-button @click="onCancel"> 取消 </a-button>
      <a-button type="primary" class="ml-4" :loading="loading" @click="onConfirm"> 确定 </a-button>
    </div>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue';
import { Form } from 'ant-design-vue';

const useForm = Form.useForm;

export default defineComponent({
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:value', 'on-confirm'],
  setup(props, { emit }) {
    const dataItem = reactive<{ password?: string; repeat?: string }>({ password: '', repeat: '' });

    const rules = reactive({
      password: [
        {
          validator: (_rule: unknown, value: string): Promise<void> => {
            if (!value) return Promise.reject('不允许为空');
            if (dataItem.repeat) validate('repeat').catch(() => ({}));
            return Promise.resolve();
          }
        }
      ],
      repeat: [
        {
          validator: (_rule: unknown, value: string): Promise<void> => {
            if (!dataItem.password) return Promise.resolve();
            if (!value) return Promise.reject('不允许为空');
            let character = value.replace(/(\*|\.|\?|\+|\$|\^|\[|\]|\(|\)|\{|\}|\||\\|\/)/g, '\\$1');
            if (props.loading) character = `^${character}$`;
            else character = `^${character}.*`;
            if (new RegExp(character).test(dataItem.password!)) return Promise.resolve();
            return Promise.reject('两次输入的密码不一致');
          }
        }
      ]
    });

    const visible = ref<boolean>(props.value);

    const { validate, validateInfos, resetFields } = useForm(dataItem, rules);

    const onCancel = () => emit('update:value', false);

    const onConfirm = async () => {
      if (!(await validItem())) return;
      emit('on-confirm', dataItem.password);
    };

    async function validItem() {
      try {
        await validate();
        return true;
      } catch (err) {
        return false;
      }
    }

    watch(
      () => props.value,
      (val) => {
        visible.value = val;
        resetFields();
      }
    );

    return { visible, dataItem, validateInfos, validate, onCancel, onConfirm };
  }
});
</script>

<style lang="less" scoped>
.header {
  margin: 0 0 24px;
}

.footer {
  display: flex;
  justify-content: flex-end;
}
</style>
