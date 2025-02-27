import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { UserDataContext } from "../context/userContext.jsx";

const UserSignup = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  //destructuring the user and setUser from the context
  const { setUser } = useContext(UserDataContext)

  const submitHandler = async(e) => {
    e.preventDefault()
    // data to be sent to the server 
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password
    }

    console.log("user: ", newUser)
    const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000";
    const response = await axios.post(`${BASE_URL}/api/users/register`, newUser);
    console.log(response)

    if(response.status === 201) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token' , data.token)
      navigate('/home')
    }
    
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
  }

  return (
    <div className="select-none cursor-pointer p-7 flex flex-col justify-between h-screen w-full bg-[#f7f7f7]">
      <div>
        <img
          className="w-16 mb-10"
          src="https://www.logoshape.com/wp-content/uploads/2024/09/uber-logo-svg_logoshape.png"
          alt="Uber logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">Enter Full Name</h3>
          <div className="flex gap-3 mb-5">
            <input
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-[#eeeeee] w-1/2 rounded-full px-4 py-2
                text-base placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              type="text"
              placeholder="firsttname"
            />
            <input
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-[#eeeeee] w-1/2 rounded-full px-4 py-2
                text-base placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              type="text"
              placeholder="lastname"
            />
          </div>

          <h3 className="text-lg font-medium mb-2">What&apos;s your Email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] rounded-full px-4 py-2 w-full mb-5
                text-base placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>

          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] rounded-full px-4 py-2 w-full mb-5
                text-base placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            type="password"
            placeholder="password"
          />

          <button
            className="bg-black text-white font-semibold rounded-full px-4 py-2 w-full mb-3
        text-lg placeholder:text-base"
          >
            Create User Account
          </button>
        </form>
        <p className="text-center text-sm">
          Already have a Account?{" "}
          <Link to="/login" className="text-blue-600">
            Login Here
          </Link>
        </p>
      </div>

      <div>
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the <span className="underline">Google Privacy Policy</span> and <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
