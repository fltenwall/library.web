import { PagerQueryData } from '/@/lib/http/axios/types';
import { onMounted, ref } from 'vue';
import { provideListPage } from './methods/useDepend';
import { Instance } from '/@/lib/interface/ListPage';
import { message } from 'ant-design-vue';

interface Options<T> {
  // 跳转页面名称
  name: string;

  // 从服务器取得数据
  fetchDataFromServer: () => Promise<void>;

  // 删除数据
  deleteDataFromServer: (id: number) => Promise<void>;

  instance: Instance<T>;
}

interface onFetchData {
  // 刷新数据
  onFetchData: () => Promise<void>;

  // 搜索数据
  onSearchData: () => void;

  // 查询数据
  queryData: () => PagerQueryData;
}

export function listPageMix<T>(options: Options<T>): onFetchData {
  const { fetchDataFromServer, deleteDataFromServer, instance, name } = options;

  const loading = ref<boolean>(false);

  // 设置实例
  provideListPage<T>({ name, deleteDataFromServer, loading, onFetchData });

  onMounted(async () => {
    // 首次加载 从服务器取得数据
    await onFetchData();
  });

  /**
   * 刷新数据
   */
  async function onFetchData(): Promise<void> {
    try {
      loading.value = true;
      await fetchDataFromServer();
    } catch (err) {
      message.error(`数据获取失败: ${err.msg}`);
    } finally {
      loading.value = false;
    }
  }

  /**
   * 查询数据
   */
  function queryData(): PagerQueryData {
    const search = instance.searchInstance?.getCurQueryData?.();

    const pagination = instance.listInstance?.getPagination?.();

    return { sort: '', size: 10, page: 0, ...search, ...pagination };
  }

  /**
   * 搜索数据
   */
  async function onSearchData(): Promise<void> {
    instance.listInstance?.setPagination();

    await onFetchData();
  }

  return {
    queryData,
    onFetchData,
    onSearchData
  };
}
