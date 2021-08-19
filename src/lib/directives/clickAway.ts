import type { App } from 'vue';
import VueClickAway from 'vue3-click-away';

export default function (app: App): void {
  app.use(VueClickAway);
}
