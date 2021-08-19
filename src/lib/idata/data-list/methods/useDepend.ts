import type { Ref } from 'vue';
import { provide, inject } from 'vue';
import { useGo } from '/@/hooks/web/usePage';
import { PageMode } from '/@/utils/helper/breadcrumb';
import { useDeleteModal } from '/@/hooks/web/useDeleteModal';

const key = Symbol('listPage');

interface DataPage<T> {
  // 数据加载
  loading: Ref<boolean>;

  // 从服务器获取数据
  onFetchData: () => Promise<void>;

  // 添加数据
  onNewDataItem: () => void;

  // 查看数据
  onViewDataItem: (record: T) => void;

  // 编辑数据
  onEditDataItem: (record: T) => void;

  // 删除数据
  onDeleteDataItem: (record: T) => void;
}

interface Options {
  name: string;

  // 从服务器删除数据
  deleteDataFromServer: (id: number) => Promise<void>;

  // 从服务器获取数据
  onFetchData: () => Promise<void>;

  // 数据加载
  loading: Ref<boolean>;
}

/**
 * @description 页面跳转进入的函数
 * @param name dataPage 页面 name 名称
 */
export function provideListPage<T extends { id?: number }>(options: Options): void {
  const { name, deleteDataFromServer, onFetchData, loading } = options;

  const go = useGo();

  function onNewDataItem() {
    go({ name, query: { mode: PageMode[PageMode.new] } });
  }

  function onViewDataItem(record: T) {
    go({ name, query: { mode: PageMode[PageMode.view], id: record.id } });
  }

  function onEditDataItem(record: T) {
    go({ name, query: { mode: PageMode[PageMode.edit], id: record.id } });
  }

  function onDeleteDataItem(record: T) {
    useDeleteModal(async () => await deleteDataFromServer(record.id!));
  }

  const instance: DataPage<T> = {
    loading,
    onFetchData,
    onNewDataItem,
    onViewDataItem,
    onEditDataItem,
    onDeleteDataItem
  };

  provide(key, instance);
}

export function injectListPage<T>(): DataPage<T> {
  return inject(key, {}) as DataPage<T>;
}
