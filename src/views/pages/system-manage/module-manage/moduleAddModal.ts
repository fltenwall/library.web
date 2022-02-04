import type { FromRules } from '/@/lib/interface/From';

export const formRules: FromRules = {
  description: [{ required: true, whitespace: true, message: '不允许为空' }],

  authorities: [
    {
      required: true,
      validator: (_rule: unknown, value: string[]): Promise<void> => {
        if (value.length) {
          return Promise.resolve();
        }
        return Promise.reject('不允许为空');
      }
    }
  ]
};

export interface DataItem {
  name?: string;

  authorities?: number[];
}
