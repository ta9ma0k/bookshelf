import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { ReactNode, useCallback, useState } from 'react'
import { NavLink } from 'react-router-dom'

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

type NavigationItem = {
  title: string
  to: string
}
const NavivationItems: NavigationItem[] = [
  {
    title: '本を探す.',
    to: '/',
  },
  {
    title: '本を登録する.',
    to: '/book-registration',
  },
  {
    title: '申請を確認する.',
    to: '/usage-applications',
  },
]
type SidebarProps = {
  children: ReactNode
}
export const Sidebar = ({ children }: SidebarProps) => {
  const [show, setShow] = useState(false)
  const handleOnShowSidebar = useCallback(() => setShow(true), [])
  const handleOnCloseSidebar = useCallback(() => setShow(false), [])

  return (
    <>
      <div className='w-full flex justify-start py-3 pl-10'>
        <motion.button
          whileHover={{ rotate: 45 }}
          onClick={handleOnShowSidebar}
          className='text-5xl font-bold'
        >
          B
        </motion.button>
      </div>
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
              className='text-5xl font-bold'
              onClick={handleOnCloseSidebar}
              whileHover={{ rotate: 45 }}
            >
              B
            </motion.button>
            <ul className='mt-5 ml-5 space-y-3'>
              {NavivationItems.map((item, i) => (
                <React.Fragment key={`sidebar-nav-${i}`}>
                  <LinkItem
                    text={item.title}
                    to={item.to}
                    onClick={handleOnCloseSidebar}
                  />
                </React.Fragment>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

type LinkItemProps = {
  text: string
  to: string
  onClick: () => void
}
const LinkItem = (props: LinkItemProps) => (
  <motion.li
    className='text-2xl hover:cursor-pointer hover:text-3xl hover:font-bold duration-200'
    onClick={props.onClick}
  >
    <NavLink
      to={props.to}
      className={({ isActive }) =>
        clsx(isActive ? 'text-gray-700 font-bold' : undefined)
      }
    >
      {props.text}
    </NavLink>
  </motion.li>
)
