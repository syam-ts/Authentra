import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
//   const { user } = useSelector(( state: any ) => state.user) 

  return (
    <div className="bg-slate-200">
      <div className="flex justify-between itmes-center max-w-6xl mx-auto p-3">
        <span className="font-bold">Authentra</span>
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
          <Link to="/admin/login">
        
           
            <li>SignIn</li> 
            Admin

          </Link>
        </ul>
      </div>
    </div>
  )
}

export default Header