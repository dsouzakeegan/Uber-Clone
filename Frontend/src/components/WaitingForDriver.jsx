import PropTypes from "prop-types";

const WaitingForDriver = (props) => {
  return (
    <>
      <h5
        onClick={() => {
          props.setWaitingForDriver(false);
        }}
        className="text-center absolute top-0 w-[93%] py-3"
      >
        <i className="text-3xl text-zinc-300 ri-arrow-down-wide-line"></i>
      </h5>

      <div className="flex items-center justify-between">
        <img
          className="h-15 mb-2"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt=""
        />
        <div className="text-right">
          <h2 className="text-lg font-medium">
            {props.ride?.captain.fullname.firstname}
          </h2>
          <h4 className="text-xl font-semibold -mt-1 -mg-1">
            {props.ride?.captain.vehicle.plate}
          </h4>
          <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
          <h1 className="text-lg font-semibold">{props.ride?.otp}</h1>
        </div>
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
      </div>
    </>
  );
};

WaitingForDriver.propTypes = {
  setWaitingForDriver: PropTypes.func.isRequired,
  ride: PropTypes.shape({
    pickup: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    fare: PropTypes.number.isRequired,
    otp: PropTypes.string.isRequired,
    captain: PropTypes.shape({
      fullname: PropTypes.shape({
        firstname: PropTypes.string.isRequired,
      }).isRequired,
      vehicle: PropTypes.shape({
        plate: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default WaitingForDriver;
