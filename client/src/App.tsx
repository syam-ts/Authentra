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


import { AdminEdit } from './pages/AdminHome'
import AdminAbout from "./pages/AdminAbout"

const App = () => {
 
  return (
   
    <BrowserRouter>
  <Header />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/about" element={<About />} /> 


        <Route path="/admin" element={<AdminHome />} /> 
        <Route path="/admin/about" element={<AdminAbout />} /> 
      <Route path="/admin/edit-user/:userId" element={<AdminEditUser />} /> 

      </Routes>
    </BrowserRouter>  
  )
}


export default App
