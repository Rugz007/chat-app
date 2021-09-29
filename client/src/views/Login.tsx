import { Button, Col, Input, Row } from "antd";
import axios from "axios";
import React from "react";

interface LoginProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setUserID: React.Dispatch<React.SetStateAction<string>>;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Login: React.FC<LoginProps> = ({
  username,
  setUsername,
  setLoggedIn,
  setUserID,
}) => {
  const loginUser = async () => {
    const response = await axios.post('http://localhost:8000/api/user/login',{
      username:username,
    })
    console.log(response.data._id)
    if(response)
    {
      setUserID(response.data._id)
      setLoggedIn(true)
    }
  };
  return (
    <>
      <Row>
        <Col span={8}></Col>
        <Col span={8}>
          <h1>Chat App</h1>
          <Input
            className="curve"
            placeholder="User name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button
            className="curve"
            type="primary"
            onClick={loginUser}
          >
            Use User
          </Button>
        </Col>
        <Col span={8}></Col>
      </Row>
    </>
  );
};
