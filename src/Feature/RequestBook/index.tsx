import { Suspense, useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { BookCard } from '../../components/Book'
import { Dialog } from '../../components/Dialog'
import { Loading } from '../../components/Loading'
import { Book } from '../../domain/book'
import { BooksProvider, useBooks } from './useBooks'
import { RequestRepository } from '../../domain/request'
import { useNotification } from '../../components/Notification'
import { Layouts } from '../../components/Layout'

export const RequestBook = () => {
  const [selected, setSelected] = useState<Book | undefined>()

  const handleOnClose = useCallback(() => {
    setSelected(undefined)
  }, [])

  const handleOnSelect = useCallback(
    (book: Book) => () => {
      setSelected(book)
    },
    []
  )

  return (
    <Layouts>
      <BooksProvider>
        <div className='mt-8 flex justify-center'>
          <Suspense fallback={<Loading />}>
            <BookCardList onSelect={handleOnSelect} />
          </Suspense>
        </div>
        <RequestDialog book={selected} onClose={handleOnClose} />
      </BooksProvider>
    </Layouts>
  )
}

type BookCardListProps = {
  onSelect: (book: Book) => () => void
}
const BookCardList = (props: BookCardListProps) => {
  const { booksResource } = useBooks()
  const books = booksResource.read()

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
      {books.map((b, i) => (
        <div
          key={`book-${i}`}
          className='hover:cursor-pointer'
          onClick={props.onSelect(b)}
        >
          <BookCard title={b.title} imgSrc={b.imgSrc} />
        </div>
      ))}
    </div>
  )
}

type RequestDialogProps = {
  book?: Book
  onClose: () => void
}
const RequestDialog = (props: RequestDialogProps) => {
  const { book, onClose } = props
  const { openNotification } = useNotification()

  const handleOnRequest = useCallback(() => {
    book &&
      RequestRepository.create(book.title, 'hoge').then(() => {
        onClose()
        openNotification('貸出申請しました')
      })
  }, [book, onClose, openNotification])

  return (
    <Dialog show={!!book} onClose={onClose}>
      <div className='mx-10 my-5'>
        <h5 className='text-2xl font-semibold'>{book?.title}</h5>
        <div className='flex flex-row mt-5'>
          <div className='mr-10'>
            <img src={book?.imgSrc} />
          </div>
          <div className='flex items-center'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className='text-xl px-5 py-2 border-2 rounded-full'
              onClick={handleOnRequest}
            >
              貸出申請する
            </motion.button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
