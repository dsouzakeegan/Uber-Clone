import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext.jsx";

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const navigate = useNavigate();

  const { setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000";
    const response = await axios.post(
      `${BASE_URL}/api/captains/register`,
      captainData
    );

    if (response.status === 201) {
      //server sends back the captain data and token
      const data = response.data;
      setCaptain(data.captain);

      localStorage.setItem("token", data.token);
      console.log("ap Token: ", data.token);
      navigate("/captain-home");
    }

    //console.log(userData);
    // setFirstName("");
    // setLastName("");
    // setEmail("");
    // setPassword("");
  };

  return (
    <div
      className="p-7 flex flex-col justify-between h-screen w-full bg-[#f7f7f7]
      select-none cursor-pointer"
    >
      <div>
        <img
          className="w-16 mb-10"
          src="https://pngimg.com/d/uber_PNG24.png"
          alt="Uber Driver logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">Captain&apos;s Name</h3>
          <div className="flex gap-3 mb-5">
            <input
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-[#eeeeee] w-1/2 rounded-full px-4 py-2
                text-base placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              type="text"
              placeholder="firstname"
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

          <h3 className="text-lg font-medium mb-2">Captain&apos;s Email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] rounded-full px-4 py-2 w-full mb-5
                text-base placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Captain&apos;s Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] rounded-full px-4 py-2 w-full mb-5
                text-base placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            type="password"
            placeholder="password"
          />

          <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
          <div className="flex gap-1">
            <input
              required
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              className="bg-[#eeeeee] rounded-full px-4 py-2 w-1/2 mb-5
                text-base placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              type="text"
              placeholder="color"
            />

            <input
              required
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              className="bg-[#eeeeee] rounded-full px-4 py-2 mb-5 w-1/2
                text-base placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              type="text"
              placeholder="plate"
            />

            <input
              required
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              className="bg-[#eeeeee] rounded-full px-4 py-2 w-1/2 mb-5
                text-base placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              type="number"
              placeholder="capacity"
            />

            <select
              required
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="bg-[#eeeeee] rounded-full px-4 py-2 w-1/2 mb-5
                text-base placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            >
              <option value="" disabled className="text-gray-500">
                vehicle type
              </option>
              <option value="car" className="text-gray-700 font-medium">
                car
              </option>
              <option value="auto" className="text-gray-700 font-medium">
                motorcycle
              </option>
              <option value="motor" className="text-gray-700 font-medium">
                auto
              </option>
            </select>
          </div>

          <button
            className="bg-black text-white font-semibold rounded-full px-4 py-2 w-full mb-3
        text-lg placeholder:text-base"
          >
            Create Captain Account
          </button>
        </form>
        <p className="text-center text-sm">
          Already have a Account?{" "}
          <Link to="/captain-login" className="text-blue-600">
            Login Here
          </Link>
        </p>
      </div>

      <div>
        <p className="text-[10px] mt-6 leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
