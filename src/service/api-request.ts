import axios from 'axios'
import { isDevelopmentMode, toCamel } from '@/utils'



const BASE_URL = isDevelopmentMode() ? '/api' : 'https://4337-server.api.maio.co'
// const BASE_URL = isDevelopmentMode() ? 'https://4337-server.api.maio.co' : '/'

export const APIRequest = axios.create({ baseURL: BASE_URL, withCredentials: true })

export const fetcherData = (url: string) => {
  return APIRequest.get(url).then(res => res.data.data)
}

export const fetcher = (url: string) => {
  return APIRequest.get(url).then(res => res.data)
}


export const GetLoginCallback = (params: User.GetLoginCallback.Req): ApiService<User.GetLoginCallback.Res> => {

  return APIRequest.get('/v0/login', { params })
    .then(res => ({ isError: false, value: toCamel(res.data) }))
    .catch(err => {
    // apiErrorMessage(err)
      return { isError: true, value: err.response?.data.error }
    })
}
