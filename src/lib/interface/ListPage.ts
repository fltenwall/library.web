import { SearchInstance } from '/@/lib/idata/data-list/methods/useSearch';
import { GetPagination, SetPagination } from '/@/hooks/web/usePagination';

interface ListInstance<T> {
  setDataSource: (data: T[], total: number) => void;

  // 设置页码
  setPagination: SetPagination;

  // 获取页码
  getPagination: () => GetPagination;

  [prop: string]: unknown;
}

interface BanchInstance<T> {
  setDataSource: (data: T[]) => void;

  setModalState: (state: boolean) => void;
}

export interface Instance<T> {
  searchInstance: SearchInstance | null;

  listInstance: ListInstance<T> | null;

  banchInstance?: BanchInstance<T> | null;
}
