import { Route, Routes } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from "./components/navbar"
import ProtectedLogin from "./components/protectedLogin"
import { ProtectedRoute } from "./components/ProtectedRoute"
import TrailerPlayer from "./components/trailerUrl"
import { AuthContextProvider } from "./context/AuthContext"
import { TrailerProvider } from "./context/TrailerContext"
import { Account } from "./pages/Account"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"

function App() {
 

  return (
    <>
      <AuthContextProvider>
        <TrailerProvider>
          
          <Navbar />
          <ToastContainer theme="dark" />
          <TrailerPlayer/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<ProtectedLogin><Login/></ProtectedLogin>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          </Routes>
        </TrailerProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;