import { Request, RequestRepositoryInterface } from '../../../../domain/request'
import { baseApi } from '../api'

type RequestListResponse = Request[]
export const RequestRepositoryApiImpl: RequestRepositoryInterface = {
  create: () => Promise.resolve('ok'),
  findAll: () =>
    baseApi
      .get<RequestListResponse>('/requests')
      .then((res) => res.data.map((d) => ({ ...d } as Request))),
}
