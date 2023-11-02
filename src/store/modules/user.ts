import { defineStore } from 'pinia'

const useUserStore = defineStore('useUserStore',{
  state:() => {
    return{
      token: '',
      phone: ''
    }
  },
  actions:{

  },
  getters:{

  },
  persist: true
})

export default useUserStore