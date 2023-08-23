import { useEffect, useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { FiHeart } from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux'
import { wishlistActions } from 'redux/actions'
import { useAuth } from 'contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import { Button } from 'components/atoms/Buttons'

interface Props {
  productId: number
}

export const WishlistButton = ({ productId }: Props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { currentUser } = useAuth()
  const wishlist = useSelector((state: any) => state.wishlist.list)
  const [wishlisted, setWishlisted] = useState(false)

  useEffect(() => {
    setWishlisted(wishlist.some((wish: any) => wish.productId === productId))
  }, [wishlist, productId])

  const handleAddToWishlist = (event: any) => {
    event.stopPropagation()

    if (!currentUser) {
      history.push(`/login?returnUrl=/product/${productId}`)
      return
    }

    dispatch(wishlistActions.addToWishlist({ userId: currentUser.uid, productId: productId }))
  }

  const handleRemoveFromWishlist = (event: any) => {
    event.stopPropagation()
    const wish = wishlist.find((wish: any) => wish.productId === productId && wish.userId === currentUser.uid)
    dispatch(wishlistActions.removeFromWishlist(wish.id))
  }

  return (
    <>
      {wishlisted && (
        <Button
          variant="light"
          block
          customStyle={{ color: '#ff3e6c' }}
          onClick={(event: any) => handleRemoveFromWishlist(event)}>
          <FaCheck style={iconStyle} />
          Wishlisted
        </Button>
      )}
      {!wishlisted && (
        <Button variant="light" block onClick={(event: any) => handleAddToWishlist(event)}>
          <FiHeart style={iconStyle} />
          Add To Wishlist
        </Button>
      )}
    </>
  )
}

const iconStyle: React.CSSProperties = { float: 'left', fontSize: '1.3rem' }
