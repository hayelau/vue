import { http } from '@/plugins/axios'

export async function getInsurantList(data: PageRequst) {
  const res = await http.request<InsurantModel, ResponsePageResult<InsurantModel>>({
    url: `api/v1/insurant/list`,
    method: "post",
    data: data
  })
  return res.data
}

// export async function userList() {
//   return await http.request<UserModel, ResponsePageResult<GuardianModel>>({ url: `user` })
// }
