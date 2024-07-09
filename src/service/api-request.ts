import axios from 'axios'
import { toCamel } from '@/utils'

// const BASE_URL = isDevelopmentMode() ? 'https://4337.api.maio.co/api' : '/api'
const BASE_URL = '/api'

export const APIRequest = axios.create({ baseURL: BASE_URL, withCredentials: true })

export function setAuth (apiToken: string) {
  APIRequest.defaults.headers.common['Authorization'] = `Bearer ${apiToken}`
}

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

export const SendUserOperation = (data: UserOperation): ApiService<User.SendUserOperation.Res> => {
  return APIRequest.post('/v0/userOp', data)
    .then(res => ({ isError: false, value: toCamel(res.data) }))
    .catch(err => {
      // apiErrorMessage(err)
      return { isError: true, value: err.response?.data.error }
    })
}

export const GetUserProfile = (): ApiService<User.GetUserProfile.Res> => {
  return APIRequest.get('/v0/profile', )
    .then(res => ({ isError: false, value: toCamel(res.data) }))
    .catch(err => {
      // apiErrorMessage(err)
      return { isError: true, value: err.response?.data.error }
    })
}

export const GetWalletCheck = (): ApiService<User.GetWalletCheck.Res> => {
  return APIRequest.get('/v0/userOp/check', )
    .then(res => ({ isError: false, value: toCamel(res.data) }))
    .catch(err => {
      // apiErrorMessage(err)
      return { isError: true, value: err.response?.data.error }
    })
}

export const DeployWalletContract = (): ApiService<User.DeployWalletContract.Res> => {
  return APIRequest.post('/v0/userOp/deploy', )
    .then(res => ({ isError: false, value: toCamel(res.data) }))
    .catch(err => {
      // apiErrorMessage(err)
      return { isError: true, value: err.response?.data.error }
    })
}

