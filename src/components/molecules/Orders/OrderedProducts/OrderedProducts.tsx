import { Table } from 'react-bootstrap'
import styles from './OrderedProducts.module.css'
import { Link } from 'react-router-dom'

interface Props {
  products: any[]
}

const OrderedProducts = ({ products }: Props) => {
  if (!products) return null
  if (!products.length) return null

  // console.log(`products`, products)

  return (
    <Table striped className={styles.table}>
      <tbody>
        {products.map((product: any, idx: number) => (
          <tr key={idx}>
            <td style={{ width: '20%' }}>
              <img src={`${product.image}?random=${idx}`} className={styles.img} alt="" />
            </td>
            <td>
              <Link to={`/product/${product.id}`} className={styles.heading} target="_blank">
                {product.title}
              </Link>
              <br />
              <span>
                <span className={styles.heading}>Qty: </span>
                {product.qty}
              </span>{' '}
              <br />
              <span>
                <span className={styles.heading}>Size: </span>
                {product.size}
              </span>{' '}
              <br />
              <span>
                <span className={styles.heading}>Color: </span>
                {product.color}
              </span>
            </td>
            <td className={styles.price} style={{ width: '18%' }}>
              ₹ {product.price}
            </td>
          </tr>
        ))}
      </tbody>
      {/* <tfoot className={styles.tfoot}>
        <tr>
          <td></td>
          <td></td>
          <td className={styles.price} style={{ fontWeight: 'bold' }}>
            ₹ {products.reduce((acc, curr) => acc + curr.price, 0)}
          </td>
        </tr>
      </tfoot> */}
    </Table>
  )
}

export default OrderedProducts
