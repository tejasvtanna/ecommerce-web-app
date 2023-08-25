import React, { useEffect, useState, useMemo } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { cartActions, orderActions } from 'redux/actions'
import ProductScreenTemplate from 'components/templates/ProductScreenTemplate/ProductScreenTemplate'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'
import { CartSummary, CartItems, ShippingAddress } from 'components/molecules/Cart/'
import { processPaymentRazorPay } from 'utilities/utilFunctions'
import { Button } from 'components/atoms/Buttons'
import FadingLoader from 'components/atoms/Loaders/FadingLoader'

const Cart = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { currentUser } = useAuth()
  const { loading, items: cartItems } = useSelector((state: any) => state.cart)
  const { user } = useSelector((state: any) => state.user)
  const addresses = useSelector((state: any) => state.addresses.list)
  const [defaultAddr, setDefaultAddr] = useState<any>()

  // Memoized function to calculate only if the cartItems change
  const cartSummary = useMemo(() => {
    const total = Math.round(
      cartItems.reduce(
        (acc: number, curr) => (acc += curr.product.price * curr.qty * (1 + curr.product.discount / 100)),
        0
      )
    )
    const discount = cartItems.reduce(
      (acc: number, curr) => (acc += Math.round(curr.product.price * curr.qty * (curr.product.discount / 100))),
      0
    )
    const deliveryCharge = cartItems.reduce((acc: number, curr) => (acc += curr.product.deliveryCharge), 0)
    const gst = Math.round((total - discount) * 0.1)
    const netPayableAmt = total - discount + gst + deliveryCharge

    return { total, discount, deliveryCharge, gst, netPayableAmt }
  }, [cartItems])

  useEffect(() => {
    dispatch(cartActions.getCartByUser(currentUser.uid))
  }, [dispatch, currentUser])

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
      netPayableAmt: cartSummary.netPayableAmt,
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
              <CartSummary {...cartSummary} />
              <br />
              <ShippingAddress defaultAddr={defaultAddr} />
              <br />
              <Button
                block
                onClick={() => processPaymentRazorPay(cartSummary.netPayableAmt, placeOrder)}
                disabled={!defaultAddr}>
                Place Order
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    </ProductScreenTemplate>
  )
}

export default Cart
