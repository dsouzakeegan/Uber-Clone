import PropTypes from "prop-types";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

const ConfirmRidePopUp = (props) => {


  const [otp, setOtp] = useState('')

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();

    const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000";
    const response = await axios.get(`${BASE_URL}/api/rides/start-ride`, {
      params: {
        rideId: props.ride._id,
        otp: otp
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    // console.log("confirm ride API resp: ", response.data);

    if (response.status === 200) {
      props.setConfirmRidePopupPanel(false);
      props.setRidePopupPanel(false);

      navigate('/captain-riding', { state: { ride: props.ride } });
    }
  };

  return (
    <div>
      <h5
        onClick={() => {
          props.setConfirmRidePopupPanel(false);
        }}
        className="text-center absolute top-0 w-[93%] py-3"
      >
        <i className="text-3xl text-zinc-300 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-2xl font-semibold ">Confirm this Ride to Start</h3>

      <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg mt-4">
        <div className="flex items-center gap-3 ">
          <img
            className="h-13 w-13 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww"
            alt=""
          />
          <h2 className="text-lg font-medium">{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>

      <div className="flex justify-between flex-col items-center">
        <div className="w-full">
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
            <i className="text-2xl ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-semibold">562/11-A</h3>
              <p className="text-sm text-gray-600">{props.ride?.pickup}</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
            <i className="text-2xl ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-semibold">562/11-A</h3>
              <p className="text-sm text-gray-600">{props.ride?.destination}</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 ">
            <i className="text-2xl ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-semibold">₹{props.ride?.fare}</h3>
              <p className="text-sm text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full">
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
            className="flex flex-col items-center gap-5"
          >
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="bg-[#eee] px-6 py-3 font-mono text-lg rounded-lg w-1/2 text-center</div>"
              placeholder="Enter OTP"
              type="text"
            />

            <div className="flex justify-between gap-30">
              <button
                onClick={() => {
                  props.setConfirmRidePopupPanel(false);
                }}
                className="mt-5 bg-red-600 text-white font-semibold p-3 px-8 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={submitHandler}
                className="mt-5 flex justify-center place-items-center bg-green-600 text-white font-semibold p-3 px-8 rounded-lg"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

ConfirmRidePopUp.propTypes = {
  setConfirmRidePopupPanel: PropTypes.func.isRequired,
  setRidePopupPanel: PropTypes.func.isRequired,
  ride: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    user: PropTypes.shape({
      fullname: PropTypes.shape({
        firstname: PropTypes.string,
        lastname: PropTypes.string,
      }),
    }),
    pickup: PropTypes.string,
    destination: PropTypes.string,
    fare: PropTypes.number,
  }),
};

export default ConfirmRidePopUp;
