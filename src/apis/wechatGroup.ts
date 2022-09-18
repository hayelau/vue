import { http } from '@/plugins/axios'

export async function getWechatGroupList(data: WechatGroupBindingQueryRequest) {
  const res = await http.request<GroupModel, ResponsePageResult<GroupModel>>({
    url: `api/v1/group/list`,
    method: "post",
    data: data
  })
  return res.data
}

export async function addGroupBinding(data: GroupModel) {
  const res = await http.request({
    url: `api/v1/group/create`,
    method: "post",
    data: data
  })
  return res.data
}

export async function deleteGroupBinding(data: GroupModel) {
  const res = await http.request({
    url: `api/v1/group/delete`,
    method: "post",
    data: data
  })
  return res.data
}
