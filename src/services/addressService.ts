import api from './api'
import { urlConst } from '../utilities/constants'

export const addressService = {
  getAddressByUser,
  addAddress,
}

function getAddressByUser(userId: string) {
  return api.get(urlConst.ADDRESSES + `?userId=${userId}`)
}

function addAddress(address: any) {
  return api.post(urlConst.ADDRESSES, address)
}
