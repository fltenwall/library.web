import type { Plugin } from 'vite';
import type { ViteEnv } from '../../utils';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { configStyleImportPlugin } from './styleImport';
import { configMockPlugin } from './mock';
import viteCompression from 'vite-plugin-compression';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_MOCK } = viteEnv;

  const vitePlugins: (Plugin | Plugin[])[] = [
    // have to
    vue(),
    // have to
    vueJsx()
  ];

  vitePlugins.push(configStyleImportPlugin());

  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

  if (isBuild) {
    vitePlugins.push(viteCompression({ deleteOriginFile: true }));
  }

  return vitePlugins;
}
