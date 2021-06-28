import React, { useState } from 'react'
import { Row, Col, Card, Table } from 'react-bootstrap'
import OrderedProducts from '../OrderedProducts/OrderedProducts'
import styles from './OrderDetail.module.css'

type Props = {
  orders: any[]
}

const OrderDetail = ({ orders }: Props) => {
  const [showProducts, setShowProducts] = useState(
    orders.map(() => {
      return false
    })
  )

  const handleShowHide = (idx: number) => {
    const arr = [...showProducts]
    arr[idx] = !arr[idx]
    setShowProducts(arr)
  }

  return (
    <Row>
      <Col>
        {orders.map((order: any) => (
          <Card key={order.id} className={styles.card} onClick={() => handleShowHide(order.id)}>
            <Card.Header>
              <Row>
                <Col>
                  <h3>Order ID # {order.id}</h3>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col sm={10}>
                  <Table bordered>
                    <tbody>
                      <tr>
                        <th style={{ width: '25%' }}>Order Date</th>
                        <td>{order.orderDate}</td>
                      </tr>
                      <tr>
                        <th>Order Amount</th>
                        <td>{order.netPayableAmt}</td>
                      </tr>
                      <tr>
                        <th>Shipping Address</th>
                        <td>
                          {`${order.shippingAddr.address}, ${order.shippingAddr.city}, ${order.shippingAddr.state}, ${order.shippingAddr.zip}`}
                        </td>
                      </tr>
                      <tr>
                        <th>Payment Reference #</th>
                        <td>{order.paymentRefNumber}</td>
                      </tr>
                      <tr>
                        <th>Order Status</th>
                        <td>{order.orderStatus}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <div style={{ display: showProducts[order.id] ? 'block' : 'none' }}>
                <Row>
                  <Col>
                    <OrderedProducts products={order.products} />
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        ))}
      </Col>
    </Row>
  )
}

export default OrderDetail
