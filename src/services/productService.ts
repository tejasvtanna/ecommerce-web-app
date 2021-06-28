import api from './api'
import { urlConst } from '../utilities/constants'

export const productService = {
  getAllProducts,
  getTrendingProducts,
  getTopOfferProducts,
}

function getAllProducts() {
  return api.get(urlConst.PRODUCTS)
}

function getTrendingProducts(category: string) {
  return api.get(urlConst.PRODUCTS + `?trending=true&category=${category}&_limit=6`)
}

function getTopOfferProducts() {
  return api.get(urlConst.PRODUCTS + `?_sort=discount&_order=desc&_limit=6`)
}
