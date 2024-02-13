import PropTypes from 'prop-types'
import React from 'react'
import Footer from '../../Footer'
import Header from '../../Header'

export default function AppLayout({ children }) {
  return (
    <>
      <Header />
      <main className="mx-auto min-h-[85vh]">{children}</main>
      <Footer />
    </>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired
}