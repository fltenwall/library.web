import type { UserConfig, ConfigEnv } from 'vite'
import { resolve } from 'path'
import { loadEnv } from 'vite'
import { wrapperEnv } from './build/utils'
import { createProxy } from './build/config/vite/proxy'
import { createVitePlugins } from './build/config/plugin'

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir)
}

export default ({ mode, command }: ConfigEnv): UserConfig => {
  const root: string = process.cwd()

  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_DROP_CONSOLE, VITE_PROXY, VITE_OPEN } = viteEnv

  const isBuild = command === 'build'

  return {
    root,
    // 相对目录
    resolve: {
      alias: [
        {
          // /@/xxxx  =>  src/xxx
          find: /^\/@\//,
          replacement: pathResolve('src') + '/'
        }
      ]
    },

    server: {
      // Listening on all local IPs
      host: true,
      /**
       * 端口号
       * @default 3000
       */
      port: VITE_PORT,

      /**
       * 运行自动打开浏览器·
       * @default 'false'
       */
      open: VITE_OPEN,

      // 本地跨域代理
      proxy: createProxy(VITE_PROXY)
    },

    build: {
      // terser options
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE
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
          modifyVars: {
            'primary-color': '#0960bd',
            'primary-hover-color': '#2a7dc9',
            'tree-title-height': '35px',
            'table-header-bg': '#ffffff',
            'drawer-body-padding': '24px 0'
          },
          javascriptEnabled: true
        }
      }
    },

    plugins: createVitePlugins(viteEnv, isBuild)
  }
}
