import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Cart from 'pages/Cart/Cart'
import ForgetPassword from 'pages/forgetpassword/ForgetPassword'
// import Home from 'pages/home/Home'
// import CardsDemo from 'pages/ProductDetail/CardsDemo'
import Login from 'pages/login/Login'
import LandingPage from 'pages/LandingPage/LandingPage'
import Profile from 'pages/profile/Profile'
import Register from 'pages/register/Register'
import ProductDetail from 'pages/ProductDetail/ProductDetail'
import ProductSearch from 'pages/ProductSearch/ProductSearch'
import NotFound404 from 'pages/NotFound404/NotFound404'
import PrivateRoute from 'components/atoms/PrivateRoute/PrivateRoute'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage}></Route>

        {/* <Route path="/productsearch" component={Home}></Route>
        <Route path="/cart" component={Cart}></Route>
        <Route path="/productsearch/:search" component={Home}></Route>
        <Route path="/productsearch/:search" component={Home}></Route>
        <Route path="/" exact component={CardsDemo}></Route> */}

        <Route path="/search" component={ProductSearch}></Route>
        <Route path="/product/:productId" component={ProductDetail}></Route>
        <PrivateRoute path="/cart" component={Cart} />

        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/forgetPassword" component={ForgetPassword}></Route>
        <Route path="/profile" component={Profile}></Route>

        <Route path="*" component={NotFound404}></Route>
      </Switch>
    </Router>
  )
}

export default Routes
