import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Switch, Link } from 'react-router-dom'
import Typography from 'components/atoms/typography/Typography'
import ProductScreenTemplate from 'components/templates/ProductscreenTemplate/ProductScreenTemplate'
import { RouteComponentProps } from 'react-router'
import Orders from 'components/organisms/Orders/Orders'
import Wishlist from 'components/organisms/Wishlist/Wishlist'
import ManageAddress from 'components/organisms/ManageAddress/ManageAddress'
import styles from './profile.module.css'
import PrivateRoute from 'components/atoms/PrivateRoute/PrivateRoute'

const navItems = ['Addresses', 'Wishlist', 'Orders']

interface Props {}

const Profile: React.FC<Props & RouteComponentProps> = ({ match }) => {
  const { user } = useSelector((state: any) => state.user)
  const [selectedNav, setselectedNav] = useState('Addresses')

  return (
    <ProductScreenTemplate>
      <div className={styles.mainContainer}>
        <Typography customStyle={{ display: 'block' }} variant="boldlarge">
          {`${user.firstName} ${user.lastName}`}
        </Typography>
        <hr />
        <div className={styles.subContainer}>
          <div className={styles.navigation}>
            {navItems.map((nav: string, idx: number) => (
              <span key={idx}>
                <Link className={styles.link} to={`/profile/${nav}`} onClick={() => setselectedNav(nav)}>
                  &gt; {nav}
                </Link>
              </span>
            ))}
          </div>
          <div className={styles.content}>
            <Switch>
              {/* <PrivateRoute exact path={`${match.path}`} component={ProfileDescription} /> */}
              <PrivateRoute path={`${match.path}/addresses`} component={ManageAddress} />
              <PrivateRoute path={`${match.path}/orders`} component={Orders} />
              <PrivateRoute path={`${match.path}/wishlist`} component={Wishlist} />
            </Switch>
          </div>
        </div>
      </div>
    </ProductScreenTemplate>
  )
}
export default Profile
