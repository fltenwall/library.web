/**
 * * 文件上传
 */

// 切片大小
const SIZE = 1024 * 1024

// 生成文件切片
function createFileChunk(files: File[], size = SIZE) {
  const fileChunkList = []
  for (const file of files) {
    let cur = 0
    let index = 0
    while (cur < file.size) {
      const chunk = file.slice(cur, cur + size)
      const hash = file.name + '-' + index++
      fileChunkList.push({ hash, chunk, name: file.name })
      cur += size
    }
  }
  return fileChunkList
}

// 上传切片
function uploadChunks(content: { hash: string; chunk: Blob; name: string }[]) {
  const requestList = content.map(({ chunk, hash, name }) => {
    const data = new FormData()
    data.append('hash', hash)
    data.append('name', name)
    data.append('chunk', chunk)
    return { data }
  })

  console.log(requestList)
}

export default function (files: File[]): void {
  uploadChunks(createFileChunk(files))
}
