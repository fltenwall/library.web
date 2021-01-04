import type { AxiosRequestConfig } from 'axios';
import axios from 'axios'
import qs from 'qs'
import { Result } from './types'
import { ContentTypeEnum } from '/@/enums/httpEnum';
import { userStore } from '/@/store/modules/user';
import { isNull } from '/@/utils/is';
import { ResultEnum } from '/@/enums/httpEnum'



export default function request<T extends Result>(requestConfig: AxiosRequestConfig) {
  return new Promise<T>((resolve, reject) => {
    // 设置用户的请求参数
    let config = requestConfig

    const tokenInfo = userStore.getTokenState

    if (!isNull(tokenInfo)) {
      if (!config.headers) config.headers = {}
      config.headers[tokenInfo.headerName] = tokenInfo.token
    }

    if (config.headers && config.headers['Content-Type'] === ContentTypeEnum.FORM_URLENCODED) {
      config.data = qs.stringify(config.data)
    }

    axios.request(config).then((response) => {
      const res = response.data as T

      if (res.code === ResultEnum.SUCCESS && res.msg === ResultEnum.SUCCESSMSG) {
        // 请求成功
        resolve(res)
      } else {
        // 请求失败
        reject(res)
      }

    }).catch((err) => {
      reject(err?.response?.data)
    })
  })
}
