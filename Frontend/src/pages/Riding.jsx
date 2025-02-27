import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { useNavigate } from 'react-router-dom';
import LiveTracking from "../components/LiveTracking";

const Riding = () => {

  const location = useLocation();
  const { ride } = location.state || {}; // retrieve ride data

  const {socket} = useContext(SocketContext);
  const navigate = useNavigate();

  socket.on("ride-ended", () => {
    navigate('/home')
  })


  console.log(ride);

  return (
    <div className="h-screen">
        <Link to="/home" className="fixed right-2 top-2 h-12 w-12 bg-white flex items-center justify-center rounded-full">
        <i className="text-lg font-medium ri-home-5-line"></i>
        </Link>
      <div className="h-1/2">
        <LiveTracking />
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-15 mb-2"
            src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium">{ride?.captain.fullname.firstname}</h2>
            <h4 className="text-xl font-semibold -mt-1 -mg-1">{ride?.captain.vehicle.plate}</h4>
            <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
          </div>
        </div>
        <div className="flex justify-between flex-col items-center">
          <div className="w-full">
            <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
              <i className="text-2xl ri-map-pin-2-fill"></i>
              <div>
                <h3 className="text-lg font-semibold">562/11-A</h3>
                <p className="text-sm text-gray-600">{ride?.destination}</p>
              </div>
            </div>

            <div className="flex items-center gap-5 p-3 ">
              <i className="text-2xl ri-currency-line"></i>
              <div>
                <h3 className="text-lg font-semibold">₹{ride?.fare}</h3>
                <p className="text-sm text-gray-600">Cash Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className="mt-5 w-full bg-green-600 text-white font-semibold p-2 rounded-full">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
