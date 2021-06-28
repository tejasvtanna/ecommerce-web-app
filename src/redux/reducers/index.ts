import { combineReducers } from 'redux'

import { user } from './userReducer'
import products from './productReducer'
import orders from './orderReducer'
import wishlist from './wishlistReducer'
import cart from './cartReducer'
import addresses from './addressReducer'
import alert from './alertReducer'

const rootReducer = combineReducers({
  user,
  products,
  orders,
  wishlist,
  cart,
  addresses,
  alert,
})

export default rootReducer
