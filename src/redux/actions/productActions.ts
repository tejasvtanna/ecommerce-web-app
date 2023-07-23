import { productService } from 'services'
import { Category, actionConst } from 'utilities/constants'

export const productActions = {
  getTrendingProducts,
  getTopOfferProducts,
}

function getTrendingProducts(category: string) {
  return (dispatch: any) => {
    productService.getTrendingProducts(category).then(
      (response) => {
        switch (category) {
          case Category.MEN:
            dispatch({ type: actionConst.GET_TRENDING_PRODUCTS_MEN, products: response.data })
            break

          case Category.WOMEN:
            dispatch({ type: actionConst.GET_TRENDING_PRODUCTS_WOMEN, products: response.data })
            break

          case Category.KIDS:
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
