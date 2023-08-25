import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './registerlogin.css'
import { useHistory } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'
import Spinner from 'components/atoms/Loaders/ThreeDots'
import { Button } from 'components/atoms/Buttons'
import { addressActions, cartActions, orderActions, userActions, wishlistActions } from 'redux/actions'

const Register = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { signup, currentUser } = useAuth()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (currentUser) {
      dispatch(userActions.logIn(currentUser.uid))
      dispatch(wishlistActions.getWishlistByUser(currentUser.uid))
      dispatch(cartActions.getCartByUser(currentUser.uid))
      dispatch(addressActions.getAddressesByUser(currentUser.uid))
      dispatch(orderActions.getOrdersByUser(currentUser.uid))

      setLoading(false)
      history.push(`/`)
    }
  }, [currentUser, dispatch, history])

  const handleRegister = (e: any) => {
    e.preventDefault()

    setLoading(true)

    signup(email, password, `${firstName} ${lastName}`)
      .then((uid: string) => {
        // adding new entry in json-server db
        dispatch(
          userActions.addNewUser({
            id: uid,
            firstName,
            lastName,
            joinDate: Date(),
            email,
            defaultAddressId: 0,
          })
        )
      })
      .catch((err: any) => {
        setError(err.message)
        setLoading(false)
      })
  }

  return (
    <div className="outer">
      {loading && <Spinner />}

      {!loading && (
        <div className="inner">
          <form onSubmit={(e) => handleRegister(e)}>
            <h3>Register</h3>

            <div className="form-group">
              <label>First name</label>
              <input
                type="text"
                autoComplete="chrome-off"
                className="form-control"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Last name</label>
              <input
                autoComplete="off"
                type="text"
                className="form-control"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                autoComplete="chrome-off"
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                autoComplete="off"
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit">Register</Button>

            <p className="forgot-password text-right">
              <Link to="/Login">Already registered? Log In</Link>
            </p>
          </form>
          <br />
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
    </div>
  )
}

export default Register
