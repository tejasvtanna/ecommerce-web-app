import React, { useState } from 'react'
// import fire from '../../config/fire';
// import { useHistory } from 'react-router-dom'

interface Props {}

const ForgetPassword = (props: Props) => {
  const [Email, setEmail] = useState('')
  // const history = useHistory()

  const changeEventHandler = (inputName: String, e: any) => {
    switch (inputName) {
      case Email: {
        setEmail(e.target.value)
        break
      }

      default:
        return
    }
  }

  const formSubmitHandler = () => {
    // fire
    //   .auth()
    //   .sendPasswordResetEmail(Email)
    //   .then(function () {
    //     // Email sent.
    //     console.log('email has been sent to', Email)
    //   })
    //   .catch(function (error: any) {
    //     // An error happened.
    //   })
    // history.push('/login')
  }

  return (
    <div className="outer">
      <div className="inner">
        <form
          onSubmit={(e) => {
            console.log('formsubmitted')
            e.preventDefault()
            console.log(Email)
            formSubmitHandler()
          }}>
          <h3>Forget Password</h3>
          <div className="form-group">
            <label>Email</label>
            <input
              onChange={(e) => changeEventHandler(Email, e)}
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={Email}
            />
            <button type="submit" className="btn btn-dark btn-lg btn-block">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgetPassword
