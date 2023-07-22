import { productService } from 'services'
import { actionConst } from 'utilities/constants'

export const productActions = {
  getTrendingProducts,
  getTopOfferProducts,
}

function getTrendingProducts(category: string) {
  return (dispatch: any) => {
    // dispatch({ type: actionConst.PRODUCT_REQUEST })

    productService.getTrendingProducts(category).then(
      (response) => {
        switch (category.toUpperCase()) {
          case 'MEN':
            dispatch({ type: actionConst.GET_TRENDING_PRODUCTS_MEN, products: response.data })
            break

          case 'WOMEN':
            dispatch({ type: actionConst.GET_TRENDING_PRODUCTS_WOMEN, products: response.data })
            break

          case 'KIDS':
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
    // dispatch({ type: actionConst.PRODUCT_REQUEST })

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
