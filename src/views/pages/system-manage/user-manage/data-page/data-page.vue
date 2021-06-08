<template>
  <GlobalDataPage :mode="mode">
    <a-form :label-col="{ flex: '100px' }" :wrapper-col="{ flex: 'auto' }">
      <!-- 基本信息 -->
      <GlobalCard title="基本信息">
        <a-row>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="登录账户" v-bind="validateInfos.username">
              <InputWrap v-model:value="dataItem.username" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="用户名称" v-bind="validateInfos.nickname">
              <InputWrap v-model:value="dataItem.nickname" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="密码" v-bind="validateInfos.password" :required="mode === 2">
              <InputWrap v-model:value="dataItem.password" type="password" :readonly="mode !== 2" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="角色" v-bind="validateInfos.roleId">
              <RoleSearchSelect v-model:value="dataItem.roleId" v-model:role="dataItem.role" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="状态" v-bind="validateInfos.enabled">
              <SelectWrap v-model:value="dataItem.enabled" :options="selectEnableOption" :readonly="enabledState" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="性别" v-bind="validateInfos.sex">
              <DictSelect v-model:value="dataItem.sex" type="sys_user_sex" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="手机号码" v-bind="validateInfos.mobile">
              <InputWrap
                v-model:value="dataItem.mobile"
                @blur="validate('mobile', { trigger: 'blur' }).catch(() => {})"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="邮件地址" v-bind="validateInfos.email">
              <InputWrap
                v-model:value="dataItem.email"
                @blur="validate('email', { trigger: 'blur' }).catch(() => {})"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="24" :lg="18" class="pl-4 pr-4">
            <a-form-item label="个人简介">
              <TextareaWrap
                v-model:value="dataItem.description"
                show-count
                :maxlength="260"
                :auto-size="{ minRows: 2, maxRows: 5 }"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </GlobalCard>
    </a-form>

    <!-- 修改信息 -->
    <OperationInfoPanel v-if="dataItem.id" :data="dataItem" />

    <!-- 操作 -->
    <template #footer-block>
      <a-button v-if="!readonly" @click="onRestPage">
        重置
      </a-button>
      <a-button v-if="readonly" type="primary" @click="onEditPage">
        编辑
      </a-button>
      <a-button v-if="!readonly" type="primary" :loading="loading" @click="onSavePage">
        保存
      </a-button>
    </template>
  </GlobalDataPage>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, unref, computed } from 'vue'
import { dataPageMix } from '/@/lib/idata/data-page/'
import { formRules, selectEnableOption } from './data-page'
import service, { UserManage } from '/@/api/system-manage/user-manage'
import { userStore } from '/@/store/modules/user'
import { assign } from 'lodash-es'

export default defineComponent({
  setup() {
    // 密码校验
    const password = [
      {
        validator: (_rule: unknown, value: string): Promise<void> => {
          if (unref(mode) !== 2) return Promise.resolve()
          if (!value) return Promise.reject('不允许为空')
          return Promise.resolve()
        }
      }
    ]

    const dataItem = reactive<UserManage>({ enabled: 1, role: {} })
    const rules = reactive({ ...formRules, password })
    const onServerMethods = { onNewData, onSaveData, onLoadDataById }
    const parameter = { rules, dataItem, onServerMethods }
    const dataPageMethods = dataPageMix<UserManage>(parameter)
    const { pageInfo, onDataMethods, validate, validateInfos, loading } = dataPageMethods
    const { mode, readonly, query } = toRefs(pageInfo)

    // 对话框
    const visible = ref<boolean>(true)

    // 当前用户不能修改自己的状态
    const enabledState = computed(() => {
      return userStore.getUserInfoState?.id == unref(query).id
    })

    // 通过ID加载数据
    async function onLoadDataById(id: number) {
      const { data } = await service.getItemById(id)
      assign(dataItem, data)
      changeDataType()
    }

    // 保存数据
    async function onSaveData(id: number, contrast: UserManage) {
      const { data } = await service.updateItem(id, contrast)
      assign(dataItem, data)
      changeDataType()
    }

    // 新增数据
    async function onNewData() {
      const { data } = await service.saveNewItem(dataItem)
      assign(dataItem, data)
      changeDataType()
    }

    // 改变数据类型
    function changeDataType() {
      dataItem.enabled = dataItem.enabled ? 1 : 0
    }

    return {
      mode,
      loading,
      visible,
      readonly,
      dataItem,
      enabledState,
      selectEnableOption,
      validate,
      validateInfos,
      ...onDataMethods
    }
  }
})
</script>

<style lang="less" scoped></style>
