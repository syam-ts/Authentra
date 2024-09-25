import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SignUp from './pages/Signup'
import Profile from "./pages/Profile"
import Header from "./component/Header"
import AdminHeader from "./component/AdminHeader"
import PrivateRoute from "./component/PrivateRoute"
import AdminHome from './pages/AdminHome'
import HeaderContainer from "./pages/HeaderCom"
import { AdminEdit } from './pages/AdminHome'

const App = () => {
 
  return (
   
    <BrowserRouter>
  <HeaderContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />} >
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/adminHome" element={<AdminHome />} /> 
        <Route path="/admin/admin-edit" element={<AdminEdit />} /> 
        </Route>

      </Routes>
    </BrowserRouter>  
  )
}


export default App
