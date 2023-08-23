import React from 'react'
import Footer from 'components/organisms/Footer/Footer'
import Navbar from 'components/organisms/navbar/Navbar'
import Alert from 'components/atoms/Alert/Alert'
import BreadCrumbs from 'components/organisms/breadcrumbs/BreadCrumbs'

interface Props {
  footer?: boolean
}

const ProductScreenTemplate: React.FC<Props> = ({ children, footer }) => {
  return (
    <>
      <Navbar />
      <BreadCrumbs />
      <Alert />
      <br />
      {children}
      {footer && <Footer />}
    </>
  )
}

export default ProductScreenTemplate
