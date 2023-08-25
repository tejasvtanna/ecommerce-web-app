import { useEffect, useState, useCallback } from 'react'
import { Container, Row, Col } from 'react-bootstrap/'
import ProductScreenTemplate from 'components/templates/ProductScreenTemplate/ProductScreenTemplate'
import ProductCard from 'components/molecules/ProductCard/ProductCard'
import { useLocation } from 'react-router-dom'
import SearchFilter from './SearchFilter'
import api from 'services/api'
import {
  BrandOptions,
  CategoryOptions,
  DeliveryOptions,
  DiscountOptions,
  FilterOptions,
  urlConst,
} from 'utilities/constants'
import Spinner from 'components/atoms/Loaders/ThreeDots'
import { getValidArray, getQueryStringFromStates } from 'utilities/utilFunctions'

const ProductSearch: React.FC<{}> = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const qs = require('qs')
  const location = useLocation()

  const [products, setProducts] = useState<any[]>([])
  const [globalSearch, setGlobalSearch] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([])
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState<string[]>([])

  const fetchProducts = useCallback((queryString: string) => {
    setLoading(true)
    api.get(urlConst.PRODUCTS + queryString).then(
      (res) => {
        setProducts(res.data)
        setLoading(false)
      },
      (error) => {
        console.error('useEffect Get Product By Filter', error.toString())
        setLoading(false)
      }
    )
  }, [])

  const updateStatesFromQueryString = useCallback(
    (queryString) => {
      const qsArr = qs.parse(queryString, { ignoreQueryPrefix: true })
      Object.keys(qsArr).forEach((key) => {
        switch (key) {
          case 'q':
            setGlobalSearch(qsArr[key])
            break

          case FilterOptions.Category:
            const validGenders = getValidArray(CategoryOptions, qsArr, key)
            setSelectedCategories([...validGenders])
            break

          case FilterOptions.Brand:
            const validBrands = getValidArray(BrandOptions, qsArr, key)
            setSelectedBrands([...validBrands])
            break

          case FilterOptions.Discount:
            const validDiscounts = getValidArray(DiscountOptions, qsArr, key)
            setSelectedDiscounts([...validDiscounts])
            break

          case FilterOptions.DeliveryTime:
            const validDeliveryTime = getValidArray(DeliveryOptions, qsArr, key)
            setSelectedDiscounts([...validDeliveryTime])
            break

          default:
            break
        }
      })
    },
    [qs]
  )

  useEffect(() => {
    updateStatesFromQueryString(location.search)
  }, [location.search, updateStatesFromQueryString])

  useEffect(() => {
    // Update URL based on filters selected
    const queryString = getQueryStringFromStates(
      globalSearch,
      selectedCategories,
      selectedBrands,
      selectedDiscounts,
      selectedDeliveryTime
    )
    window.history.pushState({}, '', '/search' + queryString)

    fetchProducts(queryString)
  }, [globalSearch, selectedCategories, selectedBrands, selectedDiscounts, selectedDeliveryTime, fetchProducts])

  return (
    <ProductScreenTemplate>
      <Container>
        <Row>
          <Col sm={2}>
            <br />
            <h5>Products Found: {products.length}</h5>
            <br />
            <SearchFilter
              heading={FilterOptions.Category}
              options={CategoryOptions}
              selection={selectedCategories}
              onSelectionChange={setSelectedCategories}
            />
            <br />
            <SearchFilter
              heading={FilterOptions.Brand}
              options={BrandOptions}
              selection={selectedBrands}
              onSelectionChange={setSelectedBrands}
            />
            <br />
            <SearchFilter
              heading={FilterOptions.Discount}
              options={DiscountOptions}
              selection={selectedDiscounts}
              onSelectionChange={setSelectedDiscounts}
              optionSuffix="%"
            />
            <br />
            <SearchFilter
              heading={FilterOptions.DeliveryTime}
              options={DeliveryOptions}
              selection={selectedDeliveryTime}
              onSelectionChange={setSelectedDeliveryTime}
            />
          </Col>

          <Col>
            <Row>
              {loading && <Spinner />}
              {!loading && !products.length && <Col>No matching products found...</Col>}

              {!loading &&
                products.map((product: any) => (
                  <Col sm={3} key={product.id}>
                    <ProductCard product={product}></ProductCard>
                  </Col>
                ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </ProductScreenTemplate>
  )
}

export default ProductSearch
