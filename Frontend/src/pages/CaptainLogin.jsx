import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext.jsx";

const CaptainLogin = () => {
  const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //const [captainData, setCaptainData] = useState({})

    const navigate = useNavigate()
    const { setCaptain } = useContext(CaptainDataContext)

    const submitHandler = async(e) => {
        e.preventDefault()
        const captainLogin = {
            email: email,
            password: password
        }
        
        const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000";
        const response = await axios.post(`${BASE_URL}/api/captains/login`, captainLogin)

        if(response.status === 200) {
          // server sends back the captain data and token
          const data = response.data
          setCaptain(data.captain)
          localStorage.setItem('token', data.token)
          navigate('/captain-home')
        }

    }

  return (
    <div className="p-7 flex flex-col justify-between h-screen w-full bg-[#f7f7f7]
      select-none cursor-pointer">
      <div>
        <img
          className="w-16 mb-10"
          src="https://pngimg.com/d/uber_PNG24.png"
          alt="Uber Driver logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">Captain&apos;s Email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] rounded-full px-4 py-2 w-full mb-7
                text-base placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Captain&apos;s Password</h3>

          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] rounded-full px-4 py-2 w-full mb-7
                text-base placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            type="password"
            placeholder="password"
          />

          <button
            className="bg-black text-white font-semibold rounded-full px-4 py-2 w-full mb-3
        text-lg placeholder:text-base"
          >
            Login
          </button>

        </form>
        <p className="text-center text-sm">Join a fleet? <Link to='/captain-signup' className="text-blue-600">Register as a Captain</Link></p>

      </div>

      <div>
        <Link to='/login'
          className="bg-[#d5622d] flex items-center justify-center text-white font-semibold rounded-full px-4 py-2 w-full mb-7
        text-lg placeholder:text-base"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  )
}

export default CaptainLogin