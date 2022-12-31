import { Dayjs } from 'dayjs'

export const ApplicationStatus = {
  NOT_ASSIGNED: 'not_assigned',
  ASSIGNED: 'assigned',
  RECEIVED: 'received',
} as const
export type ApplicationStatusType =
  typeof ApplicationStatus[keyof typeof ApplicationStatus]
type ApplicationBase = {
  id: string
  isbn: string
  bookTitle: string
  applicant: string
  requestDateTime: Dayjs
  reason: string
}
export type NotAssignedApplication = {
  status: typeof ApplicationStatus.NOT_ASSIGNED
  canUpdateStatus: boolean
} & ApplicationBase
export type AssignedApplication = {
  status: typeof ApplicationStatus.ASSIGNED
  pic: string
  canUpdateStatus: boolean
} & ApplicationBase
export type ReceivedApplication = {
  status: typeof ApplicationStatus.RECEIVED
  pic: string
  receivedDateTime: Dayjs
} & ApplicationBase
export type Application =
  | NotAssignedApplication
  | AssignedApplication
  | ReceivedApplication
