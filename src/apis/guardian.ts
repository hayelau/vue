import { http } from '@/plugins/axios'

export async function getGuardianList(data: PageRequst) {
  const res = await http.request<GuardianModel, ResponsePageResult<GuardianModel>>({
    url: `api/v1/guardian/list`,
    method: "post",
    data: data
  })
  return res.data
}

// export async function userList() {
//   return await http.request<UserModel, ResponsePageResult<GuardianModel>>({ url: `user` })
// }
