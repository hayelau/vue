import { http } from '@/plugins/axios'

export async function getInsurantList(data: InsurantQueryRequest) {
  const res = await http.request<InsurantModel, ResponsePageResult<InsurantModel>>({
    url: `api/v1/insurant/list`,
    method: "post",
    data: data
  })
  return res.data
}

export async function addInsurant(data: InsurantModel) {
  const res = await http.request({
    url: `api/v1/insurant/create`,
    method: "post",
    data: data
  })
  return res.data
}

export async function editInsurant(data: InsurantModel) {
  const res = await http.request({
    url: `api/v1/insurant/edit`,
    method: "post",
    data: data
  })
  return res.data
}
