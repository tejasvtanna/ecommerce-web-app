import { actionConst } from '../../utilities/constants'

const initialState = {
  type: '',
  message: '',
  linkText: '',
  linkHref: '',
}

export default function alert(state = initialState, action: any) {
  switch (action.type) {
    case actionConst.SUCCESS:
      return {
        type: 'success',
        message: action.message,
        linkText: action.linkText,
        linkHref: action.linkHref,
      }

    case actionConst.ERROR:
      return {
        type: 'danger',
        message: action.message,
      }

    case actionConst.CLEAR:
      return {}

    default:
      return state
  }
}
