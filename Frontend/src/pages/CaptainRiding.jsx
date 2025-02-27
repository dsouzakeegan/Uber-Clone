import { Link, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from "../components/FinishRide";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () => {
  const location = useLocation();
  const rideData = location.state?.ride;

  console.log(rideData);

  const [finishRidePanel, setfinishRidePanel] = useState(false);

  const finishRidePanelRef = useRef(null);

  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );

  return (
    <div className="select-none cursor-pointer h-screen relative">
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

      {/* google maps api map */}
      <div className="h-4/5">
        <LiveTracking />
      </div>

      <div className="h-1/5 p-6 flex items-center justify-between relative bg-transparent">
        <h5
          onClick={() => {
            setfinishRidePanel(true);
          }}
          className="text-center w-[90%] absolute top-0 py-3"
        >
          <i className="text-3xl text-zinc-200 ri-arrow-up-wide-line"></i>
        </h5>

        <h4 className="text-xl font-semibold">{rideData ? `${rideData.distance} KM away` : "Distance not available"}</h4>
        <button className="mt-5 bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">
          Complete Ride
        </button>
      </div>

      <div
        ref={finishRidePanelRef}
        className="bg-white fixed w-full z-10 bottom-0 translate-y-full px-3 py-10 pt-12"
      >
        <FinishRide 
        ride = {rideData}
        setfinishRidePanel={setfinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;
