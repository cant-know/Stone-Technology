import axios from 'axios'
import useUserStore from '../store/modules/user'

const http = axios.create({
  timeout: 5000,
  baseURL: '/api'
})

http.interceptors.request.use((config) => {
  const userStore = useUserStore()
  if(userStore.token){
    config.headers.Authorization = userStore.token
  }
  if(localStorage.getItem('token')){
    config.headers.Authorization = localStorage.getItem('token')
  }
  return config
})

http.interceptors.response.use((response) => {
  return response.data
}, (err) => {
  console.log(err)
})

export default http