
import PropTypes from 'prop-types';

const RidePopUp = (props) => {
return (
    <div>
        <h5
        onClick={() => {
            props.setRidePopupPanel(false)
        }}
        className="text-center absolute top-0 w-[93%] py-3"
      >
        <i className="text-3xl text-zinc-300 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-2xl font-semibold ">A Ride for you</h3>

      <div className='flex items-center justify-between p-3 bg-gray-100 rounded-lg mt-4'>
        <div className='flex items-center gap-3 '>
            <img
            className='h-13 w-13 rounded-full object-cover'
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww" alt="" />
            <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 KM</h5>
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

        <div className='flex items-center justify-between gap-3 w-full'>
            <button 
            onClick={() => {
                props.setRidePopupPanel(false)
            }}
            className="mt-5 bg-yellow-500 text-white font-semibold p-3 px-10 rounded-lg">
            Ignore
            </button>

            <button 
            onClick={() => {
              props.setConfirmRidePopupPanel(true)
              props.confirmRide()
            }}
            className="mt-5 bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">
            Confirm
            </button>
        </div>
      </div>
    </div>
  )
}

RidePopUp.propTypes = {
    setRidePopupPanel: PropTypes.func.isRequired,
    setConfirmRidePopupPanel: PropTypes.func.isRequired,
    confirmRide: PropTypes.func.isRequired,
    ride: PropTypes.shape({
      pickup: PropTypes.string.isRequired,
      destination: PropTypes.string.isRequired,
      fare: PropTypes.number.isRequired,
      user: PropTypes.shape({
        fullname: PropTypes.shape({
          firstname: PropTypes.string.isRequired,
          lastname: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
};

export default RidePopUp;