import { actionConst } from 'utilities/constants'

const initialState = {
  loading: false,
  items: [],
}

export default function cart(state = initialState, action: any) {
  switch (action.type) {
    case actionConst.CART_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case actionConst.GET_CART_BY_USER:
      return {
        ...state,
        loading: false,
        items: [...action.carts.data],
      }

    case actionConst.ADD_TO_CART:
      return {
        ...state,
        loading: false,
        items: [...state.items, action.cart.data],
      }

    case actionConst.REMOVE_FROM_CART:
      return {
        ...state,
        loading: false,
        items: state.items.filter((cart: any) => cart.id !== action.id),
      }

    case actionConst.UPDATE_CART_QTY:
      return {
        ...state,
        loading: false,
        items: state.items.map((cart: any) => {
          if (cart.id === action.cartItem.id) return { ...cart, qty: action.cartItem.qty }
          else return cart
        }),
      }

    case actionConst.RESET:
      return initialState

    default:
      return state
  }
}
