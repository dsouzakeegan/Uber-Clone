const axios = require('axios')
const captainModel = require('../models/captain.model')

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.status === 'OK') {
            const location = data.results[0].geometry.location;

            console.log("Google Maps API Response Location:", location);

            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            console.error('Error fetching coordinates:', data);
            throw new Error('Unable to get coordinates');
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error;
    }
};



module.exports.getDistanceTime = async (origin, destination) => {
    if (!(origin || destination)){
        throw new Error('Origin and destination are required.');
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);

        if (response.data.status === 'OK') {
            const element = response.data.rows[0].elements[0];

            if (element.status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }

            return {
                distance: element.distance.value / 1000, // Convert meters to kilometers
                time: element.duration.value / 60 // Convert seconds to minutes
            };
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};


module.exports.getAutoCompleteSuggestions = async (query) => {
    if (!query) {
        throw new Error('Query is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status !== 'OK') {
            throw new Error(`Error fetching autocomplete suggestions: ${response.data.status}`);
        }
        return response.data.predictions;
    } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
        throw error;
    }
};

module.exports.getCaptainsInTheRadius = async (lat, lng, radius) => {
    // Ensure lat and lng are numbers
    if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
        throw new Error(`Invalid coordinates: lat=${lat}, lng=${lng}`);
    }

    try {
        const captains = await captainModel.find({
            location: {
                $geoWithin: {
                    $centerSphere: [ [ lat, lng ], radius / 6371 ]
                }
            }
        });
        console.log(captains);
    
        return captains;
    } catch (error) {
        console.error("Error fetching captains:", error);
        throw error;
    }
};
