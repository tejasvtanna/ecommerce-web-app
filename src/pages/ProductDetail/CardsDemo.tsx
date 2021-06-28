import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap/'
import ProductScreenTemplate from '../../components/templates/ProductscreenTemplate/ProductScreenTemplate'
// import Card from '../../components/atoms/Card/Card'
import ProductCard from '../../components/molecules/ProductCard/ProductCard'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { productActions } from '../../redux/actions'
// import qs from 'qs'
import { BrowserRouter as Router, Switch, useLocation } from 'react-router-dom'
import SearchFilter from '../ProductSearch/SearchFilter'

interface Props {}

{
  /* <Route path="/search/:category/:brands/:gender" component={CardsDemo}></Route> */
}

const CardsDemo = ({}: Props) => {
  const qs = require('qs')
  const dispatch = useDispatch()
  const location = useLocation()
  const loading = useSelector((state: any) => state.products.loading)
  const products = useSelector((state: any) => state.products.all)
  const { category, brands, gender }: any = useParams()

  console.log(`location`, location)
  useEffect(() => {
    // alert(location)
  }, [location])

  // const arr = qs.parse(location.search, { ignoreQueryPrefix: true })
  // const arr = qs.parse('a[]=b&a[]=c&b=1&c[]=1&c[]=2')
  const arr = qs.parse('?&gender=Male&gender=Female')
  console.log(`arr`, arr)

  return null

  // console.log(`category`, category)
  // console.log(`brands`, brands)
  // console.log(`gender`, gender)

  const update = () => {
    window.history.pushState({}, '', '/search?hello[]=1&hello[]=2')
  }

  useEffect(() => {
    dispatch(productActions.getAllProducts())
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
                {products.map((product: any, index: number) => (
                  <Col sm={3} key={index}>
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
