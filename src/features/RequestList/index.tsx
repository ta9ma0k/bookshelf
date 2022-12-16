import { motion } from 'framer-motion'
import React, { Suspense } from 'react'
import { UserIcon } from '../../components/Icon/User'
import { Loading } from '../../components/Loading'
import { Request, RequestStatus, RequestStatusType } from './type'
import { RequestListProvider, useRequestList } from './useRequestList'

export const RequestList = () => {
  return (
    <div className='mt-8 flex justify-center'>
      <RequestListProvider>
        <Suspense fallback={<Loading />}>
          <RequestItems />
        </Suspense>
      </RequestListProvider>
    </div>
  )
}

const RequestItems = () => {
  const { requestListResource } = useRequestList()
  const requestList = requestListResource.read()

  return (
    <div className='w-full space-y-4 flex flex-col items-center'>
      {requestList.map((d, i) => (
        <React.Fragment key={`request-${i}`}>
          <RequestCard request={d} />
        </React.Fragment>
      ))}
    </div>
  )
}

const RequestCard = (props: { request: Request }) => (
  <motion.div
    className='w-1/2 border-2 rounded-lg p-2 hover:cursor-pointer'
    whileHover={{ x: 30 }}
  >
    <div className='flex flex-row space-x-3 content-center'>
      <div className='flex flex-col'>
        <UserIcon />
        <h5 className='text-sm'>{props.request.applicant}</h5>
      </div>
      <div>
        <h6 className='text-sm'>
          {props.request.requestDateTime.format('MMMM D, YYYY')}
        </h6>
        <div className='flex flex-row space-x-5'>
          <h5 className='truncate'>{props.request.bookTitle}</h5>
          <RequestStatusIcon status={props.request.status} />
        </div>
      </div>
    </div>
  </motion.div>
)

const RequestStatusIcon = ({ status }: { status: RequestStatusType }) => {
  switch (status) {
    case RequestStatus.NOT_ASSIGNED:
      return (
        <div className='text-xs rounded-full w-16 text-gray-600 font-semibold bg-blue-100 px-2 py-1 text-white text-center'>
          未対応
        </div>
      )
    case RequestStatus.ASSIGNED:
      return (
        <div className='text-xs rounded-full w-16 text-gray-600 font-semibold bg-yellow-100 px-2 py-1 text-white text-center'>
          対応予定
        </div>
      )
    case RequestStatus.RECEIVED:
      return (
        <div className='text-xs rounded-full w-16 text-gray-600 font-semibold bg-teal-100 px-2 py-1 text-white text-center'>
          受取済み
        </div>
      )
    default:
      throw new Error('not supported type')
  }
}
