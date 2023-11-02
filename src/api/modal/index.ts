import http from '../../utils/http.ts'

enum API{
  USERINFO = '/modal/edit',
  GETINFO = '/modal/getInfo',
  CODE = '/modal/code',
  PASSWORD = '/user/password'
}

export const editUserInfo = (formState) => http.post(API.USERINFO,formState)

export const getUserInfo = (phone) => http.get(API.GETINFO + `?phone=${phone}`)

export const getCode = () => http.get(API.CODE)

export const getPassword = (formState) => http.post(API.PASSWORD,formState)
