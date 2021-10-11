import type { App } from 'vue';

import Icon from '/@/components/Icon';
import TableList from '/@/components/TableList/index.vue';
import PublicHeader from '/@/components/PublicHeader/index';
import PublicEditor from '/@/components/PublicEditor/index';
import RoleSearchSelect from '/@/components/SearchSelect/RoleSelect.vue';
import DictSelect from '/@/components/SearchSelect/DictSelect.vue';
import ColorPicker from '/@/components/ColorPicker/index.vue';

const modules = import.meta.globEager('../components/**.vue');

export default class ComponentRegisterPlugin {
  static init(app: App): void {
    for (const key in modules) {
      const name = key.replace(/^\.\.\/components\/|.vue$/g, '');
      app.component(name, modules[key].default);
    }

    app.component('Icon', Icon);
    app.component('TableList', TableList);
    app.component('DictSelect', DictSelect);
    app.component('ColorPicker', ColorPicker);
    app.component('PublicEditor', PublicEditor);
    app.component('PublicHeader', PublicHeader);
    app.component('RoleSearchSelect', RoleSearchSelect);
  }
}
