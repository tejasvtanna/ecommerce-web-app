import React, { useEffect } from 'react'
import OrderDetail from 'components/molecules/Orders/OrderDetail/OrderDetail'
import { useSelector, useDispatch } from 'react-redux'
import { orderActions } from 'redux/actions'
import { useAuth } from 'contexts/AuthContext'
import FadingLoader from 'components/atoms/Loaders/FadingLoader'
import { Link } from 'react-router-dom'

const Orders = () => {
  const dispatch = useDispatch()
  const { currentUser } = useAuth()
  const loading = useSelector((state: any) => state.orders.loading)
  const orders = useSelector((state: any) => state.orders.list)

  useEffect(() => {
    const fetchOrders = async () => {
      dispatch(orderActions.getOrdersByUser(currentUser.uid))
    }

    void fetchOrders()
  }, [dispatch, currentUser.uid])

  return (
    <>
      {loading && <FadingLoader />}

      {!loading && !orders.length && (
        <h4>
          No orders. <Link to="/search">Continue Shopping.</Link>
        </h4>
      )}

      {!loading && orders.length > 0 && <OrderDetail orders={orders} />}
    </>
  )
}

export default Orders
