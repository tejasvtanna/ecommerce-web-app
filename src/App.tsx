import Routes from './routes/Routes'
import { AuthProvider } from 'contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Routes></Routes>
    </AuthProvider>
  )
}

export default App
