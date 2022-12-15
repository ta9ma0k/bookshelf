import { motion } from 'framer-motion'
import React, { ChangeEvent, Suspense, useCallback, useState } from 'react'
import { BookCard } from '../../components/Book'
import { Layouts } from '../../components/Layout'
import { Loading } from '../../components/Loading'
import { BookInfoListProvider, useBookInfoList } from './useBookInfoList'

const SearchIcon = () => (
  <svg
    className='h-8 w-8 text-gray-500'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    strokeWidth='2'
    stroke='currentColor'
    fill='none'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    {' '}
    <path stroke='none' d='M0 0h24v24H0z' /> <circle cx='10' cy='10' r='7' />{' '}
    <line x1='21' y1='21' x2='15' y2='15' />
  </svg>
)

const initialKeyword = 'Java'
export const AddBooks = () => {
  return (
    <Layouts>
      <BookInfoListProvider keyword={initialKeyword}>
        <div className='my-8 flex flex-col items-center'>
          <KeywordForm keyword={initialKeyword} />
          <Suspense fallback={<Loading />}>
            <BookInfoList />
          </Suspense>
        </div>
      </BookInfoListProvider>
    </Layouts>
  )
}

const KeywordForm = ({ keyword }: { keyword: string }) => {
  const [text, setText] = useState(keyword)
  const { setKeyword } = useBookInfoList()

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }, [])

  const handleOnSearch = useCallback(() => {
    text.length !== 0 && setKeyword(text)
  }, [text, setKeyword])

  return (
    <div className='w-full flex flex-row justify-center space-x-6 mb-5'>
      <motion.input
        type='text'
        className='border-2 border-gray-400 rounded-lg px-3 py-1 w-1/4 text-gray-600'
        placeholder='please input some keyword.'
        onChange={handleOnChange}
        value={text}
        whileFocus={{ scale: 1.1 }}
      />
      <motion.button whileHover={{ scale: 1.1 }} onClick={handleOnSearch}>
        <SearchIcon />
      </motion.button>
    </div>
  )
}

const BookInfoList = () => {
  const { bookInfoListResource } = useBookInfoList()
  const bookInfoList = bookInfoListResource.read()

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
      {bookInfoList.map((b, i) => (
        <React.Fragment key={`bookinfo-${i}`}>
          <BookCard
            title={b.title}
            imgSrc={b.imgSrc}
            hoverText='登録する'
            onClick={() => console.log(b.title)}
          />
        </React.Fragment>
      ))}
    </div>
  )
}
