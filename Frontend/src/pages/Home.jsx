import { useState, useRef, useContext, useEffect } from "react";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import WaitingForDriver from "../components/WaitingForDriver";
import LookingForDriver from "../components/LookingForDriver";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanelOpen, setconfirmRidePanelOpen] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState('defaultActiveField');
  const [ fare, setFare ] = useState({ car: '', moto: '', auto: '' })
  const [vehicleType, setVehicleType] = useState('defaultVehicleType')
  const [ride, setRide] = useState(null)

  const navigate = useNavigate()

  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)

  useEffect(() => {
    console.log(user)
      socket.emit('join', { userId: user._id, userType: "user" });
  }, [user]);

  // ride contains ride details
  socket.on('ride-confirmed', ride => {
    setVehicleFound(false)
    setWaitingForDriver(true)
    setRide(ride)
  })

  socket.on('ride-started', ride => {
    setWaitingForDriver(false)
    console.log("Ride Started: ", ride)
    navigate('/riding', { state: { ride } })
  })


  const handlePickupChange = async (e) => {
    const value = e.target.value;
    setPickup(value);

    if (!value.trim()) {
        setPickupSuggestions([]);
        return;
    }

    try {
        const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000";
        const response = await axios.get(`${BASE_URL}/api/maps/get-suggestions`, {
            params: { query: value },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(response.data);
        setPickupSuggestions(response.data);
    } catch (error) {
        console.error("Error fetching pickup suggestions:", error.response ? error.response.data : error.message);
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000";
      const response = await axios.get(`${BASE_URL}/api/maps/get-suggestions`, {
        params: { query: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response.data);
      setDestinationSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching destination suggestions:", error.response ? error.response.data : error.message);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  async function findTrip() {
    try {
      setVehiclePanelOpen(true);
      setPanelOpen(false);

      const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000";
      const response = await axios.get(`${BASE_URL}/api/rides/get-fare`, {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response.data);
      setFare(response.data)
    } catch (error) {
      console.error("Error fetching fare:", error.response ? error.response.data : error.message);
    }
  }

  async function createRide() {
    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000";
      const response = await axios.post(`${BASE_URL}/api/rides/create`, {
        pickup,
        destination,
        vehicleType
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error creating ride:", error.response ? error.response.data : error.message);
    }
  }

  useGSAP(
    function () {
      if (panelOpen === true) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 20,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanelOpen === true) {
        gsap.to(vehiclePanelRef.current, {
          translateY: "0%",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          translateY: "100%",
        });
      }
    },
    [vehiclePanelOpen]
  );

  useGSAP(
    function () {
      if (confirmRidePanelOpen === true) {
        gsap.to(confirmRidePanelRef.current, {
          translateY: "0%",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          translateY: "100%",
        });
      }
    },
    [confirmRidePanelOpen]
  );

  useGSAP(
    function () {
      if (vehicleFound === true) {
        gsap.to(vehicleFoundRef.current, {
          translateY: "0%",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          translateY: "100%",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingForDriver === true) {
        gsap.to(waitingForDriverRef.current, {
          translateY: "0%",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          translateY: "100%",
        });
      }
    },
    [waitingForDriver]
  );

  return (
    <div className="select-none cursor-pointer h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://www.logoshape.com/wp-content/uploads/2024/09/uber-logo-svg_logoshape.png"
        alt="Uber logo"
      />

      <div
        onClick={() => {
          setVehiclePanelOpen(false);
        }}
        className="w-screen h-screen"
      >
        {/* Map image for temporary use */}
        <LiveTracking />
      </div>

      {/* Home Search Panel */}
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full rounded-t-3xl ">
        <div className="h-[30%] p-5 bg-white relative">
          {/* Close panel */}
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute opacity-0 top-6 right-6 text-2xl px-2"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-3xl font-semibold mb-3">Find a Trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[40%] left-10 bg-gray-900 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={handlePickupChange}
              className="bg-[#eee] px-12 py-2 text-base rounded-full w-full mb-2"
              type="text"
              placeholder="Add a pick-up location"
              id=""
            />
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
                }}
                value={destination}
                onChange={handleDestinationChange}
                className="bg-[#eee] px-12 py-2 text-base rounded-full w-full"
                type="text"
                placeholder="Add a drop-off location"
                id=""
              />
              </form>

              <button 
              onClick={findTrip}
              className="bg-black text-white px-4 py-2 rounded-lg mt-4 w-full">
              Find Trip
              </button>
            </div>

            {/* Location panel */}
        <div ref={panelRef} className="bg-white h-0 ">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPanelOpen={setPanelOpen}
            setconfirmRidePanelOpen={setconfirmRidePanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>

      {/* Vehicle Info panel with close vehicle panel functionality */}
      <div
        ref={vehiclePanelRef}
        className="bg-white fixed w-full z-10 bottom-0 translate-y-full px-3 py-10"
      >
        <VehiclePanel
          fare={fare}
          selectVehicle={setVehicleType}
          setconfirmRidePanelOpen={setconfirmRidePanelOpen}
          setVehiclePanelOpen={setVehiclePanelOpen}
        />
      </div>

      {/* Confirm Ride panel */}
      <div
        ref={confirmRidePanelRef}
        className="bg-white fixed w-full z-10 bottom-0 translate-y-full px-3 py-10 "
      >
        <ConfirmRide
          pickup={pickup}
          destination={destination}
          createRide={createRide}
          fare={fare}
          vehicleType={vehicleType}
          setVehicleFound={setVehicleFound}
          setconfirmRidePanelOpen={setconfirmRidePanelOpen}
        />
      </div>

      {/* Looking for Driver panel */}
      <div
        ref={vehicleFoundRef}
        className="bg-white fixed w-full z-10 bottom-0 translate-y-full px-3 py-10 "
      >
        <LookingForDriver 
        pickup={pickup}
        destination={destination}
        createRide={createRide}
        fare={fare}
        vehicleType={vehicleType}
        setVehicleFound={setVehicleFound} />
      </div>

      <div
        ref={waitingForDriverRef}
        className="bg-white fixed w-full z-10 bottom-0 px-3 py-10 "
      >
        <WaitingForDriver 
        ride={ride}
        setVehicleFound={setVehicleFound}
        setWaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
