import { BrowserRouter, Routes, Route, useLocation  } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SignUp from './pages/Signup'
import Profile from "./pages/Profile"
import Header from "./component/Header"
import AdminHeader from "./component/AdminHeader" 
import AdminHome from './pages/AdminHome'
import AdminEditUser from './pages/AdminEditUser' 
import AdminAbout from "./pages/AdminAbout"



const HeaderContainer = () => {
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) {
    return <AdminHeader />;
  } else {
    return <Header />;
  }
};
const App = () => {

 
  return (
   
    <BrowserRouter>
   <HeaderContainer />
 
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
