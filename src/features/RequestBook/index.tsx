import React, { Suspense, useCallback, useState } from 'react'
import { BookCard } from '../../components/Book'
import { Dialog } from '../../components/Dialog'
import { Loading } from '../../components/Loading'
import { BooksProvider, useBooks } from './useBooks'
import { useNotification } from '../../components/Notification'
import { createRequest } from './api'
import { Book } from './type'
import { BookIcon } from '../../components/Icon'
import { RoundedButton } from '../../components/Button'

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
    <>
      <BooksProvider>
        <div className='mt-8 flex justify-center'>
          <Suspense fallback={<Loading />}>
            <BookCardList onSelect={handleOnSelect} />
          </Suspense>
        </div>
        <RequestDialog book={selected} onClose={handleOnClose} />
      </BooksProvider>
    </>
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
        <React.Fragment key={`book-${i}`}>
          <BookCard
            title={b.title}
            imgSrc={b.imgSrc}
            hoverText='貸出申請する'
            onClick={props.onSelect(b)}
          />
        </React.Fragment>
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
      createRequest(book.id).then(() => {
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
            {book?.imgSrc ? <img src={book?.imgSrc} /> : <BookIcon />}
          </div>
          <div className='flex items-center'>
            <RoundedButton onClick={handleOnRequest}>
              <span className='text-xl'>貸出申請する</span>
            </RoundedButton>
          </div>
        </div>
      </div>
    </Dialog>
  )
}