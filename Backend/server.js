const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket');
const port = process.env.PORT || 3000;

// Connect to MongoDB
// connectDB();

const server = http.createServer(app);

initializeSocket(server)

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});