import { userService } from 'services'
import { actionConst } from 'utilities/constants'
import { alertActions } from 'redux/actions'

export const userActions = {
  logIn,
  logOut,
  addNewUser,
  changeDefaultAddress,
  resetStore,
}

function logIn(uid: string) {
  return (dispatch: any) => {
    userService.getUserDetails(uid).then(
      (user) => {
        dispatch({ type: actionConst.LOG_IN, user: user.data })
      },
      (error) => {
        console.error(actionConst.LOG_IN, error.toString())
      }
    )
  }
}

function logOut() {
  return (dispatch: any) => {
    dispatch({ type: actionConst.LOG_OUT })
  }
}

function resetStore() {
  return (dispatch: any) => {
    dispatch({ type: actionConst.RESET })
  }
}

function addNewUser(user: any) {
  return (dispatch: any) => {
    userService.addNewUser(user).then(
      (user) => {
        dispatch({ type: actionConst.ADD_NEW_USER, user })
      },
      (error) => {
        console.error(actionConst.ADD_NEW_USER, error.toString())
      }
    )
  }
}

function changeDefaultAddress(updatedUser: any) {
  return (dispatch: any) => {
    userService.updateUser(updatedUser).then(
      (res) => {
        dispatch({ type: actionConst.CHANGE_DEFAULT_ADDRESS, user: res.data })
        dispatch(alertActions.success('Default address changed'))
      },
      (error) => {
        console.error(actionConst.CHANGE_DEFAULT_ADDRESS, error.toString())
      }
    )
  }
}
