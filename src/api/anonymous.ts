import type { ProblemManage } from './basis-manage/problem-manage'
import type { BookInfo } from './book-manage/book-info'
import type { BookDetail } from './book-manage/book-detail'
import type { PagerQueryData, PagerResponseData, Result } from "/@/lib/http/axios/types"
import request from "/@/lib/http/axios/"






export default class Service {

  // 向服务查询数据并分页返回结果 无须权限
  static fecthProblemByAny(query?: Partial<PagerQueryData>): Promise<PagerResponseData<ProblemManage>> {
    return request<PagerResponseData<ProblemManage>>({
      url: "/api/anonymous/problem",
      method: "get",
      params: query
    })
  }

  //  获取图书馆藏信息
  static fecthBookByAny(id: number): Promise<Result<{ book: BookInfo, detail: BookDetail[] }>> {
    return request<Result<{ book: BookInfo, detail: BookDetail[] }>>({
      url: "/api/anonymous/book/" + id,
      method: "get"
    })
  }

  // 借阅书籍
  static bookBorrow(searchCode: string): Promise<Result<boolean>> {
    return request<Result<boolean>>({
      url: "/epi/book/borrow/" + searchCode,
      method: "post"
    })
  }
}


// export type ProblemManage = ProblemManage