import { http } from '@/plugins/axios'

export async function getRecordList(data: PageRequst) {
  const res = await http.request<RecordModel, ResponsePageResult<RecordModel>>({
    url: `api/v1/record/list`,
    method: "post",
    data: data
  })
  return res.data
}

// export async function userList() {
//   return await http.request<UserModel, ResponsePageResult<GuardianModel>>({ url: `user` })
// }
