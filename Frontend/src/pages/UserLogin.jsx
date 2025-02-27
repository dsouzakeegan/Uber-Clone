import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/userContext.jsx";
import axios from 'axios'

const UserLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //const [userData, setUserData] = useState({})

    const navigate = useNavigate()

    const { setUser } = useContext(UserDataContext)

    const submitHandler = async(e) => {
        e.preventDefault()
        // setUserData({
        //     email: email,
        //     password: password
        // })
        const loginUser = {
            email: email,
            password: password
        }

        console.log("user: ", loginUser)
        const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000";
        const response = await axios.post(`${BASE_URL}/api/users/login`, loginUser);
        console.log("response: ", response)

        if(response.status === 200) {
            const data = response.data
            setUser(data.user)
            const token = localStorage.setItem('token' , data.token)
            navigate('/home')
            
            console.log(token) 
        }


        setEmail('')
        setPassword('')
    }

  return (
    <div className="p-7 flex flex-col justify-between h-screen w-full bg-[#f7f7f7]
      select-none cursor-pointer">
      <div>
        <img
          className="w-16 mb-10"
          src="https://www.logoshape.com/wp-content/uploads/2024/09/uber-logo-svg_logoshape.png"
          alt="Uber logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What&apos;s your Email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] rounded-full px-4 py-2 w-full mb-7
                text-base placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>

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
        <p className="text-center text-sm">New here? <Link to='/signup' className="text-blue-600">Create new Account</Link></p>

      </div>

      <div>
        <Link to='/captain-login'
          className="bg-[#10b461] flex items-center justify-center text-white font-semibold rounded-full px-4 py-2 w-full mb-7
        text-lg placeholder:text-base"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
