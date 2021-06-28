import { actionConst } from '../../utilities/constants'

const initialState = {
  laoding: true,
  all: [],

  trendingMen: [],
  trendingWomen: [],
  trendingKids: [],
  topOffers: [],
}

export default function products(state = initialState, action: any) {
  switch (action.type) {
    case actionConst.PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case actionConst.GET_ALL_PRODUCTS:
      return {
        ...state,
        all: [...action.products.data],
        loading: false,
      }

    case actionConst.GET_TRENDING_PRODUCTS_MEN:
      return {
        ...state,
        trendingMen: [...action.products],
      }

    case actionConst.GET_TRENDING_PRODUCTS_WOMEN:
      return {
        ...state,
        trendingWomen: [...action.products],
      }

    case actionConst.GET_TRENDING_PRODUCTS_KIDS:
      return {
        ...state,
        trendingKids: [...action.products],
      }

    case actionConst.GET_TOP_OFFERS_PRODUCTS:
      return {
        ...state,
        topOffers: [...action.products],
      }

    default:
      return state
  }
}
