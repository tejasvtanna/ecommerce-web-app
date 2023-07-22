import api from './api'
import { urlConst } from 'utilities/constants'

export const cartService = {
  getCartById,
  getCartByUser,
  addToCart,
  removeFromCart,
  updateQty,
}

function getCartById(userId: any) {
  return api.get(urlConst.CARTS + `/${userId}?_expand=product`)
}

function getCartByUser(userId: any) {
  return api.get(urlConst.CARTS + `?userId=${userId}&_expand=product`)
}

function addToCart(data: any) {
  return api.post(urlConst.CARTS, data).then((res) => getCartById(res.data.id))
}

function removeFromCart(id: number) {
  return api.delete(urlConst.CARTS + `\\${id}`)
}

function updateQty(data: any) {
  return api.put(urlConst.CARTS + `\\${data.id}`, data)
}
