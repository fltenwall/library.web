import type { Plugin } from 'vite';
import type { ViteEnv } from '../../utils';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { configStyleImportPlugin } from './styleImport';
import { configMockPlugin } from './mock';
import { configWindiCSSPlugin } from './windicss';
import viteCompression from 'vite-plugin-compression';
import AutoImport from 'unplugin-auto-import/vite';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_MOCK } = viteEnv;

  const vitePlugins: (Plugin | Plugin[])[] = [
    // have to
    vue({ refTransform: true }),
    // have to
    vueJsx(),
    // hove to
    AutoImport({ dts: 'src/types/auto-imports.d.ts', imports: ['vue'] })
  ];
  vitePlugins.push(configWindiCSSPlugin());

  vitePlugins.push(configStyleImportPlugin());

  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

  if (isBuild) {
    vitePlugins.push(viteCompression({ deleteOriginFile: false }));
  }

  return vitePlugins;
}
