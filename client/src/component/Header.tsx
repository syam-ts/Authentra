import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const { user } = useSelector(( state: any ) => state.user) 

  return (
    <div className="bg-slate-200">
      <div className="flex justify-between itmes-center max-w-6xl mx-auto p-3">
        <span className="font-bold">Authentra</span>
        <ul className="flex gap-4">
          <Link to="/">
           <li>
            Home
            </li>
           </Link>
          <Link to="/about">
           <li>
            About
            </li>
            </Link>
    
        
           {user.currentUser ? (
                  <Link to="/profile">
            <img src={user.currentUser.profilePicture} alt='profile'
            className="h-7 w-7 rounded-full object-cover"
            />
             </Link>
           ) : (
            <Link to='/signin' >
              <li>Sign In</li>
            </Link>
           )}

         
        </ul>
      </div>
    </div>
  )
}

export default Header