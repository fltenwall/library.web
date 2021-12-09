import { SetPagination, GetPagination } from '/@/hooks/web/usePagination';

export interface Instance {
  setDataSource: (data?: unknown[], total?: number) => void;

  setPagination: SetPagination;

  getPagination: GetPagination;
}

export interface Actions {
  label: string | ((record: unknown) => string);

  value: string;
}
