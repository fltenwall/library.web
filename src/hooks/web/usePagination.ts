import { ref, Ref } from 'vue';

export interface GetPagination {
  page: number;

  size: number;
}

interface Pagination {
  // 当前页数
  current: Ref<number>;

  // 每页条数
  pageSize: Ref<number>;

  // 设置
  setPagination: (page: number) => void;

  // 获取
  getPagination: () => GetPagination;
}

export function usePagination(page = 1, size = 10): Pagination {
  const pageSize = ref<number>(size);

  const current = ref<number>(page);

  const setPagination = (page = 0, size = 10) => {
    current.value = page + 1;
    pageSize.value = size;
  };

  const getPagination = (): GetPagination => {
    return {
      page: current.value - 1,

      size: pageSize.value
    };
  };

  return { current, pageSize, setPagination, getPagination };
}
