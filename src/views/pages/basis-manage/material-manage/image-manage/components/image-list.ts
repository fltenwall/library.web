import WebUploader from '/@/utils/webUploader'
import service from '/@/api/basis-manage/material-manage/image-manage'

export function imageUploader(): (files: File[], id: string) => Promise<void> {
  const webUploader = new WebUploader()

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
          console.log(idx)
          service.saveImageNewItem(list[idx++]).then(() => {
            max++
            counter++
            if (counter === total) {
              resolve('')
            } else {
              start()
            }
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
