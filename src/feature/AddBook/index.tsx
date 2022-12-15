import { motion } from 'framer-motion'
import React, { ChangeEvent, Suspense, useCallback, useState } from 'react'
import { BookCard } from '../../components/Book'
import { Dialog } from '../../components/Dialog'
import { BookIcon } from '../../components/Icon'
import { Layouts } from '../../components/Layout'
import { Loading } from '../../components/Loading'
import { useNotification } from '../../components/Notification'
import { BookInfo } from '../../domain/bookinfo'
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
export const AddBook = () => {
  const [selected, setSelected] = useState<BookInfo | undefined>()

  const handleOnClose = useCallback(() => {
    setSelected(undefined)
  }, [])

  const handleOnSelect = useCallback(
    (book: BookInfo) => () => {
      setSelected(book)
    },
    []
  )

  return (
    <Layouts>
      <BookInfoListProvider keyword={initialKeyword}>
        <div className='my-8 flex flex-col items-center'>
          <KeywordForm keyword={initialKeyword} />
          <Suspense fallback={<Loading />}>
            <BookInfoList setBook={handleOnSelect} />
          </Suspense>
        </div>
        <AddBookDialog book={selected} onClose={handleOnClose} />
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

type BookInfoListProps = {
  setBook: (book: BookInfo) => () => void
}
const BookInfoList = (props: BookInfoListProps) => {
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
            onClick={props.setBook(b)}
          />
        </React.Fragment>
      ))}
    </div>
  )
}

type AddBookDialogProps = {
  book?: BookInfo
  onClose: () => void
}
const AddBookDialog = (props: AddBookDialogProps) => {
  const { book, onClose } = props
  const { openNotification } = useNotification()

  const handleOnAdd = useCallback(() => {
    onClose()
    openNotification('登録しました')
  }, [onClose, openNotification])

  return (
    <Dialog show={!!book} onClose={onClose}>
      <div className='mx-10 my-5'>
        <h5 className='text-2xl font-semibold'>{book?.title}</h5>
        <div className='flex flex-row mt-5'>
          <div className='mr-10'>
            {book?.imgSrc ? <img src={book.imgSrc} /> : <BookIcon />}
          </div>
          <div className='flex items-center'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className='text-xl px-5 py-2 border-2 rounded-full'
              onClick={handleOnAdd}
            >
              登録する
            </motion.button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
