// import React from 'react'
import ProductCard from 'components/molecules/ProductCard/ProductCard'
import { Card, Row, Col } from 'react-bootstrap'
import ThreeDots from 'components/atoms/Loaders/ThreeDots'
import styles from './ProductHighlight.module.css'

interface Props {
  heading: string
  products: any[]
}

const ProductHighlight = ({ heading, products }: Props) => {
  return (
    <Card className={styles.card}>
      <Card.Header as="h2" className={styles.heading}>
        {heading}
      </Card.Header>
      <Card.Body>
        <Row>
          {!products.length && <ThreeDots />}

          {/* {!products.length && (
            <>
              <Col sm={5}></Col>
              <Col>
                <ThreeDots />
              </Col>
            </>
          )*/}
          {products.map((product: any, index: number) => (
            <Col sm={2} key={index}>
              <ProductCard product={product} openInNewTab={false} />
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  )
}

export default ProductHighlight
