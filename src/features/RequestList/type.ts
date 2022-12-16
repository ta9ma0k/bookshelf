import { Dayjs } from 'dayjs'

export const RequestStatus = {
  NOT_ASSIGNED: 'not_assigned',
  ASSIGNED: 'assigned',
  RECEIVED: 'received',
} as const
export type RequestStatusType = typeof RequestStatus[keyof typeof RequestStatus]
type RequestBase = {
  id: string
  bookTitle: string
  applicant: string
  requestDateTime: Dayjs
}
export type NotAssignedRequest = {
  status: typeof RequestStatus.NOT_ASSIGNED
} & RequestBase
export type AssignedRequest = {
  status: typeof RequestStatus.ASSIGNED
  responsibleUser: string
} & RequestBase
export type ReceivedRequest = {
  status: typeof RequestStatus.RECEIVED
  responsibleUser: string
  receivedDateTime: Dayjs
} & RequestBase
export type Request = NotAssignedRequest | AssignedRequest | ReceivedRequest
