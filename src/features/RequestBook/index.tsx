import React, { Suspense, useCallback, useState } from 'react'
import { BookCard } from '../../components/Book'
import { useDialog } from '../../context/dialog'
import { Loading } from '../../components/Loading'
import { BooksProvider, useBooks } from './useBooks'
import { useNotification } from '../../context/notification'
import { createUsageApplication } from './api'
import { Book } from './type'
import { BookIcon } from '../../components/Icon'
import { RoundedButton } from '../../components/Button'
import { Dialog } from '../../components/Dialog'

export const RequestBook = () => {
  const [selected, setSelected] = useState<Book | undefined>()
  const { openDialog } = useDialog()

  const handleOnSelect = useCallback(
    (book: Book) => () => {
      setSelected(book)
      openDialog()
    },
    [openDialog]
  )

  return (
    <BooksProvider>
      <div className='mt-8 flex justify-center'>
        <Suspense fallback={<Loading />}>
          <BookCardList onSelect={handleOnSelect} />
        </Suspense>
      </div>
      <RequestDialog book={selected} />
    </BooksProvider>
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
}
const RequestDialog = (props: RequestDialogProps) => {
  const { book } = props
  const { openNotification } = useNotification()
  const { show, closeDialog } = useDialog()

  const handleOnRequest = useCallback(() => {
    book &&
      createUsageApplication(book.isbn).then(() => {
        closeDialog()
        openNotification('貸出申請しました')
      })
  }, [book, closeDialog, openNotification])

  return (
    <Dialog show={show} close={closeDialog}>
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
