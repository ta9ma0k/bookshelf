import { Suspense, useCallback, useState } from 'react'
import { useDialog } from '../../context/dialog'
import { Loading } from '../../components/Loading'
import { useNotification } from '../../context/notification'
import { createUsageApplication } from './api'
import { Book } from './type'
import { Dialog } from '../../components/Dialog'
import { ResponsiveBookCards } from '../../components/Book'
import { BookIcon } from '../../components/Icon'
import { z } from 'zod'
import { Form, Textarea } from '../../components/Form'
import { RoundedButton } from '../../components/Button'
import { PagingBooksProvider, usePagingBooks } from './usePagingBooks'
import clsx from 'clsx'
import { NextButton } from '../../components/Button/NextButton'

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
    <PagingBooksProvider>
      <BookCardList onSelect={handleOnSelect} />
      <Suspense fallback={<Loading />}>
        <FetchButton />
      </Suspense>
      <CreateUsageApplicationDialog book={selected} />
    </PagingBooksProvider>
  )
}

type BookCardListProps = {
  onSelect: (book: Book) => () => void
}
const BookCardList = (props: BookCardListProps) => {
  const { books } = usePagingBooks()

  return (
    <ResponsiveBookCards
      hoverText='貸出申請する'
      bookProps={books.map((b) => ({
        title: b.title,
        thumbnailUrl: b.thumbnailUrl,
        onClick: props.onSelect(b),
      }))}
    />
  )
}

const FetchButton = () => {
  const { booksResource, next, isNext } = usePagingBooks()
  booksResource.read()

  return (
    <div className={clsx('mt-3', isNext ? undefined : 'hidden')}>
      <NextButton onClick={next} />
    </div>
  )
}

const schema = z.object({
  reason: z.string().min(1, 'Required'),
})
type RequestReasonValues = {
  reason: string
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

  const handleOnRequest = useCallback(
    (reason: string) => {
      book &&
        createUsageApplication(book.isbn, reason).then(() => {
          closeDialog()
          openNotification('貸出申請しました')
        })
    },
    [book, closeDialog, openNotification]
  )

  return (
    <Dialog show={show} close={closeDialog}>
      {book && (
        <div className='mx-10'>
          <h5 className='font-semibold text-xl mb-4'>{book.title}</h5>
          <div className='flex flex-col space-y-3 md:flex-row md:space-x-3'>
            <div>
              {book.thumbnailUrl ? (
                <img className='w-36' src={book.thumbnailUrl} />
              ) : (
                <BookIcon />
              )}
            </div>
            <Form<RequestReasonValues, typeof schema>
              schema={schema}
              onSubmit={(values) => {
                handleOnRequest(values.reason)
              }}
            >
              {({ register, formState }) => (
                <div className='flex flex-col w-96 space-y-3'>
                  <Textarea
                    rows={7}
                    error={formState.errors.reason}
                    registration={register('reason')}
                    placeholder='申請理由'
                  />
                  <RoundedButton type='submit'>
                    <span>貸出申請する</span>
                  </RoundedButton>
                </div>
              )}
            </Form>
          </div>
        </div>
      )}
    </Dialog>
  )
}
