import { createVNode } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

export function useDeleteModal(callback: () => Promise<void>): void {
  Modal.confirm({
    icon: createVNode(ExclamationCircleOutlined),
    title: '删除数据',
    content: '确定要删除该数据吗？',
    okText: '确定',
    okType: 'primary',
    cancelText: '取消',
    onOk() {
      return new Promise(async (resolve) => {
        try {
          await callback()
        } catch (err) {
          message.error(`数据删除失败: ${err.msg}`)
        } finally {
          resolve(true)
        }
      })
    }
  })
}
