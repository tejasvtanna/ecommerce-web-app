import { wishlistService } from '../../services'
import { actionConst } from '../../utilities/constants'
import { alertActions } from '.'

export const wishlistActions = {
  getWishlistByUser,
  addToWishlist,
  removeFromWishlist,
}

function getWishlistByUser(userId: string) {
  return (dispatch: any) => {
    dispatch({ type: actionConst.WISHLIST_REQUEST })

    wishlistService.getWishlistByUser(userId).then(
      (wishlist) => {
        dispatch({ type: actionConst.GET_WISHLIST_BY_USER, wishlist })
      },
      (error) => {
        console.error(actionConst.GET_WISHLIST_BY_USER, error.toString())
      }
    )
  }
}

function addToWishlist(data: any) {
  return (dispatch: any) => {
    wishlistService.addToWishlist(data).then(
      (wish: any) => {
        dispatch({ type: actionConst.ADD_TO_WISHLIST, wish: wish.data })
        dispatch(alertActions.success('Product added to wishlist'))
      },
      (error) => {
        console.error(actionConst.ADD_TO_WISHLIST, error.toString())
      }
    )
  }
}

function removeFromWishlist(id: number) {
  return (dispatch: any) => {
    wishlistService.removeFromWishlist(id).then(
      () => {
        dispatch({ type: actionConst.REMOVE_FROM_WISHLIST, id })
        dispatch(alertActions.success('Product removed from wishlist'))
      },
      (error) => {
        console.error(actionConst.REMOVE_FROM_WISHLIST, error.toString())
      }
    )
  }
}
