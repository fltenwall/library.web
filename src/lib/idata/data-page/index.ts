/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Ref } from 'vue';
import type { CreateStorage } from '/@/utils/storage/Storage';
import type { FromRules } from '/@/lib/interface/From';
import { unref, onBeforeUnmount, onMounted, reactive, toRef, ref } from 'vue';
import { provideDataPage } from './methods/useDepend';
import { checkCacheData, setCacheData } from './methods/cacheData';
import { checkDataRouter, QueryRoute } from './methods/dataRouter';
import { createStorage } from '/@/utils/storage/';
import { PageMode } from '/@/utils/helper/breadcrumb';
import { Form } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { assign, cloneDeep, isEqual } from 'lodash-es';
import { difference } from '/@/utils/difference';
import useToast from '/@/components/Toast';

import './index.less';
import { isUnDef } from '/@/utils/is';

const useForm = Form.useForm;

interface DataPageMix<T> {
  // 页面底部方法
  onDataMethods: {
    // 重置触发
    onRestPage: () => void;

    // 编辑触发
    onEditPage: () => void;

    // 保存数据
    onSavePage: () => void;
  };
  // 页面信息
  pageInfo: PageInfo;

  // 检测消息
  validateInfos: T;

  // 检测
  validate: () => void;

  // 保存加载
  loading: Ref<boolean>;
}

interface Parameter<T> {
  // 数据
  dataItem: T;

  // 规则
  rules: FromRules;

  // 请求服务器方法
  onServerMethods: {
    // 新增数据
    onNewData: () => Promise<void>;

    // 保存数据
    onSaveData: (id: number, contrast: T) => Promise<void>;

    // 通过ID加载数据
    onLoadDataById: (id: number) => Promise<void>;
  };
}

// 页面信息
interface PageInfo {
  // 模式 出错 -1 查看 0 编辑 1 新增 2
  mode: number;

  // 只能读取
  readonly: boolean;

  // 参数信息
  query: QueryRoute;
}

// 页面为新建模式  初始化
function newModeInit<T>(
  dataItem: T,
  mode: Ref<number>,
  name: string,
  storage: CreateStorage,
  cacheData: T
) {
  // 页面刷新前处理
  function updateHandler() {
    if (mode.value === PageMode.new && !isEqual(dataItem, cacheData)) {
      setCacheData(name, storage, dataItem);
    }
  }
  // 查看缓存中是否有数据
  checkCacheData<T>(name, storage, (data: T) => assign(dataItem, data), dataItem);

  /**
   * 刷新页面 不会走生命周期 , 同时监听刷新和卸载时 进行缓存数据
   */
  onMounted(() => {
    // 监听刷新
    window.addEventListener('beforeunload', updateHandler);
  });
  onBeforeUnmount(() => {
    //
    updateHandler();
    // 停止监听刷新
    window.removeEventListener('beforeunload', updateHandler);
  });
}

/**
 * 数据初始化
 */
export function dataItemInit<T>(dataItem: T, rules: FromRules): void {
  const ruleKeys: string[] = Object.keys(rules);
  ruleKeys.forEach((key) => {
    if (isUnDef((dataItem as any)[key])) {
      (dataItem as any)[key] = '';
    }
  });
}

export function dataPageMix<T extends { id?: number }>(parameter: Parameter<T>): DataPageMix<T> {
  // 参数解构
  const { dataItem, rules, onServerMethods } = parameter;

  // 获取方法 当前路由
  const { replace, currentRoute } = useRouter();

  // 获取当前页面 查询条件
  const { query, name } = unref(currentRoute);

  // 保存按键加载
  const loading = ref<boolean>(false);

  // 规则 key 数组
  const ruleKeys: string[] = Object.keys(rules);

  // 数据初始化
  dataItemInit<T>(dataItem, rules);

  // 默认数据 和 原始数据
  let cacheData = cloneDeep(dataItem);

  // 获取 ant 表单规则
  const { validateInfos, resetFields, validate, clearValidate } = useForm(dataItem, rules);

  // 页面模式
  const mode = checkDataRouter(query as unknown as QueryRoute, name as string);

  // 获取页面信息
  const pageInfo = reactive<PageInfo>({
    mode: mode,
    readonly: mode === -1 ? true : false,
    query: query as unknown as QueryRoute
  });

  /**
   * 设置元素数据
   */
  const setCacheData = () => {
    cacheData = cloneDeep(dataItem);
  };

  // 设置缓存
  const storage = createStorage(sessionStorage);

  // 以 id 加载数据
  const onLoadDataById = async () => {
    try {
      await onServerMethods.onLoadDataById(parseInt(pageInfo.query.id!));
      setCacheData();
    } catch (err) {
      useToast.error((err as { msg: string }).msg);
    }
  };

  // 页面为查看模式, 输入框 设置为只读模式
  if (pageInfo.mode === PageMode.view) {
    pageInfo.readonly = true;
    // 请求数据
    onLoadDataById();
  }

  // 页面为新建模式
  if (pageInfo.mode === PageMode.new) {
    newModeInit<T>(dataItem, toRef(pageInfo, 'mode'), name as string, storage, cacheData);
  }

  // 页面为编辑模式
  if (pageInfo.mode === PageMode.edit) {
    // 请求数据
    onLoadDataById();
  }

  /**
   * 卸载时 关闭对话框
   */
  onBeforeUnmount(() => {
    useToast.clear();
  });

  /**
   * 页面点击重置触发的函数
   */
  const onRestPage = () => {
    if (pageInfo.mode === PageMode.new) {
      Object.keys(dataItem).forEach((key) => {
        if (!ruleKeys.includes(key)) {
          (dataItem as any)[key] = '';
        }
      });
      resetFields();
    } else if (pageInfo.mode === PageMode.edit) {
      assign(dataItem, cacheData);
      clearValidate();
    }
  };

  /**
   * 页面点击编辑触发的函数
   */
  const onEditPage = () => {
    pageInfo.mode = PageMode.edit;
    pageInfo.readonly = false;
    replace({ query: { mode: PageMode[PageMode.edit], id: pageInfo.query.id } });
  };

  /**
   * 页面点击保存触发的函数
   */
  const onSavePage = async () => {
    if (!(await validItem())) return;
    try {
      loading.value = true;
      useToast.clear();
      if (pageInfo.mode === PageMode.new) {
        await onServerMethods.onNewData();
        pageInfo.mode = PageMode.edit;
        replace({ query: { mode: PageMode[PageMode.edit], id: dataItem.id } });
      } else if (pageInfo.mode === PageMode.edit && !isEqual(dataItem, cacheData)) {
        const contrast = difference<T>(dataItem, cacheData);
        await onServerMethods.onSaveData(parseInt(pageInfo.query.id!), contrast);
      }

      useToast.success('数据保存成功');
      setCacheData();
    } catch (err) {
      useToast.error((err as { msg: string }).msg);
    } finally {
      loading.value = false;
    }
  };

  /**
   * 检查数据
   */
  const validItem = async (): Promise<boolean> => {
    try {
      await validate();
      return true;
    } catch (err) {
      useToast.clear();
      useToast.error('数据校验失败，请检查！');
      return false;
    }
  };

  /**
   * 注入依赖
   */
  provideDataPage({
    readonly: toRef(pageInfo, 'readonly')
  });

  // 数据方法
  const onDataMethods = {
    onRestPage,
    onEditPage,
    onSavePage
  };

  return { onDataMethods, pageInfo, validate, validateInfos: validateInfos as T, loading };
}
