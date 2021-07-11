import type { TableColumn } from '/@/lib/props/TableList'
import WebUploader from '/@/utils/webUploader'
import service from '/@/api/basis-manage/material-manage/image-manage'

export const tableColumns: TableColumn[] = [
  {
    title: '标题',
    dataIndex: 'title',
    align: 'center',
    ellipsis: true
  },
  {
    title: '状态',
    dataIndex: 'show',
    align: 'center',
    ellipsis: true,
    slots: { customRender: 'show' }
  },
  {
    title: '排序值',
    dataIndex: 'sortValue',
    align: 'center',
    ellipsis: true
  },
  {
    title: '图标',
    dataIndex: 'icon',
    align: 'center',
    ellipsis: true,
    slots: { customRender: 'icon' }
  },
  {
    title: '更新者',
    dataIndex: 'updateBy',
    align: 'center',
    ellipsis: true
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    align: 'center',
    ellipsis: true,
    slots: { customRender: 'updateTime' }
  },
  {
    title: '操作',
    align: 'center',
    width: 170,
    ellipsis: true,
    dataIndex: 'operation',
    slots: { customRender: 'operation' }
  }
]

export function imageUploader(): (files: File[], id: string) => Promise<void> {
  const webUploader = new WebUploader({ chunkSize: 1024 * 1024 * 5 })

  function sendRequest(list: FormData[]) {
    return new Promise((resolve) => {
      let idx = 0
      let max = 5
      let counter = 0
      const total = list.length
      const start = () => {
        // 有请求，有通道
        while (idx < total && max > 0) {
          max--
          service.saveImageNewItem(list[idx++]).then(() => {
            max++
            counter++
            if (counter === total) resolve('')
            else start()
          })
        }
      }
      start()
    })
  }

  return async function (files: File[], classifyId: string) {
    const currents = await webUploader.sendUploadContent(files)
    // 校验文件
    const [current] = await webUploader.uploadFileBefore(currents)

    if (!current) return

    const list = []

    for (const { chunk, hash } of current.chunkList) {
      const data = new FormData()
      data.append('chunkHash', hash)
      data.append('chunk', chunk)
      list.push(data)
    }

    await sendRequest(list)
    // 合并请求
    await service.mergeChunks({ classifyId, hash: current.hash })
  }
}
