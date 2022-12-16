import dayjs from 'dayjs'
import { BookApi } from '../../lib/api'
import {
  AssignedRequest,
  NotAssignedRequest,
  ReceivedRequest,
  Request,
  RequestStatus,
} from './type'

type RequestResponse = {
  id: string
  status: string
  bookTitle: string
  applicant: string
  requestDateTime: string
  responsibleUser?: string
  receivedDateTime?: string
}
export const findAll = (): Promise<Request[]> =>
  BookApi.get<RequestResponse[]>('/requests').then((res) =>
    res.data.map((d) => {
      const tmp = {
        id: d.id,
        status: d.status,
        bookTitle: d.bookTitle,
        applicant: d.applicant,
        requestDateTime: dayjs(d.requestDateTime),
      }
      switch (d.status) {
        case RequestStatus.NOT_ASSIGNED:
          return tmp as NotAssignedRequest
        case RequestStatus.ASSIGNED:
          if (!d.responsibleUser) {
            throw new Error(
              `responsibleUser does'nt exists [requestId=${d.id}]`
            )
          }
          return {
            ...tmp,
            responsibleUser: d.responsibleUser,
          } as AssignedRequest
        case RequestStatus.RECEIVED:
          if (!d.responsibleUser) {
            throw new Error(
              `responsibleUser does'nt exists [requestId=${d.id}]`
            )
          }
          if (!d.receivedDateTime) {
            throw new Error(
              `receivedDateTime does'nt exists [requestId=${d.id}]`
            )
          }
          return {
            ...tmp,
            responsibleUser: d.responsibleUser,
            receivedDateTime: dayjs(d.receivedDateTime),
          } as ReceivedRequest
        default:
          throw new Error(`Unexpoected status [requestId=${d.id}]`)
      }
    })
  )
