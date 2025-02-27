import { createContext, useEffect, useContext, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000"); // Replace with your server URL
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = (eventName, message) => {
    if (socket) {
      socket.emit(eventName, message);
    }
  };

  const receiveMessage = (eventName, callback) => {
    if (socket) {
      socket.on(eventName, callback);
    }
  };

  return (
    <SocketContext.Provider value={{ sendMessage, receiveMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};

export default SocketProvider;