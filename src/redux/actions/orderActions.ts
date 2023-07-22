import { orderService } from 'services'
import { actionConst } from 'utilities/constants'
import { alertActions } from './alertActions'
import { cartActions } from './cartActions'

export const orderActions = {
  getOrdersByUser,
  placeOrder,
}

function getOrdersByUser(userId: number) {
  return (dispatch: any) => {
    dispatch({ type: actionConst.ORDER_REQUEST })

    orderService.getOrdersByUser(userId).then(
      (orders) => {
        dispatch({ type: actionConst.GET_ORDERS_BY_USER, orders })
      },
      (error) => {
        console.error(actionConst.GET_ORDERS_BY_USER, error.toString())
      }
    )
  }
}

function placeOrder(order: any, cartItems: any[]) {
  return (dispatch: any) => {
    orderService.addOrder(order).then(
      (res) => {
        dispatch({ type: actionConst.PLACE_ORDER, order: res.data })
        dispatch(cartActions.removeMultipleFromCart(cartItems)) // empty cart after placing order
        dispatch(alertActions.success('Order placed successfully'))
      },
      (error) => {
        console.error(actionConst.PLACE_ORDER, error.toString())
      }
    )
  }
}
