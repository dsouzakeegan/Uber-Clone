// filepath: /c:/Users/Admin/Desktop/uber/Frontend/src/context/SocketContext.jsx
import { createContext, useEffect, useContext } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const socket = io("http://localhost:3000"); // Replace with your server URL

  const sendMessage = (eventName, message) => {
    socket.emit(eventName, message);
  };

  const receiveMessage = (eventName, callback) => {
    socket.on(eventName, callback);
  };

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ sendMessage, receiveMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;