import { BookApi } from '../../lib/api'
import { Request } from './type'

type RequestListResponse = Request[]
export const findAll = () =>
  BookApi.get<RequestListResponse>('/requests').then((res) =>
    res.data.map((d) => ({ ...d } as Request))
  )
