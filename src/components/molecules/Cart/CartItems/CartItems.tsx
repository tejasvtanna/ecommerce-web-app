import React from 'react'
import { useDispatch } from 'react-redux'
import { Card, Row, Col } from 'react-bootstrap'
import { IncrementDecrement } from 'components/atoms/Buttons'
import { ImCross } from 'react-icons/im'
import { Button } from 'components/atoms/Buttons'

import { cartActions } from 'redux/actions'
import styles from './CartItems.module.css'

interface Props {
  cartItems: any[]
}

export const CartItems = ({ cartItems }: Props) => {
  const dispatch = useDispatch()

  const handleRemove = (event: any, id: number) => {
    event.stopPropagation()
    dispatch(cartActions.removeFromCart(id))
  }

  const handleUpdateQty = (event: any, id: number, qty: number) => {
    if (qty === 0) {
      handleRemove(event, id)
      return
    }

    event.stopPropagation()
    const selectedItem = cartItems.find((item: any) => item.id === id)
    if (selectedItem) {
      const updatedItem = {
        id: selectedItem.id,
        userId: selectedItem.userId,
        productId: selectedItem.productId,
        color: selectedItem.color,
        size: selectedItem.size,
        qty: qty,
      }
      dispatch(cartActions.updateQty(updatedItem))
    }
  }

  return (
    <>
      {cartItems.map((item: any) => (
        <Row key={item.id}>
          <Col>
            <Card
              className={styles.card}
              onClick={() => {
                window.open(`/product/${item.id}`, '_blank')
              }}>
              <Card.Body>
                <Row>
                  <Col sm={4}>
                    <img
                      alt={item.product.title}
                      src={item.product.images && `${item.product.images[0]}?random=${item.id}`}
                      style={{ maxHeight: '13rem' }}
                    />
                  </Col>
                  <Col sm={6}>
                    <div className={styles.mainInfo}>
                      <span className={styles.title}>
                        {item.product.title} # {item.product.id}
                      </span>
                      <br />
                      <span className={styles.smallDesc}>{item.product.smallDesc} </span>
                    </div>
                    <span className={styles.heading}>Price: </span>
                    {item.product.price}
                    <br />
                    <span className={styles.heading}>Delivery Time: </span>
                    {item.product.deliveryTime}
                    <br />
                    <span className={styles.heading}>Ratings: </span>
                    <span className={styles.starRatings}>
                      {[...Array(item.product.ratings)].map((value, index) => (
                        <span key={index}>★</span>
                      ))}
                    </span>
                    <br />
                    <span className={styles.heading}>Size: </span>
                    {item.size}
                    &nbsp; &nbsp; &nbsp;
                    <span className={styles.heading}>Color: </span>
                    {item.color}
                    {/* <br /> */}
                  </Col>
                  <Col className={styles.buttonsWrapper}>
                    <IncrementDecrement
                      count={item.qty}
                      onIncrement={(e: any) => handleUpdateQty(e, item.id, item.qty + 1)}
                      onDecrement={(e: any) => handleUpdateQty(e, item.id, item.qty - 1)}
                    />
                    <Button variant="light" onClick={(e: any) => handleRemove(e, item.id)}>
                      <ImCross className={styles.icon} /> Remove
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}
    </>
  )
}
