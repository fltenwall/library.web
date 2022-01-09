import service, { ImageManage } from '/@/api/basis-manage/material-manage/image-manage';
import { isObject } from '/@/utils/is';
import WebUploader from '/@/utils/webUploader';

export default function (): (files: File[], parems?: Indexable) => Promise<ImageManage[]> {
  const webUploader = new WebUploader({ chunkSize: 1024 * 1024 * 5 });

  function sendRequest(list: FormData[]) {
    return new Promise((resolve) => {
      let idx = 0;
      let max = 5;
      let counter = 0;
      const total = list.length;
      const start = () => {
        // 有请求，有通道
        while (idx < total && max > 0) {
          max--;
          service.saveImageNewItem(list[idx++]).then(() => {
            max++;
            counter++;
            if (counter === total) resolve('');
            else start();
          });
        }
      };
      start();
    });
  }

  return async function (files: File[], parems: Indexable = {}) {
    const currents = await webUploader.sendUploadContent(files);

    const uploadlist = [];

    for (const current of currents) {
      // 校验文件
      const { data: result } = await webUploader.validUpload(current);
      // 实现秒传
      if (isObject(result)) {
        uploadlist.push(result);

        continue;
      }

      const list = [];

      for (const { chunk, hash } of current.chunkList) {
        const data = new FormData();
        data.append('chunkHash', hash);
        data.append('chunk', chunk);
        list.push(data);
      }
      // 发生上传
      await sendRequest(list);
      // 合并请求
      const { data } = await service.mergeChunks({ ...parems, hash: current.hash });

      uploadlist.push(data);
    }

    return uploadlist;
  };
}
