import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route  } from "react-router-dom"

import { Provider } from 'react-redux'
import { store , persistor} from './redux/store.js' 
import { PersistGate } from 'redux-persist/integration/react'
import AdminLogin from './pages/AdminLogin.js'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}> 
  <PersistGate persistor={ persistor } loading={null}> 
  <BrowserRouter>
  <Routes>
  <Route path="/admin/login" element={<AdminLogin />} /> 
  </Routes>
      
  </BrowserRouter>
    <App /> 
  </PersistGate> 
  </Provider>
)
