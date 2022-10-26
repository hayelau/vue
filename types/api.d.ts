//请求响应结构
interface ResponseResult<T> {
  code: number
  message: string
  status: 'success' | 'error'
  data: T
}

//分页请求响应结构
interface ResponsePageResult<T> {
  data: T[]
  links: { url?: string; label: string; active: boolean }
  meta: {
    current_page: number
    from: number
    last_page: number
    links: { first: string; last: string; prev?: any; next?: any }[]
    path: string
    per_page: number
    to: number
    total: number
  }
}

//分页请求
interface PageRequst {
  pageNum: number
  pageSize: number
}

interface GuardianQueryRequest extends PageRequst {
  // id?: number
  // name?: string
  // phone?: string
  // wechatName?: string
  // staffWechatName?: string
  [key:string]: string|number
}

interface InsurantQueryRequest extends PageRequst {
  // id?: number
  // name?: string
  // phone?: string
  // wechatName?: string
  // staffWechatName?: string
  [key:string]: string|number
}

interface WechatGroupBindingQueryRequest extends PageRequst {
  // id?: number
  // name?: string
  // phone?: string
  // wechatName?: string
  // staffWechatName?: string
  [key:string]: string|number
}

interface SuccessRecordQueryRequest extends PageRequst {
  // guardId?: number
  // guardName?: string
  // insurantId?: number
  // insurantName?: string
  // statDate?: string
  [key:string]: string|number
}

interface DateNotifyRequest {
  statDate: string
}