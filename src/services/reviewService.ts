import api from './api'
import { urlConst } from '../utilities/constants'

export const reviewService = {
  getReviewsByProduct,
}

function getReviewsByProduct(productId: number) {
  return api.get(urlConst.REVIEWS + `?productId=${productId}`)
}
