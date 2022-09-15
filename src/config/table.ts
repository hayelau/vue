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

export const insurantTableColumns = [
  { prop: 'id', label: 'ID', align: 'center', width: 80 },
  { prop: 'insurantName', label: '被保人姓名', search: true},
  { prop: 'insurantIdNum', label: '被保人身份证', search: true},
  {
    prop: 'dataSource',
    label: '医保类型',
    align: 'center',
    type: 'radio',
    options: [
      { label: '居民医保', value: '居民' },
      { label: '职工医保', value: '职工' },
      { label: '省直医保', value: '省直' },
      { label: '市直医保', value: '市直' },
    ],
    // tag_field: 'ee',
    width: 120,
  },
  {
    prop: 'guardLevel',
    label: '长护等级',
    align: 'center',
    type: 'radio',
    options: [
      { label: '长护1级', value: '长护1级' },
      { label: '长护2级', value: '长护2级' },
      { label: '长护3级', value: '长护3级' },
      { label: '老年人能力等级1级', value: '老年人能力等级1级' },
      { label: '老年人能力等级2级', value: '老年人能力等级2级' },
      { label: '老年人能力等级3级', value: '老年人能力等级3级' },
      { label: '老年人能力等级4级', value: '老年人能力等级4级' },
      { label: '老年人能力等级5级', value: '老年人能力等级5级' },
    ],
    // tag_field: 'ee',
    width: 160,
  },
   {
    prop: 'status',
    label: '状态',
    align: 'center',
    type: 'radio',
    options: [
      { label: '激活', value: 1 },
      { label: '未激活', value: 0 },
    ],
    // tag_field: 'ee',
    width: 80,
  },
] as TableColumnsType[]


export const wechatGroupTableColumns = [
  { prop: 'id', label: 'ID', align: 'center', width: 80 },
  { prop: 'groupName', label: '群名称', search: true},
  { prop: 'insurantName', label: '被保人姓名', search: true},
  { prop: 'guardName', label: '打卡人姓名', search: true},
  {
    prop: 'priority',
    label: '打卡人优先级',
    align: 'center',
    type: 'radio',
    options: [
      { label: '主', value: '1' },
      { label: '备', value: '2' },
    ],
    // tag_field: 'ee',
    width: 120,
  },
] as TableColumnsType[]


export const recordTableColumns = [
  { prop: 'id', label: 'ID', align: 'center', width: 80 },
  { prop: 'statDate', label: '打卡日期', search: true},
  { prop: 'insurantId', label: '被保人ID', search: true},
  { prop: 'insurantName', label: '被保人姓名', search: true},
  { prop: 'guardId', label: '打卡人ID', search: true},
  { prop: 'guardName', label: '打卡人姓名', search: true},
] as TableColumnsType[]