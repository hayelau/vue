import { http } from '@/plugins/axios'

export async function getWechatGroupList(data: PageRequst) {
  const res = await http.request<GroupModel, ResponsePageResult<GroupModel>>({
    url: `api/v1/group/list`,
    method: "post",
    data: data
  })
  return res.data
}

// export async function userList() {
//   return await http.request<UserModel, ResponsePageResult<GuardianModel>>({ url: `user` })
// }
