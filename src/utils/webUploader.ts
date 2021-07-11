import service from '/@/api/storage'
import { assign } from 'lodash-es'
import SparkMD5 from 'spark-md5'

interface Options {
  // 如果要分片，分多大一片
  chunkSize?: number
}

interface UploadContent {
  // 文件 hash
  hash: string
  // 进度
  progress: number
  // 状态
  status: fileStatus
  // 文件信息
  fileInfo: {
    // 大小
    size: number
    // 名称
    name: string
    // 类型
    type: string
  }
  // 拆分列表
  chunkList: {
    // 文件 hash ${hash}-${index}
    hash: string
    // 拆分内容
    chunk: Blob
    // 大小
    size: number
    // 进度条
    progress: number
    // 状态
    status: fileStatus
  }[]
}

enum fileStatus {
  wait = '待开始',

  uploading = '上传中',

  secondPass = '秒传',

  success = '成功',

  error = '失败'
}

export default class WebUploader {
  private _configs: Partial<Options> = {}
  // 上传信息列表
  protected _uploadInfoList: UploadContent[] = []

  constructor(options: Options = {}) {
    // 合并默认配置
    assign(this._configs, options)
  }

  // 待上传文件
  async sendUploadContent(files: File[]): Promise<UploadContent[]> {
    const currents: UploadContent[] = []
    // 遍历文件将文件进行切割
    for (const file of files) {
      // 切割文件
      const fileChunk = this.createFileChunk(file)
      // 文件生成唯一值
      const hash = await this.calculateHashSample(fileChunk)
      // 上传文件配置
      const content: UploadContent = {
        hash: hash,

        progress: 0,

        status: fileStatus.wait,

        fileInfo: { size: file.size, name: file.name, type: file.type },

        chunkList: fileChunk.map((el, index) => ({
          hash: `${hash}-${index}`,
          ...el,
          status: fileStatus.wait
        }))
      }
      // 当前带保存数据
      currents.push(content)

      this._uploadInfoList.push(content)
    }
    return currents
  }

  // 上传前校验文件
  async uploadFileBefore(currents: UploadContent[]): Promise<UploadContent[]> {
    for (const current of currents) {
      const { data } = await this.validUpload(current)
      data && this.updateContentBySecond(current)
    }

    return currents.filter((el) => el.status !== fileStatus.success)
  }

  // 生成文件切片
  private createFileChunk(file: File, size = 1024 * 1024 * 2) {
    let current = 0
    const fileChunkList = []
    while (current < file.size) {
      const chunk = file.slice(current, current + size)
      fileChunkList.push({ size: chunk.size, chunk, progress: 0 })
      current += size
    }
    return fileChunkList
  }

  // 计算文件 hash
  private calculateHashSample(chunks: { chunk: Blob }[]): Promise<string> {
    return new Promise((resolve) => {
      const spark = new SparkMD5.ArrayBuffer()
      // 利用深搜
      const loadNext = (index: number) => {
        const reader = new FileReader()
        reader.readAsArrayBuffer(chunks[index].chunk)
        reader.onload = (e) => {
          spark.append(e.target?.result as ArrayBuffer)
          if (index + 1 === chunks.length) {
            resolve(spark.end())
          } else {
            loadNext(index + 1)
          }
        }
      }
      loadNext(0)
    })
  }

  // 服务端验证是否上传, 实现上传
  private async validUpload({ fileInfo: { name, size, type }, hash, chunkList }: UploadContent) {
    return await service.validUpload({ name, size, type, hash, length: chunkList.length })
  }

  // 秒传更新数据
  private updateContentBySecond(current: UploadContent) {
    current.status = fileStatus.success
    current.progress = 100
    current.chunkList.forEach((el) => ((el.status = fileStatus.success), (el.progress = 100)))
  }
}
