import { actionConst } from 'utilities/constants'

const initialState = {
  loading: false,
  list: [],
}

export default function wishlist(state = initialState, action: any) {
  switch (action.type) {
    case actionConst.WISHLIST_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case actionConst.GET_WISHLIST_BY_USER:
      return {
        ...state,
        list: [...action.wishlist.data],
        loading: false,
      }

    case actionConst.ADD_TO_WISHLIST:
      return {
        ...state,
        list: [...state.list, action.wish],
      }

    case actionConst.REMOVE_FROM_WISHLIST:
      return {
        ...state,
        list: state.list.filter((wish: any) => wish.id !== action.id),
      }

    case actionConst.RESET:
      return initialState

    default:
      return state
  }
}
