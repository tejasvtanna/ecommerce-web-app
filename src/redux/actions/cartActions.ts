import { cartService } from '../../services'
import { actionConst } from '../../utilities/constants'
import { alertActions } from '.'

export const cartActions = {
  getCartByUser,
  addToCart,
  removeFromCart,
  updateQty,
  removeMultipleFromCart,
}

function getCartByUser(userId: any) {
  return (dispatch: any) => {
    dispatch({ type: actionConst.CART_REQUEST })

    cartService.getCartByUser(userId).then(
      (carts) => {
        dispatch({ type: actionConst.GET_CART_BY_USER, carts })
      },
      (error) => {
        console.error(actionConst.GET_CART_BY_USER, error.toString())
      }
    )
  }
}

function addToCart(data: any) {
  return (dispatch: any) => {
    cartService.addToCart(data).then(
      (cart) => {
        dispatch({ type: actionConst.ADD_TO_CART, cart })
        dispatch(alertActions.success('Produce added to cart'))
      },
      (error) => {
        console.error(actionConst.ADD_TO_CART, error.toString())
      }
    )
  }
}

function removeFromCart(id: any) {
  return (dispatch: any) => {
    cartService.removeFromCart(id).then(
      () => {
        dispatch({ type: actionConst.REMOVE_FROM_CART, id })
        dispatch(alertActions.success('Produce removed from cart'))
      },
      (error) => {
        console.error(actionConst.REMOVE_FROM_CART, error.toString())
      }
    )
  }
}

function removeMultipleFromCart(cartItems: any[]) {
  return (dispatch: any) => {
    cartItems.forEach((item: any) => {
      cartService.removeFromCart(item.id).then(
        () => {
          dispatch({ type: actionConst.REMOVE_FROM_CART, id: item.id })
        },
        (error) => {
          console.error(actionConst.REMOVE_FROM_CART, error.toString())
        }
      )
    })
  }
}

function updateQty(data: any) {
  return (dispatch: any) => {
    cartService.updateQty(data).then(
      (response) => {
        dispatch({ type: actionConst.UPDATE_CART_QTY, cartItem: response.data })
      },
      (error) => {
        console.error(actionConst.UPDATE_CART_QTY, error.toString())
      }
    )
  }
}
