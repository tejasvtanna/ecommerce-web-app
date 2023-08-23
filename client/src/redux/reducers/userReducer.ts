import { actionConst } from 'utilities/constants'

const initialState = {
  loading: true,
  user: {},
}

export const user = (state = initialState, action: any) => {
  switch (action.type) {
    case actionConst.LOG_IN: {
      console.log('************Login Called************************')
      // return { ...state, loggedIn: true, userFirebase: action.userFirebase }
      return { ...state, user: action.user, loggedIn: true }
    }

    // case actionConst.GET_USER_BY_ID: {
    //   return { ...state, user: action.user.data }
    // }

    case actionConst.CHANGE_DEFAULT_ADDRESS: {
      return { ...state, user: { ...state.user, defaultAddressId: action.user.defaultAddressId } }
    }

    case actionConst.LOG_OUT: {
      // return { ...state, loggedIn: false, userFirebase: null, user: null }
      return { ...state, loggedIn: false, user: null }
    }

    default:
      return state
  }
}
