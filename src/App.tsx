import { BookCard } from './components/Book'

const App = () => {
  const bookTitle = 'プログラミングの仕組み'
  const imgSrc =
    'http://books.google.com/books/content?id=fbbvDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
  return <BookCard title={bookTitle} imgSrc={imgSrc} />
}

export default App
