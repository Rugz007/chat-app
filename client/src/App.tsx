import React, { useState } from "react";
import "./App.css";
import { ChatScreen } from "./views/ChatScreen";
import { Login } from "./views/Login";

function App() {
  const [username, setUsername] = useState<string>("");
  const [userID, setUserID] = useState<string>("");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  return (
    <div className="body">
      {!loggedIn ? (
        <Login
          username={username}
          setUsername={setUsername}
          setLoggedIn={setLoggedIn}
          setUserID={setUserID}
        />
      ) : (
        <ChatScreen userID={userID} username={username}/>
      )}
    </div>
  );
}

export default App;
