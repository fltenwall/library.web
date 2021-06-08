import type { App } from 'vue'

import antUiPlugins from '/@/plugins/ant-ui-plugins'

import componentRegisterPlugin from '/@/plugins/component-register-plugin'

import ToastPlugins from '/@/plugins/toast-plugins'

import DirectivesRegisterPlugin from '/@/lib/directives/'

import MixinPlugins from '/@/plugins/mixin-plugins'

import ErrorPlugin from '/@/plugins/error-plugins'

export default class PluginsIniter {
  static init(app: App<Element>): void {
    // UI 按需加载
    antUiPlugins.init(app)

    // 全局组件注入
    componentRegisterPlugin.init(app)

    // 消息通知
    ToastPlugins.init(app)

    // 指令注册
    DirectivesRegisterPlugin.init(app)

    // 全局函数
    MixinPlugins.init(app)

    // 错误收集
    ErrorPlugin.init(app)
  }
}
