import http from '../../utils/http.ts'
import type { FormState } from './type.ts'

enum API{
  REGISTER = '/user/register',
  LOGIN = '/user/login'
}

export const getRegister = (formState:FormState) => http.post(API.REGISTER,formState)

export const getLogin = (formState:FormState) => http.post(API.LOGIN,formState)