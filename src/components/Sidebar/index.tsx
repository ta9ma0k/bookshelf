import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, useCallback, useState } from 'react'

const variants = {
  hidden: {
    opacity: 0,
    x: '-100vw',
    transition: {
      opacity: {
        duration: 0.4,
      },
      x: {
        duration: 0.2,
      },
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      opacity: {
        duration: 0.1,
      },
      x: {
        duration: 0.2,
      },
    },
  },
}
type SidebarProps = {
  children: ReactNode
}
export const Sidebar = ({ children }: SidebarProps) => {
  const [show, setShow] = useState(false)
  const handleOnShowSidebar = useCallback(() => setShow(true), [])
  const handleOnCloseSidebar = useCallback(() => setShow(false), [])

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.3 }}
        onClick={handleOnShowSidebar}
        className='text-4xl font-bold mt-3 mx-10'
      >
        B
      </motion.button>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={variants}
            className='w-full h-screen bg-gray-400 text-white px-10 fixed top-0 left-0 pt-3'
          >
            <motion.button
              className='text-4xl font-bold'
              onClick={handleOnCloseSidebar}
              whileHover={{ scale: 1.3 }}
            >
              B
            </motion.button>
            <ul className='mt-5 ml-5 space-y-3'>
              <LinkItem key='link-1' text='本を探す.' />
              <LinkItem key='link-2' text='申請を確認する.' />
              <LinkItem key='link-3' text='本を登録する.' />
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>

  )
}

type LinkItemProps = {
  key: string
  text: string
}
const LinkItem = (props: LinkItemProps) => (
  <motion.li
    key={props.key}
    className='text-2xl hover:cursor-pointer hover:text-3xl hover:font-bold duration-200'
  >
    {props.text}
  </motion.li>
)
