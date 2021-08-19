import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../../_utils';

export default [
  {
    url: '/cpi/data-dictionary',
    method: 'get',
    response: () => {
      const data: string[] = [];

      return resultSuccess<string[]>(data);
    }
  }
] as MockMethod[];
