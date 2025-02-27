
import PropTypes from 'prop-types';

const VehiclePanel = (props) => {
  return (
    <>
    <h5 
          onClick={() => {
            props.setVehiclePanelOpen(false)
          }}
          className="text-center absolute top-0 w-[93%] py-3">
          <i className="text-3xl text-zinc-300 ri-arrow-down-wide-line"></i>
        </h5>
        
        <h3 className="text-2xl font-semibold mb-4">Choose a Vehicle</h3>

        <div 
        onClick={() => {
          props.setconfirmRidePanelOpen(true)
          props.selectVehicle('car')
        }}
        className="p-2 border-2 active:border-black rounded-xl mb-2 flex items-center justify-between w-full">
          <img className="h-15" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
          <div className="ml-2 w-1/2">
            <h4 className="font-medium text-lg">UberGo  <small><i className="ri-user-3-fill">4</i></small></h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="font-normal text-xs text-gray-600">Affordable, compact rides</p>
          </div>
          <h2 className="text-lg font-semibold">₹{props.fare.car}</h2>
        </div>

        <div
        onClick={() => {
          props.setconfirmRidePanelOpen(true)
          props.selectVehicle('moto')
        }}
        className="p-2 border-2 active:border-black rounded-xl mb-2 flex items-center justify-between w-full">
          <img className="h-12 px-4" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
          <div className="mr-2 ml-2 w-1/2">
            <h4 className="font-medium text-lg">Moto  <small><i className="ri-user-3-fill">1</i></small></h4>
            <h5 className="font-medium text-sm">3 mins away</h5>
            <p className="font-normal text-xs text-gray-600">Affordable, motorcycle rides</p>
          </div>
          <h2 className="text-lg font-semibold">₹{props.fare.moto}</h2>
        </div>

        <div
        onClick={() => {
          props.setconfirmRidePanelOpen(true)
          props.selectVehicle('auto')

        }}
        className="p-2 border-2 active:border-black rounded-xl mb-2 flex items-center justify-between w-full">
          <img className="h-12 px-4" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
          <div className="ml-2 w-1/2">
            <h4 className="font-medium text-lg">UberAuto  <small><i className="ri-user-3-fill">3</i></small></h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="font-normal text-xs text-gray-600">Affordable, compact rides</p>
          </div>
          <h2 className="text-lg font-semibold">₹{props.fare.auto}</h2>
        </div>
    </>
  )
  
};

VehiclePanel.propTypes = {
  setVehiclePanelOpen: PropTypes.func.isRequired,
  setconfirmRidePanelOpen: PropTypes.func.isRequired,
  selectVehicle: PropTypes.func.isRequired,
  fare: PropTypes.shape({
    car: PropTypes.string.isRequired,
    moto: PropTypes.string.isRequired,
    auto: PropTypes.string.isRequired,
  }).isRequired,
};

export default VehiclePanel

