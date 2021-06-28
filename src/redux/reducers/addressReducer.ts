import { actionConst } from '../../utilities/constants'

const initialState = {
  laoding: true,
  list: [],
}

export default function addresses(state = initialState, action: any) {
  switch (action.type) {
    case actionConst.ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case actionConst.GET_ADDRESSES_BY_USER:
      return {
        ...state,
        loading: false,
        list: [...action.addresses.data],
      }

    case actionConst.ADD_ADDRESS:
      return {
        ...state,
        loading: false,
        list: [...state.list, action.address],
      }

    default:
      return state
  }
}
