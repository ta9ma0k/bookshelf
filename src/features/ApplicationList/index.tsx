import { motion } from 'framer-motion'
import React, { Suspense, useCallback, useState } from 'react'
import { RoundedButton } from '../../components/Button'
import { useDialog } from '../../context/dialog'
import { EllipseIcon, UserIcon } from '../../components/Icon'
import { Loading } from '../../components/Loading'
import { useNotification } from '../../context/notification'
import { updateAssign, updateReceived } from './api'
import {
  AssignedApplication,
  NotAssignedApplication,
  ReceivedApplication,
  Application,
  ApplicationStatus,
  ApplicationStatusType,
} from './type'
import {
  ApplicationListProvider,
  useApplicationList,
} from './useApplicationList'
import { Dialog } from '../../components/Dialog'
import clsx from 'clsx'

export const ApplicationList = () => {
  const [selected, setSelected] = useState<Application | undefined>()
  const { openDialog } = useDialog()

  const handleOnSelect = useCallback(
    (application: Application) => () => {
      setSelected(application)
      openDialog()
    },
    [openDialog]
  )

  return (
    <ApplicationListProvider>
      <Suspense fallback={<Loading />}>
        <ApplicationItems onClickItem={handleOnSelect} />
      </Suspense>
      <ApplicationDialog application={selected} />
    </ApplicationListProvider>
  )
}

type ApplicationItemsProps = {
  onClickItem: (application: Application) => () => void
}
const ApplicationItems = (props: ApplicationItemsProps) => {
  const { applicationListResource } = useApplicationList()
  const requestList = applicationListResource.read()

  return (
    <div className='w-full space-y-4 flex flex-col items-center'>
      {requestList.map((d, i) => (
        <React.Fragment key={`request-${i}`}>
          <ApplicationCard application={d} onClick={props.onClickItem(d)} />
        </React.Fragment>
      ))}
    </div>
  )
}

type ApplicationCardProps = {
  application: Application
  onClick: () => void
}
const ApplicationCard = (props: ApplicationCardProps) => (
  <motion.div
    className='w-1/2 border-2 rounded-lg p-2 hover:cursor-pointer'
    whileHover={{ x: 30 }}
    onClick={props.onClick}
  >
    <RequestBaseContent application={props.application} />
  </motion.div>
)

type ApplicationDialogProps = {
  application?: Application
}
const ApplicationDialog = (props: ApplicationDialogProps) => {
  const { show, closeDialog } = useDialog()
  return (
    <Dialog show={show} close={closeDialog}>
      {props.application && (
        <div className='mx-10 my-5 space-y-4'>
          <RequestBaseContent
            application={props.application}
            showAllContent={true}
          />
          <ApplicationDialogContent application={props.application} />
        </div>
      )}
    </Dialog>
  )
}

const ApplicationDialogContent = (props: { application: Application }) => {
  switch (props.application.status) {
    case ApplicationStatus.NOT_ASSIGNED:
      return <PicNotAssignedDialogContent application={props.application} />
    case ApplicationStatus.ASSIGNED:
      return <PicAssignedDialogContent application={props.application} />
    case ApplicationStatus.RECEIVED:
      return <ReceivedDialogContent application={props.application} />
    default:
      throw new Error()
  }
}

const PicNotAssignedDialogContent = ({
  application,
}: {
  application: NotAssignedApplication
}) => {
  const { openNotification } = useNotification()
  const { closeDialog } = useDialog()

  const handleOnAssign = useCallback(() => {
    if (application.canUpdateStatus) {
      updateAssign(application.id).then(() => {
        closeDialog()
        openNotification('担当者に割り当てました')
      })
    }
  }, [application, closeDialog, openNotification])

  return (
    <div>
      {application.canUpdateStatus ? (
        <RoundedButton onClick={handleOnAssign}>
          <span>対応する</span>
        </RoundedButton>
      ) : undefined}
    </div>
  )
}

const PicAssignedDialogContent = ({
  application,
}: {
  application: AssignedApplication
}) => {
  const { openNotification } = useNotification()
  const { closeDialog } = useDialog()
  const handleOnReceived = useCallback(() => {
    if (application.canUpdateStatus) {
      updateReceived(application.id).then(() => {
        closeDialog()
        openNotification('受け取りました')
      })
    }
  }, [application, closeDialog, openNotification])

  return (
    <div className='space-y-4'>
      <h6>対応者: {application.pic}</h6>
      {application.canUpdateStatus ? (
        <RoundedButton onClick={handleOnReceived}>
          <span>受け取り済</span>
        </RoundedButton>
      ) : undefined}
    </div>
  )
}
const ReceivedDialogContent = (props: { application: ReceivedApplication }) => (
  <div>
    <h6>対応者: {props.application.pic}</h6>
    <h6>
      対応日: {props.application.receivedDateTime.format('MMMM D, YYYY h:mm A')}
    </h6>
  </div>
)

const RequestBaseContent = ({
  application,
  showAllContent = false,
}: {
  application: Application
  showAllContent?: boolean
}) => (
  <div className='flex flex-row space-x-3 content-center'>
    <div className='flex flex-col'>
      <UserIcon />
      <h5 className='text-sm'>{application.applicant}</h5>
    </div>
    <div className='w-5/6 space-y-1'>
      <div className='flex items-center space-x-3'>
        <RequestStatusIcon status={application.status} />
        <h6 className='text-sm'>
          {application.requestDateTime.format('MMMM D, YYYY')}
        </h6>
      </div>
      <h5 className='truncate'>{application.bookTitle}</h5>
      <div
        className={clsx(
          'text-sm',
          showAllContent ? 'mt-3 whitespace-pre-wrap' : undefined
        )}
      >
        <p className={clsx(!showAllContent ? 'truncate' : undefined)}>
          {showAllContent
            ? application.reason
            : application.reason.split('\n')[0]}
        </p>
      </div>
    </div>
  </div>
)
const RequestStatusIcon = ({ status }: { status: ApplicationStatusType }) => {
  switch (status) {
    case ApplicationStatus.NOT_ASSIGNED:
      return (
        <EllipseIcon color='blue'>
          <span>未対応</span>
        </EllipseIcon>
      )
    case ApplicationStatus.ASSIGNED:
      return (
        <EllipseIcon color='yellow'>
          <span>対応予定</span>
        </EllipseIcon>
      )
    case ApplicationStatus.RECEIVED:
      return (
        <EllipseIcon color='green'>
          <span>受取済み</span>
        </EllipseIcon>
      )
    default:
      throw new Error('not supported type')
  }
}
