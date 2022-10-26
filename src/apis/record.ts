import { http } from '@/plugins/axios'

export async function getRecordList(data: SuccessRecordQueryRequest) {
  const res = await http.request<RecordModel, ResponsePageResult<RecordModel>>({
    url: `api/v1/record/list`,
    method: "post",
    data: data
  })
  return res.data
}

export async function notifyNoRecord(data: DateNotifyRequest) {
  const res = await http.request<GroupModel, ResponsePageResult<GroupModel>>({
    url: `api/v1/record/notifyDailyNoRecords`,
    method: "post",
    data: data
  })
  return res.data
}
