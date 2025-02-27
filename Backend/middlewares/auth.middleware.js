const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');

// middleware that checks for token in cookies or headers
module.exports.authUser = async (req, res, next) => {
    //const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : req.cookies.token;


    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    console.log("Raw Token:", token);

    const isBlacklisted = await blackListTokenModel.findOne({ token: token });

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // save the user in the request object
        req.user = user;
        // farward the control to the next middleware/controller
        return next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    // console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token: token });

    // console.log(isBlacklisted);
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.captain = captain;
        // farward the control to the next middleware/controller
        return next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
}