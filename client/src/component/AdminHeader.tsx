import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateAdminStatus } from '../redux/user/userSlice'

function Header() {
  
const { error } = useSelector((state: any) => state.user.user)
const dispatch = useDispatch()
const navigate = useNavigate()


const signOutAdmin = () => {

  dispatch(updateAdminStatus(false))
  navigate('/admin/login')
}

 
    return (
      <div className="bg-slate-200">
        <div className="flex justify-between itmes-center max-w-6xl mx-auto p-3">
          <span className="font-bold">
            <Link to='/admin'>Authentra</Link>
          </span>
          <ul className="flex gap-4">
            <Link to="/admin">
             <li>
              Home
              </li>
             </Link>
            <Link to="/admin/about">
             <li>
              About
              </li>
              </Link>
             
              <li>
                <button
                 onClick={signOutAdmin}
                >
                SignOut
                </button>
                </li>  
          </ul>
        </div>
      </div>
    )
 
}

export default Header