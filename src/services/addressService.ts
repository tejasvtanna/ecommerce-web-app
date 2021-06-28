import api from './api'
import { urlConst } from '../utilities/constants'

export const addressService = {
  getAddressByUser,
  addAddress,
  editAddress,
}

function getAddressByUser(userId: string) {
  return api.get(urlConst.ADDRESSES + `?userId=${userId}`)
}

function addAddress(address: any) {
  return api.post(urlConst.ADDRESSES, address)
}

function editAddress(address: any) {
  return api.put(urlConst.ADDRESSES + `\\${address.id}`, address)
}
