import http from '../../utils/http'

enum API{
  TABLEDATA = '/table/data',
  ALLDATA = '/table/allData',
  EDITDATA = '/table/edit',
  DELETEDATA = '/table/delete',
  SEARCHDATA = '/table/search'
}

export const getTableData = (pageIndex:string,pageSize:string) => http.get(API.TABLEDATA+`?pageIndex=${pageIndex}&pageSize=${pageSize}`)

export const getAllData = () => http.get(API.ALLDATA)

export const getEditData = (formState) => http.post(API.EDITDATA,formState)

export const getDeleteData = (id:string) => http.post(API.DELETEDATA,id)

export const getSearchData = (name:string) => http.get(API.SEARCHDATA+`?name=${name}`)