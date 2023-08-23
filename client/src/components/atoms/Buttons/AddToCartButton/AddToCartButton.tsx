import { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { cartActions } from 'redux/actions'
import { useAuth } from 'contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import { Button } from 'components/atoms/Buttons'

interface Props {
  productId: number
  size?: string
  color?: string
}

export const AddToCartButton = ({ productId, size, color }: Props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { currentUser } = useAuth()
  const cartItems = useSelector((state: any) => state.cart.items)
  const [addedToCart, setAddedToCart] = useState<boolean>(false)

  useEffect(() => {
    setAddedToCart(cartItems.some((cart: any) => cart.productId === productId))
  }, [cartItems, productId])

  const handleAddToCart = () => {
    if (!currentUser) {
      history.push(`/login?returnUrl=/product/${productId}`)
      return
    }
    dispatch(cartActions.addToCart({ userId: currentUser.uid, productId, size, color, qty: 1 }))
  }

  // alert(addedToCart)

  return (
    <>
      {addedToCart && (
        <>
          <Button disabled onClick={handleAddToCart}>
            <FaCheck style={iconStyle} />
            Added To Cart
          </Button>
        </>
      )}
      {!addedToCart && (
        <>
          <Button disabled={!size || !color} onClick={handleAddToCart}>
            <FaShoppingCart style={iconStyle} />
            Add To Cart
          </Button>
        </>
      )}
    </>
  )
}

const iconStyle: React.CSSProperties = { float: 'left', fontSize: '1.3rem' }
