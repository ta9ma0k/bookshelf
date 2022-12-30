import React from 'react'
import { BookCard } from './BookCard'

type BookCardsProps = {
  hoverText: string
  bookProps: {
    title: string
    thumbnailUrl?: string
    onClick: () => void
  }[]
}
export const ResponsiveBookCards = (props: BookCardsProps) => (
  <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
    {props.bookProps.map((b, i) => (
      <React.Fragment key={`book-${i}`}>
        <BookCard
          title={b.title}
          thumbnailUrl={b.thumbnailUrl}
          hoverText={props.hoverText}
          onClick={b.onClick}
        />
      </React.Fragment>
    ))}
  </div>
)
