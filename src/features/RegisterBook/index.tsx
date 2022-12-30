import { motion } from 'framer-motion'
import { Suspense, useCallback, useState } from 'react'
import { useDialog } from '../../context/dialog'
import { BookIcon, SearchIcon } from '../../components/Icon'
import { Loading } from '../../components/Loading'
import { useNotification } from '../../context/notification'
import { BookInfoListProvider, useBookInfoList } from './useBookInfoList'
import { registerBook } from './api'
import { BookInfo } from './type'
import { Dialog } from '../../components/Dialog'
import { ResponsiveBookCards } from '../../components/Book'
import { z } from 'zod'
import { Form, InputField } from '../../components/Form'
import { RoundedButton } from '../../components/Button'

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
      <div className='space-y-5'>
        <KeywordForm />
        <Suspense fallback={<Loading />}>
          <BookInfoList setBook={handleOnSelect} />
        </Suspense>
      </div>
      <AddBookDialog book={selected} />
    </BookInfoListProvider>
  )
}

const schema = z.object({
  keyword: z.string().min(1, 'please input some keywords.'),
})
type SearchKeywordValues = {
  keyword: string
}

const KeywordForm = () => {
  const { setKeyword } = useBookInfoList()

  return (
    <Form<SearchKeywordValues, typeof schema>
      schema={schema}
      onSubmit={(values) => {
        setKeyword(values.keyword)
      }}
    >
      {({ register, formState }) => (
        <div className='flex flex-row justify-center space-x-5'>
          <InputField
            type='text'
            defalutValue={initialKeyword}
            error={formState.errors.keyword}
            registration={register('keyword')}
          />
          <motion.button whileHover={{ scale: 1.1 }} type='submit'>
            <SearchIcon />
          </motion.button>
        </div>
      )}
    </Form>
  )
}

type BookInfoListProps = {
  setBook: (book: BookInfo) => () => void
}
const BookInfoList = (props: BookInfoListProps) => {
  const { bookInfoListResource } = useBookInfoList()
  const bookInfoList = bookInfoListResource.read()

  return (
    <ResponsiveBookCards
      hoverText='登録する'
      bookProps={bookInfoList.map((b) => ({
        title: b.title,
        thumbnailUrl: b.thumbnailUrl,
        onClick: props.setBook(b),
      }))}
    />
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
      registerBook(book.isbn, book.title, book.thumbnailUrl).then(() => {
        closeDialog()
        openNotification('登録しました')
      })
  }, [book, closeDialog, openNotification])

  return (
    <Dialog show={show} close={closeDialog}>
      {book && (
        <div className='mx-10'>
          <h5 className='font-semibold text-xl'>{book.title}</h5>
          <div className='mt-4 ml-4 flex flex-row space-x-6'>
            <div>
              {book.thumbnailUrl ? (
                <img className='w-36' src={book.thumbnailUrl} />
              ) : (
                <BookIcon />
              )}
            </div>
            <div className='flex items-center'>
              <RoundedButton onClick={handleOnAdd}>
                <span className='text-xl'>登録する</span>
              </RoundedButton>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  )
}
