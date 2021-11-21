// 视图样式
import type { Ref } from 'vue';
import { provide, ref } from 'vue';

export default function (): void {
  const instance = ref<HTMLNULL>({ clientHeight: 700, clientWidth: 375 });

  const options = {
    // 获取
    getViewSize() {
      const { clientHeight: height, clientWidth: widht } = instance.value!;
      return { height, widht };
    },
    // 设置
    setViewSize(panelRef: Ref<HTMLNULL>) {
      instance.value = panelRef.value;
    }
  };

  provide('viewSize', options);
}
