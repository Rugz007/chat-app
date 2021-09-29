import { Button, Card, Col, Input, Row } from "antd";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./styles/ChatScreen.css";
interface ChatScreenProps {
  username: string;
  userID: string;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({ username,userID }) => {
  const [name, setName] = useState<string>("");
  const [friend, setFriend] = useState<string>("");
  const [messageText, setMessage] = useState<string>("");
  const socket: any = useRef();
  useEffect(() => {
    try {
      socket.current = io("http://localhost:8000");
    } catch {
      console.log("error");
    }
    socket.current.on("message", (message: string) => console.log(message));
    socket.current.emit(
      "connect rooms",
      { userID: userID },
      (message: string) => console.log(message)
    );
    // axios
    //   .get(
    //     "http://localhost:8000/api/chat/fetch?roomID=8883faef-5283-4ad6-a894-1ebcf861e319"
    //   )
    //   .then((response: any) => console.log(response.data.chat.messages));
  }, []);
  const createChat = () => {
    axios
      .post("http://localhost:8000/api/chat/create", {
        participants: ["rugved", "rajat"],
        isGroup: false,
      })
      .catch((error) => console.log(error));
  };
  const sendMessage = () => {
    socket.current.emit(
      "send message",
      {
        roomID: "8883faef-5283-4ad6-a894-1ebcf861e319",
        userID: userID,
        message: messageText,
      },
      () => setMessage("")
    );
  };
  return (
    <Row style={{ paddingTop: "20px", height: "100%" }}>
      <Col span={8} className="card">
        <Card title="Users" className="curve">
          <h2>Welcome {username}!</h2>
          <Input
            style={{ marginTop: "2%" }}
            placeholder="Enter friend name"
            value={friend}
            onChange={(e: any) => setFriend(e.target.value)}
          />
          <Button
            type="primary"
            style={{ marginTop: "2%" }}
            onClick={createChat}
          >
            Establish Connection
          </Button>
        </Card>
      </Col>
      <Col span={16} className="card">
        <Card title="Chat" className="curve">
          <Row>
            <Col span={22}>
              <Input
                placeholder="Enter your message"
                value={messageText}
                onChange={(e: any) => setMessage(e.target.value)}
              />
            </Col>
            <Col span={2}>
              <Button type="primary" onClick={sendMessage}>
                Send
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
