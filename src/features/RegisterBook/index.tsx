import { motion } from 'framer-motion'
import React, { ChangeEvent, Suspense, useCallback, useState } from 'react'
import { BookCard } from '../../components/Book'
import { useDialog } from '../../context/dialog'
import { BookIcon, SearchIcon } from '../../components/Icon'
import { Loading } from '../../components/Loading'
import { useNotification } from '../../context/notification'
import { BookInfoListProvider, useBookInfoList } from './useBookInfoList'
import { registerBook } from './api'
import { BookInfo } from './type'
import { Dialog } from '../../components/Dialog'

const initialKeyword = 'Java'
export const RegisterBook = () => {
  const [selected, setSelected] = useState<BookInfo | undefined>()
  const { openDialog } = useDialog()

  const handleOnSelect = useCallback(
    (book: BookInfo) => () => {
      setSelected(book)
      openDialog()
    },
    [openDialog]
  )

  return (
    <BookInfoListProvider keyword={initialKeyword}>
      <KeywordForm keyword={initialKeyword} />
      <Suspense fallback={<Loading />}>
        <BookInfoList setBook={handleOnSelect} />
      </Suspense>
      <AddBookDialog book={selected} />
    </BookInfoListProvider>
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
}
const AddBookDialog = (props: AddBookDialogProps) => {
  const { book } = props
  const { openNotification } = useNotification()
  const { show, closeDialog } = useDialog()

  const handleOnAdd = useCallback(() => {
    book &&
      registerBook(book.isbn, book.title, book.imgSrc).then(() => {
        closeDialog()
        openNotification('登録しました')
      })
  }, [book, closeDialog, openNotification])

  return (
    <Dialog show={show} close={closeDialog}>
      {book && (
        <div className='mx-10 my-5'>
          <h5 className='text-2xl font-semibold'>{book.title}</h5>
          <div className='flex flex-row mt-5'>
            <div className='mr-10'>
              {book.imgSrc ? <img src={book.imgSrc} /> : <BookIcon />}
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
      )}
    </Dialog>
  )
}
