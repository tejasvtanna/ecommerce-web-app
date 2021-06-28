import { actionConst } from '../../utilities/constants'

export const alertActions = {
  success,
  error,
  clear,
}

function success(message: string, linkText?: string, linkHref?: string) {
  return (dispatch: any) => {
    dispatch({ type: actionConst.SUCCESS, message, linkText, linkHref })
  }
}

function error(message: string) {
  return (dispatch: any) => {
    dispatch({ type: actionConst.ERROR, message })
  }
}

function clear() {
  return (dispatch: any) => {
    dispatch({ type: actionConst.CLEAR })
  }
  // return { type: actionConst.CLEAR }
}
