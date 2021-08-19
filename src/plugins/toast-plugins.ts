import type { App } from 'vue';

// 导入 toastification 通知提醒框
import Toast from 'vue-toastification';
// 导入 toastification 通知提醒框 UI
import 'vue-toastification/dist/index.css';

export default class ToastPlugins {
  static init(app: App<Element>): void {
    app.use(Toast);
  }
}
