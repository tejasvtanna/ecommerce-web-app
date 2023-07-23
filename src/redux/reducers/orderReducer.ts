import { actionConst } from 'utilities/constants'

const initialState = {
  loading: true,
  list: [],
}

export default function orders(state = initialState, action: any) {
  switch (action.type) {
    case actionConst.ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case actionConst.GET_ORDERS_BY_USER:
      return {
        ...state,
        list: [...action.orders.data],
        loading: false,
      }

    case actionConst.PLACE_ORDER:
      return {
        ...state,
        list: [action.order, ...state.list],
      }

    case actionConst.RESET:
      return initialState

    default:
      return state
  }
}
