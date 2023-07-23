import { useEffect } from 'react'
import ProductScreenTemplate from 'components/templates/ProductScreenTemplate/ProductScreenTemplate'
import { Carousel, Container } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { productActions } from 'redux/actions'
import styles from './LandingPage.module.css'

import BannerMen from 'assets/banners/men.jpg'
import BannerWomen from 'assets/banners/women.jpg'
import BannerMenWomen from 'assets/banners/men-women.jpg'
import BannerKids from 'assets/banners/kids.jpg'
import ProductHighlight from './ProductHighlight'
import { CUSTOMER_CATEGORY } from 'utilities/constants'

const LandingPage = () => {
  const dispatch = useDispatch()
  const trendingMen = useSelector((state: any) => state.products.trendingMen)
  const trendingWomen = useSelector((state: any) => state.products.trendingWomen)
  const trendingKids = useSelector((state: any) => state.products.trendingKids)
  const topOffers = useSelector((state: any) => state.products.topOffers)

  const carouselItems = [
    { img: BannerMen, filterStr: 'category=Men' },
    { img: BannerWomen, filterStr: 'category=Women' },
    { img: BannerMenWomen, filterStr: 'category=Men&category=Women' },
    { img: BannerKids, filterStr: 'category=Kids' },
  ]

  useEffect(() => {
    if (!trendingMen.length) dispatch(productActions.getTrendingProducts(CUSTOMER_CATEGORY.MEN))
    if (!trendingWomen.length) dispatch(productActions.getTrendingProducts(CUSTOMER_CATEGORY.WOMEN))
    if (!trendingKids.length) dispatch(productActions.getTrendingProducts(CUSTOMER_CATEGORY.KIDS))
    if (!topOffers.length) dispatch(productActions.getTopOfferProducts())
  }, [dispatch, topOffers.length, trendingKids.length, trendingMen.length, trendingWomen.length])

  return (
    <ProductScreenTemplate>
      <Container fluid>
        <Carousel fade>
          {carouselItems.map((item: any, idx: number) => (
            <Carousel.Item className={styles.carouselItem} key={idx}>
              <Link to={`/search?${item.filterStr}`} style={{ margin: '0' }}>
                <img className="d-block w-100" src={item.img} alt="" />
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>

        <ProductHighlight heading="Trending In Men" products={trendingMen}></ProductHighlight>
        <ProductHighlight heading="Trending In Women" products={trendingWomen}></ProductHighlight>
        <ProductHighlight heading="Trending In Kids" products={trendingKids}></ProductHighlight>

        <ProductHighlight heading="Top Offers" products={topOffers}></ProductHighlight>
      </Container>
    </ProductScreenTemplate>
  )
}

export default LandingPage
