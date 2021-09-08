import { Button, Card, Col, Input, Row ,message} from "antd";
import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./styles/ChatScreen.css";
interface ChatScreenProps {}

export const ChatScreen: React.FC<ChatScreenProps> = ({}) => {
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
  }, []);
  // const establishConnection = () => {};
  const sendMessage = () => {
    socket.current.emit("send message", messageText);
    setMessage("");
  };
  return (
    <Row style={{ paddingTop: "20px", height: "100%" }}>
      <Col span={8} className="card">
        <Card title="Users" className="curve">
          <Input
            placeholder="Enter your name"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />
          <Input
            style={{ marginTop: "2%" }}
            placeholder="Enter friend name"
            value={friend}
            onChange={(e: any) => setFriend(e.target.value)}
          />
          <Button type="primary" style={{ marginTop: "2%" }}>
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
