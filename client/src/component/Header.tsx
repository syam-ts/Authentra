import {Link} from 'react-router-dom'

function Header() {
  return (
    <div className="bg-slate-200">
        <div className="flex justify-between itmes-center max-w-6xl mx-auto p-3">
        <span className="font-bold">Authentra</span>
       <ul className="flex gap-4">
        <Link to="/"> <li>Home</li></Link>
        <Link to="/about"> <li>About</li></Link>
        <Link to="/sign-in"> <li>Sign In</li></Link> 
        <Link to="/sign-up"> <li>Sign Up</li></Link> 
       </ul>
        </div> 
    </div>
  )
}

export default Header