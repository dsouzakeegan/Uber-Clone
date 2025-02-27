import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainHome = () => {
  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

  const [ride, setRide] = useState(null);

  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    console.log(captain);
    if (captain && captain._id) {
      socket.emit("join", { userId: captain._id, userType: "captain" });
    }

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          // console.log({
          //     userId: captain._id,
          //     location: {
          //         ltd: position.coords.latitude,
          //         lng: position.coords.longitude
          //     }
          // })
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    console.log(locationInterval);
    updateLocation();

    // return () => clearInterval(locationInterval)
  });

  socket.on("new-ride", (data) => {
    console.log(data);
    setRide(data);
    setRidePopupPanel(true);
  });

  async function confirmRide() {
    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000";
      const response = await axios.post(
        `${BASE_URL}/api/rides/confirm`,
        {
          rideId: ride._id,
          captainId: captain._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("confirm ride API resp: ",response.data);

      setRidePopupPanel(false);
      setConfirmRidePopupPanel(true);
    } catch (error) {
      console.log(error);
      console.error(
        "Error creating ride:",
        error.response ? error.response.data : error.message
      );
    }
  }

  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopupPanel]
  );

  useGSAP(
    function () {
      if (confirmRidePopupPanel) {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopupPanel]
  );

  return (
    <div className="select-none cursor-pointer h-screen">
      <div className="fixed p-4 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16 left-5 top-5"
          src="https://www.logoshape.com/wp-content/uploads/2024/09/uber-logo-svg_logoshape.png"
          alt=""
        />
        <Link
          to="/home"
          className="h-12 w-12 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="w-full h-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div
        onClick={() => {
          setRidePopupPanel(true);
        }}
        className="h-2/5 p-6"
      >
        <CaptainDetails />
      </div>

      <div
        ref={ridePopupPanelRef}
        className="bg-white fixed w-full z-10 bottom-0 translate-y-full px-3 py-10 pt-12"
      >
        <RidePopUp
          ride={ride}
          confirmRide={confirmRide}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>

      <div
        ref={confirmRidePopupPanelRef}
        className="bg-white fixed w-full h-screen z-10 bottom-0 translate-y-full px-3 py-10 pt-12"
      >
        <ConfirmRidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
