import type { App } from 'vue';
import { useTitle } from '/@/hooks/core/useTitle';

export default function (app: App): void {
  app.directive('title', {
    mounted(_el: Element, binding) {
      document.title = useTitle(binding.value);
    }
  });
}
