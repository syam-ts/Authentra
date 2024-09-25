import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const { user } = useSelector(( state: any ) => state.user) 

  return (
    <div className="bg-slate-200">
      <div className="flex justify-between itmes-center max-w-6xl mx-auto p-3">
        <span className="font-bold">Authentra</span>
        <ul className="flex gap-4">
          <Link to="/home">
           <li>
            Home
            </li>
           </Link>
          <Link to="/home/about">
           <li>
            About
            </li>
            </Link>
          <Link to="/profile">
        
           {user.currentUser ? (
            <img src={user.currentUser.profilePicture} alt='profile'
            className="h-7 w-7 rounded-full object-cover"
            />
           ) : (
            <li>SignIn</li>
           )}

          </Link>
        </ul>
      </div>
    </div>
  )
}

export default Header