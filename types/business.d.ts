//用户模型
type UserModel = {
  id?: string | number
  mobile?: string | number
  sex?: number
  email?: string
  nickname?: any
  home?: any
  weibo?: any
  wechat?: any
  github?: any
  qq?: any
  avatar?: string
  created_at?: string
  updated_at?: string
}

//打卡人模型
type GuardianModel = {
  id: number
  name: string
  phone: string
  wechatName: string
  staffWechatName: string
  status: number
}

//被保人模型
type InsurantModel = {
  id: number
  insurantName: string
  insurantIdNum: string
  dataSource: string
  guardLevel: string
  status: number
}

//群组模型
type GroupModel = {
  id: number
  groupName: string
  insurantId: number
  insurantName: string
  guardId: number
  guardName: string
  guardPhone?: string
  priority: number
}

//打卡记录模型
type RecordModel = {
  id: number
  statDate: string
  insurantId: number
  insurantName: string
  guardId: number
  guardName: string
}