import { motion } from 'framer-motion'
import React, { Suspense, useCallback, useState } from 'react'
import { RoundedButton } from '../../components/Button'
import { Dialog, useDialog } from '../../components/Dialog'
import { EllipseIcon, UserIcon } from '../../components/Icon'
import { Loading } from '../../components/Loading'
import { useNotification } from '../../components/Notification'
import { updateAssign, updateReceived } from './api'
import {
  AssignedRequest,
  NotAssignedRequest,
  ReceivedRequest,
  Request,
  RequestStatus,
  RequestStatusType,
} from './type'
import { RequestListProvider, useRequestList } from './useRequestList'

export const RequestList = () => {
  const [selected, setSelected] = useState<Request | undefined>()
  const { openDialog } = useDialog()

  const handleOnSelect = useCallback(
    (request: Request) => () => {
      setSelected(request)
      openDialog()
    },
    [openDialog]
  )

  return (
    <div className='mt-8 flex justify-center'>
      <RequestListProvider>
        <Suspense fallback={<Loading />}>
          <RequestItems onClickItem={handleOnSelect} />
        </Suspense>
        <RequestDialog request={selected} />
      </RequestListProvider>
    </div>
  )
}

type RequestItemsProps = {
  onClickItem: (request: Request) => () => void
}
const RequestItems = (props: RequestItemsProps) => {
  const { requestListResource } = useRequestList()
  const requestList = requestListResource.read()

  return (
    <div className='w-full space-y-4 flex flex-col items-center'>
      {requestList.map((d, i) => (
        <React.Fragment key={`request-${i}`}>
          <RequestCard request={d} onClick={props.onClickItem(d)} />
        </React.Fragment>
      ))}
    </div>
  )
}

type RequestCardProps = {
  request: Request
  onClick: () => void
}
const RequestCard = (props: RequestCardProps) => (
  <motion.div
    className='w-1/2 border-2 rounded-lg p-2 hover:cursor-pointer'
    whileHover={{ x: 30 }}
    onClick={props.onClick}
  >
    <RequestBaseContent request={props.request} />
  </motion.div>
)

type RequestDialogProps = {
  request?: Request
}
const RequestDialog = (props: RequestDialogProps) => {
  return (
    <Dialog>
      {props.request && (
        <div className='mx-10 my-5 space-y-4'>
          <RequestBaseContent request={props.request} />
          <RequestDialogContent request={props.request} />
        </div>
      )}
    </Dialog>
  )
}

const RequestDialogContent = (props: { request: Request }) => {
  switch (props.request.status) {
    case RequestStatus.NOT_ASSIGNED:
      return <NotAssignedRequestDialogContent request={props.request} />
    case RequestStatus.ASSIGNED:
      return <AssignedRequestDialogContent request={props.request} />
    case RequestStatus.RECEIVED:
      return <ReceivedRequestDialogContent request={props.request} />
    default:
      throw new Error()
  }
}

const NotAssignedRequestDialogContent = ({
  request,
}: {
  request: NotAssignedRequest
}) => {
  const { openNotification } = useNotification()
  const { closeDialog } = useDialog()

  const handleOnAssign = useCallback(() => {
    if (request.canUpdateStatus) {
      updateAssign(request.id).then(() => {
        closeDialog()
        openNotification('担当者に割り当てました')
      })
    }
  }, [request, closeDialog, openNotification])

  return (
    <div>
      {request.canUpdateStatus ? (
        <RoundedButton onClick={handleOnAssign}>
          <span>対応する</span>
        </RoundedButton>
      ) : undefined}
    </div>
  )
}

const AssignedRequestDialogContent = ({
  request,
}: {
  request: AssignedRequest
}) => {
  const { openNotification } = useNotification()
  const { closeDialog } = useDialog()
  const handleOnReceived = useCallback(() => {
    if (request.canUpdateStatus) {
      updateReceived(request.id).then(() => {
        closeDialog()
        openNotification('受け取りました')
      })
    }
  }, [request, closeDialog, openNotification])

  return (
    <div className='space-y-4'>
      <h6>対応者: {request.responsibleUser}</h6>
      {request.canUpdateStatus ? (
        <RoundedButton onClick={handleOnReceived}>
          <span>受け取り済</span>
        </RoundedButton>
      ) : undefined}
    </div>
  )
}
const ReceivedRequestDialogContent = (props: { request: ReceivedRequest }) => (
  <div>
    <h6>対応者: {props.request.responsibleUser}</h6>
    <h6>
      対応日: {props.request.receivedDateTime.format('MMMM D, YYYY h:mm A')}
    </h6>
  </div>
)

const RequestBaseContent = (props: { request: Request }) => (
  <div className='flex flex-row space-x-3 content-center'>
    <div className='flex flex-col'>
      <UserIcon />
      <h5 className='text-sm'>{props.request.applicant}</h5>
    </div>
    <div>
      <RequestStatusIcon status={props.request.status} />
      <h6 className='text-sm'>
        {props.request.requestDateTime.format('MMMM D, YYYY')}
      </h6>
      <h5 className='truncate'>{props.request.bookTitle}</h5>
    </div>
  </div>
)
const RequestStatusIcon = ({ status }: { status: RequestStatusType }) => {
  switch (status) {
    case RequestStatus.NOT_ASSIGNED:
      return (
        <EllipseIcon color='blue'>
          <span>未対応</span>
        </EllipseIcon>
      )
    case RequestStatus.ASSIGNED:
      return (
        <EllipseIcon color='yellow'>
          <span>対応予定</span>
        </EllipseIcon>
      )
    case RequestStatus.RECEIVED:
      return (
        <EllipseIcon color='green'>
          <span>受取済み</span>
        </EllipseIcon>
      )
    default:
      throw new Error('not supported type')
  }
}
