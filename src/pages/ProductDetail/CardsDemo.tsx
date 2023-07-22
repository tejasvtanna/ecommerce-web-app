import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap/'
import ProductScreenTemplate from 'components/templates/ProductScreenTemplate/ProductScreenTemplate'
import ProductCard from 'components/molecules/ProductCard/ProductCard'
import { useSelector, useDispatch } from 'react-redux'
import { productActions } from 'redux/actions'
import { useLocation } from 'react-router-dom'

interface Props {}

const CardsDemo = ({}: Props) => {
  const qs = require('qs')
  const dispatch = useDispatch()
  const location = useLocation()
  const loading = useSelector((state: any) => state.products.loading)
  const products = useSelector((state: any) => state.products.all)

  console.log(`location`, location)
  useEffect(() => {
    // alert(location)
  }, [location])

  const arr = qs.parse('?&gender=Male&gender=Female')
  console.log(`arr`, arr)

  useEffect(() => {
    dispatch(productActions.getTrendingProducts('MEN'))
  }, [])

  console.log(`loading`, loading)

  return (
    <ProductScreenTemplate>
      {loading && <h1>Loading...</h1>}

      {!loading && (
        <Container>
          {/* <button onClick={update}>Update URL</button> */}
          <Row>
            <Col sm={2}>
              <Row>{/* <SearchFilter heading={'Gender'} options={['Male', 'Female']} /> */}</Row>
              <Row>
                <br />
              </Row>
              <Row>{/* <SearchFilter heading={'Barnd'} options={['Puma', 'Adidas', 'Roadster']} /> */}</Row>
            </Col>

            <Col>
              <Row>
                {products.map((product: any) => (
                  <Col sm={3} key={product.id}>
                    <ProductCard product={product}></ProductCard>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </ProductScreenTemplate>
  )
}

export default CardsDemo
