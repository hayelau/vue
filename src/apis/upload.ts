import { http } from '@/plugins/axios'



export function uploadImage(data: FormData) {
  return http.request<{ url: string }>({
    url: `upload/image`,
    method: 'post',
    data,
  })
}

export function uploadExcelFile(data: FormData) {
  return http.request<{ fileName: string }>({
    url: `api/v1/record/upload`,
    method: 'post',
    data,
  })
}
