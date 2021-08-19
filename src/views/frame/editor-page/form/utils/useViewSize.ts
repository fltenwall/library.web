// 视图样式
import { provide, reactive } from 'vue';

export default function (): void {
  const viewSize = reactive({ width: 0, height: 0 });

  const options = {
    // 获取
    getViewSize() {
      return viewSize;
    },
    // 设置
    setViewSize(width: number, height: number) {
      viewSize.height = height;
      viewSize.width = width;
    }
  };

  provide('viewSize', options);
}
