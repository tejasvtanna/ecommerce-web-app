import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap/'
import { ImageSlider, FAQs, KeyInfo, Reviews } from '../../components/molecules/ProductDetail'
import ProductScreenTemplate from '../../components/templates/ProductscreenTemplate/ProductScreenTemplate'
import styles from './ProductDetail.module.css'
import { useParams } from 'react-router-dom'
import NotFound404 from '../NotFound404/NotFound404'
import ThreeDots from 'components/atoms/Loaders/ThreeDots'
import api from 'services/api'
import { urlConst } from 'utilities/constants'

interface Props {}

const ProductDetail = ({}: Props) => {
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState<any>()

  let { productId }: any = useParams()

  useEffect(() => {
    const getProductData = () => {
      setLoading(true)
      api
        .get(urlConst.PRODUCTS + `/${productId}`)
        .then((response) => {
          setProduct(response.data)
          setLoading(false)
        })
        .catch((error) => {
          console.error('ProudctDetails.tsx.getProudctData() : ' + error.toString())
          setLoading(false)
        })
    }

    getProductData()
  }, [productId])

  if (!productId) {
    return <NotFound404 message="Product Not Found" />
  }

  if (!product && !loading) return <NotFound404 message="Product Not Found" />
  // console.log(`product`, product)
  // console.log(`loading`, loading)

  return (
    <ProductScreenTemplate>
      {loading && <ThreeDots />}

      {!loading && (
        <Container className={styles.container}>
          <Row>
            <Col sm={5}>
              <ImageSlider images={product.images} />
            </Col>
            <Col>
              <KeyInfo product={product} />
            </Col>
          </Row>
          <Row>
            <div>
              <br />
              <br />
            </div>
          </Row>
          <Row>
            <Col sm={5}>
              <FAQs productId={product.id} />
            </Col>
            <Col>
              <Reviews productId={product.id} />
            </Col>
          </Row>
        </Container>
      )}
    </ProductScreenTemplate>
  )
}

export default ProductDetail
