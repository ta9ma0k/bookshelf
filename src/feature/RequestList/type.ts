export const RequestStatus = {
  NOT_ASSIGNED: 'not_assigned',
  WAITING_FOR_MAIL: 'waiting_for_mail',
  RECEIVED: 'received',
} as const
export type RequestStatusType = typeof RequestStatus[keyof typeof RequestStatus]
export type Request = {
  bookTitle: string
  applicant: string
  responsibleuser: string
  status: RequestStatusType
}
