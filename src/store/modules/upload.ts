/* eslint-disable @typescript-eslint/no-explicit-any */
import store from '/@/store/'
import { VuexModule, Module, getModule, Action, Mutation } from 'vuex-module-decorators'
import WebUploader from '../../utils/webUploader'

const NAME = 'upload'

interface UpdateContet {
  hash: string

  key: string

  value: unknown
}

@Module({ namespaced: true, name: NAME, dynamic: true, store })
class Upload extends VuexModule {
  // 上传内容
  private uploadContentState: Options[] = []
  // 获取上传内容
  get getUploadContentState(): Options[] {
    return this.uploadContentState
  }

  @Mutation
  commitPushUploadContent(content: Options[]): void {
    this.uploadContentState.push(...content)
  }

  // 根据 key 值更新数据
  @Mutation
  commitUpadateUploadContent({ hash, key, value }: UpdateContet): void {
    const index = this.uploadContentState.findIndex((el) => el.hash === hash)
    const segments = `${index}${key && '.'}${key}`.split('.')
    let target = this.uploadContentState
    for (let i = 0; i < segments.length; i++) {
      if (i === segments.length - 1) {
        (target as any)[segments[i]] = value
      } else {
        target = (target as any)[segments[i]]
      }
    }
  }

  // 添加数据
  @Action
  async uploadContentAction({ files, id }: { files: File[]; id: string }): Promise<void> {
    // const webUploader = new WebUploader()
    // const toUpload = await fileUpload(files)
    // // 文件处理
    // this.commitPushUploadContent(toUpload)
    // // 文件上传
    // await uploadFileBefore(toUpload, id)
  }
}

export { Upload }
export const uploadStore = getModule<Upload>(Upload)
