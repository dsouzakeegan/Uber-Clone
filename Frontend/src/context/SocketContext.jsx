
import { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import PropTypes from 'prop-types';

export const SocketContext = createContext();

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000";
const socket = io(`${BASE_URL}`); // Replace with your server URL

const SocketProvider = ({ children }) => {
    useEffect(() => {
        // Basic connection logic
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};
SocketProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SocketProvider;