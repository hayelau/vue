import { http } from '@/plugins/axios'

type ResponseData = {
  token: string
}

export function login(data: { username: string; password: string }) {
  return http.request<ResponseData>({
    url: `/api/v1/user/login`,
    method: 'post',
    data,
  })
}

export function register(data: { mobile: string; password: string; password_confirmation: string }) {
  return http.request<ResponseData>({
    url: `register`,
    method: 'post',
    data,
  })
}

export function forgetPassword(data: { mobile: string; password: string; password_confirmation: string }) {
  return http.request<ResponseData>({
    url: 'forget-password',
    method: 'post',
    data,
  })
}
