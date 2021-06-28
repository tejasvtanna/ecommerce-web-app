import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { cartActions, orderActions } from 'redux/actions'
import ProductScreenTemplate from 'components/templates/ProductscreenTemplate/ProductScreenTemplate'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'
import { CartSummary, CartItems, DefaultAddress } from 'components/molecules/Cart/'
import { processPaymentRazorpay } from 'utilities/utilFunctions'
import { Button } from 'components/atoms/Buttons'
import FadingLoader from 'components/atoms/Loaders/FadingLoader'

interface Props {}

const Cart = ({}: Props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { currentUser } = useAuth()
  const { loading, items: cartItems } = useSelector((state: any) => state.cart)
  const { user } = useSelector((state: any) => state.user)
  const addresses = useSelector((state: any) => state.addresses.list)

  const [defaultAddr, setDefaultAddr] = useState<any>()
  const [netPayableAmt, setNetPayableAmt] = useState(0)

  useEffect(() => {
    if (!cartItems.length) dispatch(cartActions.getCartByUser(currentUser.uid))
  }, [])

  useEffect(() => {
    if (user.defaultAddressId) setDefaultAddr(addresses.find((addr: any) => addr.id === user.defaultAddressId))
  }, [user, addresses])

  const placeOrder = (paymentRefNumber: string) => {
    const products = cartItems.map((item: any) => {
      return {
        id: item.product.id,
        title: item.product.title,
        image: item.product.images[0],
        price: item.product.price,
        color: item.color,
        size: item.size,
        qty: item.qty,
      }
    })
    const d = new Date()
    const order = {
      userId: currentUser.uid,
      orderDate: d.toDateString() + ' ' + d.toLocaleTimeString(),
      orderStatus: 'Placed',
      netPayableAmt,
      paymentRefNumber,
      shippingAddr: { ...defaultAddr },
      products,
    }
    dispatch(orderActions.placeOrder(order, cartItems))
    history.push('/profile/orders')
  }

  return (
    <ProductScreenTemplate>
      <Container>
        {loading && <FadingLoader />}
        {!loading && !cartItems.length && (
          <h3>
            Cart is empty. <Link to="/search">Continue Shopping.</Link>
          </h3>
        )}
        {!loading && cartItems.length > 0 && (
          <Row>
            <Col sm={8}>
              <CartItems cartItems={cartItems} />
            </Col>
            <Col>
              <CartSummary cartItems={cartItems} netPayableAmt={netPayableAmt} updateNetPaybleAmt={setNetPayableAmt} />
              <br />
              <DefaultAddress defaultAddr={defaultAddr} />
              <br />
              <Button block onClick={() => processPaymentRazorpay(netPayableAmt, placeOrder)} disabled={!defaultAddr}>
                Place Order
              </Button>
              {/* <p>{netPayableAmt}</p> */}
            </Col>
          </Row>
        )}
      </Container>
    </ProductScreenTemplate>
  )
}

export default Cart
