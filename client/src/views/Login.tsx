import { Button, Col, Input, Row } from "antd";
import React from "react";

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  return (
    <>
      <Row>
        <Col span={8}></Col>
        <Col span={8}>
            <h1>Chat App</h1>
          <Input className='curve' placeholder='User name' />
          <Input className='curve' placeholder='Name'/>
          <Button className='curve' type='primary'>Use User</Button>
        </Col>
        <Col span={8}></Col>
      </Row>
    </>
  );
};
