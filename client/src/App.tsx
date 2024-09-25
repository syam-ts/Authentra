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
import AdminEditUser from './pages/AdminEditUser'

import HeaderContainer from "./pages/HeaderCom"
import { AdminEdit } from './pages/AdminHome'
import AdminAbout from "./pages/AdminAbout"

const App = () => {
 
  return (
   
    <BrowserRouter>
  <HeaderContainer />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/about" element={<About />} /> 
        <Route path="/admin" element={<AdminHome />} /> 
        <Route path="/admin/about" element={<AdminAbout />} /> 
      <Route path="/admin/edit-user/:userId" element={<AdminEditUser />} /> 

      </Routes>
    </BrowserRouter>  
  )
}


export default App
