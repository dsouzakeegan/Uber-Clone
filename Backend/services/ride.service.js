const rideModel = require('../models/ride.model');
const { sendMessageToSocketId } = require('../socket');
const mapService = require('./maps.service')
const crypto = require('crypto');

async function getFare(pickup, destination) {
    if(!(pickup || destination)) {
        throw new Error('Pickup and destination are required')
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    if (typeof distanceTime.distance !== 'number' || typeof distanceTime.time !== 'number') {
        throw new Error('Invalid distance or time from map service');
    }

    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 1,
        car: 2,
        moto: 1.5
    };

    console.log(distanceTime)

    const fare = {
        auto: Math.round(baseFare.auto + (distanceTime.distance * perKmRate.auto) + (distanceTime.time * perMinuteRate.auto)),
        car: Math.round(baseFare.car + (distanceTime.distance * perKmRate.car) + (distanceTime.time * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + (distanceTime.distance * perKmRate.moto) + (distanceTime.time * perMinuteRate.moto))
    };

    return fare;
}

module.exports.getFare = getFare;



function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(0, Math.pow(10, num)).toString().padStart(num, '0');
        return otp;
    }

    return generateOtp(num);
}

module.exports.createRide = async ({ 
    user, pickup, destination, vehicleType
 }) => { 
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('User, pickup, destination, and vehicle type are required');
    }

    const fare = await getFare(pickup, destination);
    console.log(fare)

    const ride = new rideModel({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType],
    });

    await ride.save();

    return ride;
}

// function to update ride status and assign captain
module.exports.confirmRide = async({
    rideId, captain
}) => {
    if (!rideId) {
        throw new Error('Ride is Required')
    }

    // find ride and update status and assigning a captain
    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    // find ride and populate user
    const ride = await rideModel.findOne({ 
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride
}

module.exports.startRide = async({
    rideId, otp
}) => {
    if (!rideId || !otp) {
        throw new Error('RideId and OTP are required');
    }

    // find ride
    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted yet');
    }

    // update ride status
    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-started',
        data: ride
    });

    return ride;
}

module.exports.endRide = async({
    rideId, captain
}) => {
    if (!rideId) {
        throw new Error('RideId is required');
    }

    // find ride
    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing yet');
    }

    // update ride status
    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-ended',
        data: ride
    });

    return ride;
}