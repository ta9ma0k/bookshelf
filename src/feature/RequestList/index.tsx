import { motion } from 'framer-motion'
import { Suspense } from 'react'
import { Layouts } from '../../components/Layout'
import { Loading } from '../../components/Loading'
import { RequestStatus, RequestStatusType } from '../../domain/request'
import { RequestListProvider, useRequestList } from './useRequestList'

export const RequestList = () => {
  return (
    <Layouts>
      <div className='mt-8 flex justify-center'>
        <RequestListProvider>
          <Suspense fallback={<Loading />}>
            <RequestItems />
          </Suspense>
        </RequestListProvider>
      </div>
    </Layouts>
  )
}

const RequestItems = () => {
  const { requestListResource } = useRequestList()
  const requestList = requestListResource.read()

  return (
    <div className='w-full space-y-4 flex flex-col items-center'>
      {requestList.map((d, i) => (
        <motion.div
          key={`request-${i}`}
          className='w-1/2 border-2 rounded-lg p-2 hover:cursor-pointer'
          whileHover={{ x: 30 }}
        >
          <div className='flex flex-row space-x-2 items-center'>
            <h5 className='font-semibold'>{d.bookTitle}</h5>
            <RequestStatusIcon status={d.status} />
          </div>
          <div>{d.applicant}</div>
        </motion.div>
      ))}
    </div>
  )
}

const RequestStatusIcon = ({ status }: { status: RequestStatusType }) => {
  switch (status) {
    case RequestStatus.NOT_ASSIGNED:
      return (
        <div className='text-xs rounded-full w-16 text-gray-600 font-semibold bg-blue-100 px-2 py-1 text-white text-center'>
          未対応
        </div>
      )
    case RequestStatus.WAITING_FOR_MAIL:
      return (
        <div className='text-xs rounded-full w-16 text-gray-600 font-semibold bg-yellow-100 px-2 py-1 text-white text-center'>
          発送待ち
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
