import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserDataContext } from "./context/UserContext.jsx";
import { SocketContext } from "./context/SocketContext.jsx";

const App = () => {
  const { user } = useContext(UserDataContext);
  const { sendMessage, receiveMessage } = useContext(SocketContext);

  useEffect(() => {
    receiveMessage("someEvent", (data) => {
      console.log("Received data:", data);
    });
  }, [receiveMessage]);

  const handleSendMessage = () => {
    sendMessage("someEvent", { message: "Hello, Server!" });
  };

  return (
    <Router>
      <div>
        <h1>Welcome, {user.fullName.firstName}!</h1>
        <button onClick={handleSendMessage}>Send Message</button>
        <Switch>
          {/* Define your routes here */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;