import React, { Suspense } from 'react'
import { BookCard } from '../../components/Book'
import { Loading } from '../../components/Loading'
import { BooksProvider, useBooks } from './useBooks'

export const RequestBook = () => {
  return (
    <BooksProvider>
      <div className='mt-8 flex justify-center'>
        <Suspense fallback={<Loading />}>
          <BookCardList />
        </Suspense>
      </div>
    </BooksProvider>
  )
}

const BookCardList = () => {
  const { booksResource } = useBooks()
  const books = booksResource.read()

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {books.map((d, i) => (
        <React.Fragment key={`book-${i}`}>
          <BookCard title={d.title} imgSrc={d.imgSrc} />
        </React.Fragment>
      ))}
    </div>
  )
}
