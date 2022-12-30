import { Suspense, useCallback, useState } from 'react'
import { useDialog } from '../../context/dialog'
import { Loading } from '../../components/Loading'
import { BooksProvider, useBooks } from './useBooks'
import { useNotification } from '../../context/notification'
import { createUsageApplication } from './api'
import { Book } from './type'
import { BookIcon } from '../../components/Icon'
import { RoundedButton } from '../../components/Button'
import { Dialog } from '../../components/Dialog'
import { ResponsiveBookCards } from '../../components/Book'

export const BookList = () => {
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
      <Suspense fallback={<Loading />}>
        <BookCardList onSelect={handleOnSelect} />
      </Suspense>
      <CreateUsageApplicationDialog book={selected} />
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
    <ResponsiveBookCards
      hoverText='貸出申請する'
      bookProps={books.map((b) => ({
        title: b.title,
        imgSrc: b.imgSrc,
        onClick: props.onSelect(b),
      }))}
    />
  )
}

type CreateUsageApplicationDialogProps = {
  book?: Book
}
const CreateUsageApplicationDialog = (
  props: CreateUsageApplicationDialogProps
) => {
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
