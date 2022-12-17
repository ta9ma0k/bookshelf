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
  canUpdateStatus?: boolean
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
          if (d.canUpdateStatus === undefined) {
            throw new Error(
              `canUpdateStatus does'nt exists [requestId=${d.id}]`
            )
          }
          return {
            ...tmp,
            canUpdateStatus: d.canUpdateStatus,
          } as NotAssignedRequest
        case RequestStatus.ASSIGNED:
          if (!d.responsibleUser) {
            throw new Error(
              `responsibleUser does'nt exists [requestId=${d.id}]`
            )
          }
          if (d.canUpdateStatus === undefined) {
            throw new Error(
              `canUpdateStatus does'nt exists [requestId=${d.id}]`
            )
          }
          return {
            ...tmp,
            responsibleUser: d.responsibleUser,
            canUpdateStatus: d.canUpdateStatus,
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

export const updateAssign = (requestId: string) =>
  BookApi.put(`/requests/${requestId}/status/assign`)

export const updateReceived = (requestId: string) =>
  BookApi.put(`/requests/${requestId}/status/received`)
