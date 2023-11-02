import http from '../../utils/http'

enum API{
  TABLEDATA = '/table/data',
  ALLDATA = '/table/allData',
  EDITDATA = '/table/edit',
  DELETEDATA = '/table/delete'
}

export const getTableData = (pageIndex:string,pageSize:string) => http.get(API.TABLEDATA+`?pageIndex=${pageIndex}&pageSize=${pageSize}`)

export const getAllData = () => http.get(API.ALLDATA)

export const getEditData = (formState) => http.post(API.EDITDATA,formState)

export const getDeleteData = (id) => http.post(API.DELETEDATA,id)