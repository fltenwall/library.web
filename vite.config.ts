import type { UserConfig, ConfigEnv } from 'vite';
import { resolve } from 'path';
import { loadEnv } from 'vite';
import { wrapperEnv } from './build/utils';
import { createProxy } from './build/config/vite/proxy';
import { createVitePlugins } from './build/config/plugin';
import { generateModifyVars } from './build/generate/generateModifyVars';

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir);
}

export default ({ mode, command }: ConfigEnv): UserConfig => {
  const root: string = process.cwd();

  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PUBLIC_PATH, VITE_DROP_CONSOLE, VITE_PROXY } = viteEnv;

  const isBuild = command === 'build';

  return {
    root,
    // 相对目录
    resolve: {
      alias: [
        {
          // /@/xxxx  =>  src/xxx
          find: /^\/@\//,
          replacement: pathResolve('src') + '/'
        },
        {
          find: /^\/@components\//,
          replacement: pathResolve('src/components') + '/'
        },
        {
          find: /^\/@editorPage\//,
          replacement: pathResolve('src/views/frame/editor-page') + '/'
        }
      ]
    },

    server: {
      // 监听地址
      host: true,
      /**
       * 端口号
       * @default 3000
       */
      port: 3200,

      /**
       * 运行自动打开浏览器·
       * @default 'false'
       */
      open: false,

      // 本地跨域代理
      proxy: createProxy(VITE_PROXY)
    },

    build: {
      target: 'es2015',
      assetsDir: 'static/img/',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE
        }
      },
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    },

    /**
     * 基本公共路径
     * @default '/'
     */
    base: VITE_PUBLIC_PATH,

    // 配置Dep优化行为
    // 会使用 rollup 对 包重新编译，将编译成符合 esm 模块规范的新的包放入 node_modules 下的 .
    optimizeDeps: {
      include: []
    },

    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true
        }
      }
    },

    plugins: createVitePlugins(viteEnv, isBuild)
  };
};
