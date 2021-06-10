import { Modal } from 'ant-design-vue'

export function useOverdue(): void {
  Modal.warning({
    title: '系统提示',
    content: '登录状态已过期，需要您重新登录',
    okText: '重新登录',
    onOk: () => (location.href = `/login?redirect=${location.pathname}`)
  })
}
