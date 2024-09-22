import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SignUp from './pages/Signup'
import Profile from "./pages/Profile"
import Header from "./component/Header"
import { Provider } from 'react-redux'
import { store } from './redux/store.js'


const App = () => {
  return (
    <Provider store={store}> 
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter> 
    </Provider>
  )
}


export default App
