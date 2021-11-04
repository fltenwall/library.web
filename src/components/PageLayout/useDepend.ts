import { provide, inject } from 'vue';

interface Instance {
  onSearchData: () => void;
}

const key = Symbol('TableLayout');

export function useProvide(instance: Instance): void {
  provide(key, instance);
}

export function useInject(): Instance {
  return inject(key, {}) as Instance;
}
