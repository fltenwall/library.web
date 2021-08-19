import type { RouteLocationRaw } from 'vue-router';
import { useRouter } from 'vue-router';

export function useGo(): (option: string | RouteLocationRaw, isReplace?: boolean) => void {
  const { push, replace } = useRouter();

  return (option: string | RouteLocationRaw, isReplace = false) => {
    isReplace ? replace(option) : push(option);
  };
}
