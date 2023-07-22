import React, { useState } from 'react'
import '../register/registerlogin.css'
import { Link } from 'react-router-dom'
import { useHistory, useLocation } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'
import ThreeDots from 'components/atoms/Loaders/ThreeDots'
import { Button } from 'components/atoms/Buttons'
import { userActions } from 'redux/actions/userActions'
import { useDispatch } from 'react-redux'
import { MdEmail } from 'react-icons/md'
import { FaFacebook } from 'react-icons/fa'
// import { Modal } from 'react-bootstrap'

interface Props {}

const Login = (props: Props) => {
  const { signin, facebookLogin } = useAuth()
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(false)

  const changeEventHandler = (inputName: String, e: any) => {
    switch (inputName) {
      case email: {
        setEmail(e.target.value)
        break
      }
      case password: {
        setPassword(e.target.value)
        break
      }
      default:
        return
    }
  }

  const handleLogin = (e: any) => {
    e.preventDefault()

    setError('')
    setLoading(true)

    signin(email, password)
      .then((uid: string) => {
        setLoading(false)
        if (location.search) {
          const qs = require('qs')
          const qsArr = qs.parse(location.search, { ignoreQueryPrefix: true })
          if (qsArr['returnUrl']) history.push(qsArr['returnUrl'])
          else history.push(`/`)
        } else {
          history.push(`/`)
        }
      })
      .catch((error: any) => {
        // console.log(`error`, error)
        setError('Invalid email or password')
        setLoading(false)
      })
  }

  const handleFBLogin = (e: any) => {
    e.preventDefault()

    setError('')
    setLoading(true)

    facebookLogin()
      .then((info: any) => {
        if (info.isNewUser) {
          dispatch(
            userActions.addNewUser({
              id: info.user.uid,
              firstName: info.user.displayName,
              lastName: '',
              joinDate: Date(),
              email: info.user.email,
              defaultAddressId: 0,
            })
          )
          history.push(`/`)
          return
        }

        setLoading(false)
        if (location.search) {
          const qs = require('qs')
          const qsArr = qs.parse(location.search, { ignoreQueryPrefix: true })
          if (qsArr['returnUrl']) history.push(qsArr['returnUrl'])
          else history.push(`/`)
        } else {
          history.push(`/`)
        }
      })
      .catch((error: any) => {
        setError('Invalid email or password')
        setLoading(false)
      })
  }

  return (
    <div className="outer">
      {loading && <ThreeDots />}
      {!loading && (
        <div className="inner">
          <form onSubmit={(e) => handleLogin(e)}>
            <h3>Log in</h3>

            <div className="form-group">
              <label>Email</label>
              <input
                onChange={(e) => changeEventHandler(email, e)}
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                onChange={(e) => changeEventHandler(password, e)}
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
              />
            </div>

            {/* <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="customCheck1" />
                  <label className="custom-control-label" htmlFor="customCheck1">
                    Remember me
                  </label>
                </div>
              </div> */}

            <Button type="submit">
              <MdEmail style={{ float: 'left' }} />
              Login
            </Button>
            <Button variant="primary" customStyle={{ marginTop: '1rem' }} onClick={handleFBLogin}>
              <FaFacebook style={{ float: 'left' }} />
              Login with Facebook
            </Button>

            <p className="forgot-password text-right">
              <Link to="/forgetPassword">Forgot password?</Link>
            </p>
            <p className="forgot-password text-right">
              <Link to="/register">Create New Account?</Link>
            </p>
          </form>

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
    </div>
  )
}

export default Login
