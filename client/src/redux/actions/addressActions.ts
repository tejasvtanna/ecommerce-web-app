import { addressService } from 'services'
import { actionConst } from 'utilities/constants'
import { alertActions } from './alertActions'

export const addressActions = {
  getAddressesByUser,
  addAddress,
  editAddress,
}

function getAddressesByUser(addressId: string) {
  return (dispatch: any) => {
    dispatch({ type: actionConst.ADDRESS_REQUEST })

    addressService.getAddressByUser(addressId).then(
      (addresses) => {
        // console.log(`reviews`, reviews)
        dispatch({ type: actionConst.GET_ADDRESSES_BY_USER, addresses })
      },
      (error) => {
        console.error(actionConst.GET_ADDRESSES_BY_USER, error.toString())
      }
    )
  }
}

function addAddress(address: any) {
  return (dispatch: any) => {
    addressService.addAddress(address).then(
      (res) => {
        dispatch({ type: actionConst.ADD_ADDRESS, address: res.data })
        dispatch(alertActions.success('Address added successfully'))
      },
      (error) => {
        console.error(actionConst.ADD_ADDRESS, error.toString())
      }
    )
  }
}

function editAddress(address: any) {
  return (dispatch: any) => {
    addressService.editAddress(address).then(
      (res) => {
        dispatch({ type: actionConst.EDIT_ADDRESS, address: res.data })
        dispatch(alertActions.success('Address edited successfully'))
      },
      (error) => {
        console.error(actionConst.EDIT_ADDRESS, error.toString())
      }
    )
  }
}
