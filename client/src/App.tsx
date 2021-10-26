import { ChakraProvider } from "@chakra-ui/react";
import React, { useState } from "react";
import "./App.css";
import { ChatScreen } from "./views/ChatScreen";
import { Login } from "./views/Login";
import { Chat } from "./views/Chat";
import theme from "./theme";
function App() {
  const [username, setUsername] = useState<string>("");
  const [userID, setUserID] = useState<string>("");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  return (
    <div className="body">
      <ChakraProvider theme={theme}>
        <Chat />
        {!loggedIn ? (
          <Login
            username={username}
            setUsername={setUsername}
            setLoggedIn={setLoggedIn}
            setUserID={setUserID}
          />
        ) : (
          <ChatScreen userID={userID} username={username} />
        )}
      </ChakraProvider>
    </div>
  );
}

export default App;
