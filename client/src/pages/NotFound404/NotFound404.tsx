import ProductScreenTemplate from 'components/templates/ProductScreenTemplate/ProductScreenTemplate'
import styles from './NotFound404.module.css'

interface Props {
  message?: string
}

const NotFound404 = ({ message }: Props) => {
  return (
    <ProductScreenTemplate>
      <div className={styles.main}>
        <div className={styles.fof}>
          <h1 className={styles.err}>{message || 'Page Not Found'}</h1>
          <br />
          <a href="/" className={styles.link}>
            Go to Home Page
          </a>
        </div>
      </div>
    </ProductScreenTemplate>
  )
}

export default NotFound404
