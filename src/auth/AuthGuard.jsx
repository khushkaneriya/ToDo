import { Navigate } from 'react-router-dom'

function AuthGuard({ children }) {
  const registeredUser = localStorage.getItem('todo-user')
  const loggedInUser = localStorage.getItem('Login-user')

  if (!registeredUser) {
    return <Navigate to="/register" replace />
  }

  if (!loggedInUser) {
    return <Navigate to="/login" replace />
  }

  return children
}
  
export default AuthGuard
