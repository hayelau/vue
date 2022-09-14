export const userTableColumns = [
  { prop: 'id', label: 'ID', align: 'center', width: 80 },
  { prop: 'nickname', label: '昵称', search: true },
  { prop: 'avatar', label: '头像', type: 'image', align: 'center', width: 80 },
  { prop: 'email', label: '邮箱', width: 300, search: true },
  { prop: 'mobile', label: '手机号', width: 200, search: true },
  {
    prop: 'sex',
    label: '性别',
    align: 'center',
    type: 'radio',
    options: [
      { label: '男', value: 1 },
      { label: '女', value: 2 },
    ],
    tag_field: 'ee',
    width: 80,
  },
  { prop: 'created_at', label: '注册时间', type: 'date', width: 120 },
  { prop: 'updated_at', label: '更新时间', type: 'date', width: 120 },
] as TableColumnsType[]

export const guardianTableColumns = [
  { prop: 'id', label: 'ID', align: 'center', width: 80 },
  { prop: 'name', label: '姓名', search: true },
  { prop: 'phone', label: '手机', search: true },
  { prop: 'wechatName', label: '微信名称', search: true },
  { prop: 'staffWechatName', label: '跟进客服微信名称', search: true },
  {
    prop: 'status',
    label: '状态',
    align: 'center',
    type: 'radio',
    options: [
      { label: '激活', value: 1 },
      { label: '未激活', value: 0 },
    ],
    tag_field: 'ee',
    width: 80,
  },
] as TableColumnsType[]
