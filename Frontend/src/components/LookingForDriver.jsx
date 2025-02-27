import PropTypes from 'prop-types';

const LookingForDriver = (props) => {
  return (
    <>
      <h5
        onClick={() => {
          props.setVehicleFound(false);
        }}
        className="text-center absolute top-0 w-[93%] py-3"
      >
        <i className="text-3xl text-zinc-300 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-2xl font-semibold ">Looking for a Driver</h3>

      <div className="flex justify-between flex-col items-center">
        <img
          className="h-30 mb-2"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt=""
        />

        <div className="w-full">
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
          <i className="text-2xl ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-semibold">562/11-A</h3>
              <p className="text-sm text-gray-600">{props.pickup}</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
          <i className="text-2xl ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-semibold">562/11-A</h3>
              <p className="text-sm text-gray-600">{props.destination}</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 ">
            <i className="text-2xl ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-semibold">₹{props.fare[ props.vehicleType ]}</h3>
              <p className="text-sm text-gray-600">Cash Cash</p>
            </div>
            </div>
        </div>

      </div>
    </>
  )
}

LookingForDriver.propTypes = {
  setVehicleFound: PropTypes.func.isRequired,
  pickup: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  vehicleType: PropTypes.string.isRequired,
  fare: PropTypes.object.isRequired,
};

export default LookingForDriver;