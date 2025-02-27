import { useState, createContext } from "react";
import PropTypes from "prop-types";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    fullName: {
      firstName: "",
      lastName: "",
    },
    email: "",
  });
  return (
    <div>
      <UserDataContext.Provider value={{ user, setUser }}>
        {children}
      </UserDataContext.Provider>
    </div>
  );
};

UserContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContext;
