import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

function PrivateRoute() {

    const { user } = useSelector((state: any) => state.user)
  return user.currentUser ? <Outlet /> : <Navigate to='/sign-in' />

}

export default PrivateRoute