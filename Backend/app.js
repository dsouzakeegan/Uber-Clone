const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectDB = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes')
const ridesRoutes = require('./routes/ride.routes')

connectDB();

// CORS Configuration
const allowedOrigins = ["http://localhost:5173"];
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization"
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes

// app.use((req, res, next) => {
//   console.log(`[${req.method}] ${req.path} - Headers:`, req.headers);
//   next();
// });

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/users', userRoutes);
app.use('/api/captains', captainRoutes);
app.use('/api/maps', mapsRoutes)
app.use('/api/rides', ridesRoutes)

module.exports = app;