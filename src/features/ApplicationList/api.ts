import dayjs from 'dayjs'
import { BookApi } from '../../lib/api'
import {
  AssignedApplication,
  NotAssignedApplication,
  ReceivedApplication,
  Application,
  ApplicationStatus,
} from './type'

type Response = {
  id: string
  status: string
  bookTitle: string
  isbn: string
  applicant: string
  requestDateTime: string
  reason: string
  pic?: string
  receivedDateTime?: string
  canUpdateStatus?: boolean
}
export const findAll = (): Promise<Application[]> =>
  BookApi.get<Response[]>('/usage-applications').then((res) =>
    res.data.map((d) => {
      const tmp = {
        id: d.id,
        status: d.status,
        bookTitle: d.bookTitle,
        isbn: d.isbn,
        applicant: d.applicant,
        requestDateTime: dayjs(d.requestDateTime),
        reason: d.reason,
      }
      switch (d.status) {
        case ApplicationStatus.NOT_ASSIGNED:
          if (d.canUpdateStatus === undefined) {
            throw new Error(
              `canUpdateStatus does'nt exists [requestId=${d.id}]`
            )
          }
          return {
            ...tmp,
            canUpdateStatus: d.canUpdateStatus,
          } as NotAssignedApplication
        case ApplicationStatus.ASSIGNED:
          if (!d.pic) {
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
            pic: d.pic,
            canUpdateStatus: d.canUpdateStatus,
          } as AssignedApplication
        case ApplicationStatus.RECEIVED:
          if (!d.pic) {
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
            pic: d.pic,
            receivedDateTime: dayjs(d.receivedDateTime),
          } as ReceivedApplication
        default:
          throw new Error(`Unexpoected status [requestId=${d.id}]`)
      }
    })
  )

export const updateAssign = (isbn: string, usageApplicationId: string) =>
  BookApi.post(`/books/${isbn}/usage-applications/${usageApplicationId}/assign`)

export const updateReceived = (isbn: string, usageApplicationId: string) =>
  BookApi.post(
    `/books/${isbn}/usage-applications/${usageApplicationId}/receive`
  )
