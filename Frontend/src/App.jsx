import { Route, Routes } from "react-router-dom"
import Start from "./pages/Start"
import UserLogin from "./pages/UserLogin"
import UserSignup from "./pages/UserSignup"
import CaptainLogin from "./pages/CaptainLogin"
import CaptainSignup from "./pages/CaptainSignup"
import Home from "./pages/Home"
import UserLogout from "./pages/UserLogout"
import CaptainHome from "./pages/CaptainHome"
import CaptainLogout from "./pages/CaptainLogout"
import { useContext } from "react"
import { UserDataContext } from "./context/UserContext"
import { CaptainDataContext } from "./context/CaptainContext"
import UserProtectWrapper from "./pages/UserProtectWrapper"
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper"
import Riding from "./pages/Riding"
import CaptainRiding from "./pages/CaptainRiding"

const App = () => {

  const user = useContext(UserDataContext)
  const captain = useContext(CaptainDataContext)

  console.log(user)
  console.log(captain)

  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/riding" element={<Riding />} />
        <Route path="/captain-riding" element={<CaptainRiding />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/home" element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        } />
        <Route path="/user/logout" element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>} />
        <Route path="/captain-home" element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>
        } />
        <Route path="/captain/logout" element={
          <CaptainProtectWrapper>
            <CaptainLogout />
          </CaptainProtectWrapper>
        } />
      </Routes>
    </div>
  )
}

export default App