import { Route, Redirect } from 'react-router-dom'

import { useAuth } from 'contexts/AuthContext'

interface Prop {
  path: string
  component: any
  exact?: any
}

function PrivateRoute({ path, component: Component, exact, ...rest }: Prop) {
  const { currentUser } = useAuth()

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component exact {...props} /> : <Redirect to="/login" />
      }}></Route>
  )
}

export default PrivateRoute
