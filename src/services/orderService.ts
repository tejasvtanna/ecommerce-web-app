import api from './api'
import { urlConst } from '../utilities/constants'

export const orderService = {
  getOrdersByUser,
  addOrder,
}

function getOrdersByUser(userId: number) {
  return api.get(urlConst.ORDERS + `?userId=${userId}&_sort=id&_order=desc`)
}

function addOrder(order: any) {
  return api.post(urlConst.ORDERS, order)
}
