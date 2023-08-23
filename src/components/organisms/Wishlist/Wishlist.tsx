import React, { useEffect } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import styles from './Wishlist.module.css'
import { FiXSquare } from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux'
import FadingLoader from 'components/atoms/Loaders/FadingLoader'
import { wishlistActions } from 'redux/actions'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'
import { Button } from 'components/atoms/Buttons'

const Wishlist = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { currentUser } = useAuth()
  const loading = useSelector((state: any) => state.wishlist.loading)
  const wishlist = useSelector((state: any) => state.wishlist.list)

  useEffect(() => {
    dispatch(wishlistActions.getWishlistByUser(currentUser.uid))
  }, [dispatch, currentUser.uid])

  const handleRemove = (event: any, id: number) => {
    event.stopPropagation()
    dispatch(wishlistActions.removeFromWishlist(id))
  }

  return (
    <>
      {/* {loading && <h3>Loading...</h3>} */}
      {loading && <FadingLoader />}
      {!loading && !wishlist.length && (
        <h3>
          Wishlist is empty. <Link to="/search">Browse Products.</Link>
        </h3>
      )}
      <Row>
        {!loading &&
          wishlist.map((wish: any) => (
            <Col sm={6}>
              <Card
                key={wish.id}
                className={styles.card}
                onClick={() => {
                  // window.open(`/product/${wish.id}`, '_blank')
                  history.push(`/product/${wish.id}`)
                }}>
                <Card.Body>
                  <Row>
                    <Col sm={3}>
                      <img
                        alt="Product Img"
                        className={styles.img}
                        src={wish.product.images && `${wish.product.images[0]}?random=${wish.id}`}
                      />
                    </Col>
                    <Col sm={6}>
                      <div className={styles.mainInfo}>
                        <span className={styles.title}>{wish.product.title}</span>
                        <br />
                        <span className={styles.smallDesc}>{wish.product.smallDesc} </span>
                      </div>
                      <span className={styles.heading}>Seller: </span> {wish.product.seller}
                      <br />
                      <span className={styles.heading}>Delivery Time: </span>
                      {wish.product.deliveryTime}
                      <br />
                      <div className={styles.starRatings}>
                        <span className={styles.heading}>Ratings: </span>
                        {[...Array(wish.product.ratings)].map((value, index) => (
                          <span key={index}>★</span>
                        ))}
                      </div>
                    </Col>
                    <Col className={styles.buttonsWrapper}>
                      <Button variant="light" onClick={(e: any) => handleRemove(e, wish.id)}>
                        <FiXSquare className={styles.icon} /> Remove
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  )
}

export default Wishlist
