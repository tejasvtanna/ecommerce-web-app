import { productService } from 'services'
import { CUSTOMER_CATEGORY, actionConst } from 'utilities/constants'

export const productActions = {
  getTrendingProducts,
  getTopOfferProducts,
}

function getTrendingProducts(category: string) {
  return (dispatch: any) => {
    productService.getTrendingProducts(category).then(
      (response) => {
        switch (category) {
          case CUSTOMER_CATEGORY.MEN:
            dispatch({ type: actionConst.GET_TRENDING_PRODUCTS_MEN, products: response.data })
            break

          case CUSTOMER_CATEGORY.WOMEN:
            dispatch({ type: actionConst.GET_TRENDING_PRODUCTS_WOMEN, products: response.data })
            break

          case CUSTOMER_CATEGORY.KIDS:
            dispatch({ type: actionConst.GET_TRENDING_PRODUCTS_KIDS, products: response.data })
            break

          default:
            break
        }
      },
      (error) => {
        console.error(category, error.toString())
      }
    )
  }
}

function getTopOfferProducts() {
  return (dispatch: any) => {
    productService.getTopOfferProducts().then(
      (res) => {
        dispatch({ type: actionConst.GET_TOP_OFFERS_PRODUCTS, products: res.data })
      },
      (error) => {
        console.error(actionConst.GET_TOP_OFFERS_PRODUCTS, error.toString())
      }
    )
  }
}
