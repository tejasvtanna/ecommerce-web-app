import { actionConst } from '../../utilities/constants'

const initialState = {
  laoding: true,
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

    default:
      return state
  }
}
