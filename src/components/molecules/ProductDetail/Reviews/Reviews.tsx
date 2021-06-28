import React, { useState, useEffect } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import styles from './Reviews.module.css'
import FadingLoader from 'components/atoms/Loaders/FadingLoader'
import { urlConst } from 'utilities/constants'
import api from 'services/api'

interface Props {
  // reviews: any[]
  productId: number
}

export const Reviews: React.FC<Props> = ({ productId }: Props) => {
  // const dispatch = useDispatch()
  // const loading = useSelector((state: any) => state.reviews.loading)
  // const reviews = useSelector((state: any) => state.reviews.detailPage)
  const [loading, setLoading] = useState(false)
  const [reviews, setReviews] = useState([])

  // useEffect(() => {
  //   dispatch(reviewActions.getReviewsByProduct(productId))
  // }, [productId])

  useEffect(() => {
    const getReviewsByProduct = (productId: number) => {
      setLoading(true)
      api
        .get(urlConst.REVIEWS + `?productId=${productId}`)
        .then((response) => {
          setLoading(false)
          setReviews(response.data)
        })
        .catch((err) => {
          setLoading(false)
          console.error('Reviews.tsx.getReviewsByProduct : ' + err.toString())
        })
    }

    getReviewsByProduct(productId)
  }, [])

  return (
    <Card className={styles.card}>
      <Card.Header as="h2">Reviews & Ratings</Card.Header>
      <Card.Body>
        {loading && <FadingLoader />}
        {!loading && reviews.length === 0 && <small>No reviews yet</small>}
        {!loading &&
          reviews.map((review: any, index: number) => (
            <div className={styles.reviewBlock} key={index}>
              <Row>
                <Col>
                  <h5>{review.reviewer}</h5>
                </Col>
                <Col>
                  <h5>{review.reviewDate}</h5>
                </Col>
                <Col>
                  <div className={styles.starRatings}>
                    {[...Array(review.ratings)].map((value, index) => (
                      <span key={index}>★</span>
                    ))}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className={styles.review}>
                  <span>{review.reviewText}</span>
                </Col>
              </Row>
            </div>
          ))}
      </Card.Body>
    </Card>
  )
}
