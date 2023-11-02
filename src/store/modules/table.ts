import { defineStore } from 'pinia'
import { getTableData } from '../../api/table/index.ts'

const useTableStore = defineStore('useTableStore',{
  state:() => {
    return{
      table: [], //表格中当前页数据
      pageIndex: '', //当前页码
      id: '', //表格当前行id
    }
  },
  actions:{
    async onTableData(pageIndex:string,pageSize:string){
      this.table = await getTableData(pageIndex,pageSize)
    }
  },
  getters:{

  },
  persist: true
})

export default useTableStore