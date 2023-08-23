import { Card, Badge } from 'react-bootstrap'
import styles from './ProductCard.module.css'
import { WishlistButton } from 'components/atoms/Buttons'
import { useHistory } from 'react-router'

interface Props {
  product: any
  openInNewTab?: boolean
}

const ProductCard = ({ product, openInNewTab = true }: Props) => {
  const history = useHistory()

  return (
    <Card
      className={styles.card}
      onClick={() => {
        if (openInNewTab) window.open(`/product/${product.id}`, '_blank')
        else history.push(`/product/${product.id}`)
      }}
      // onMouseEnter={(e: MouseEvent<HTMLDivElement>) => {
      //   setStyle({ visibility: 'visible' })
      // }}
      // onMouseLeave={(e: MouseEvent<HTMLDivElement>) => {
      //   setStyle({ visibility: 'hidden' })
      // }}
    >
      <Card.Img
        variant="top"
        src={product.images && product.images[0] + `?random${product.id}`}
        className={styles.img}
      />
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styles.cardTitle}>
          {product.title}
          {/* -{product.id} */}
        </Card.Title>
        <div className={styles.cardTxt}>
          <span className={styles.heading}>Ratings: </span>
          <span className={styles.starRatings}>
            {[...Array(product.ratings)].map((_, index) => (
              <span key={index}>★</span>
            ))}
          </span>
          <br />
          <span className={styles.heading}>Price: </span>
          <span className={styles.priceWithoutDiscount}>
            {Math.round((product.price * (100 - product.discount)) / 100)}
          </span>
          {product.price}
          &nbsp; &nbsp;
          <span className={styles.discount}>{'(' + product.discount + '% OFF)'}</span>
          <br />
          {/* <span className={styles.heading}>Size: </span>
          <span>{product.size.join(', ')}</span> */}
        </div>
        <br />
        <div className={styles.buttonsWrapper}>
          <WishlistButton productId={product.id} />
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
