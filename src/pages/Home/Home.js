import React, { useEffect } from 'react';
import { Card, Row, Col, Typography, Button, Avatar, Watermark } from 'antd';
import { useNavigate } from "react-router-dom";
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';

import { useCustomCookies } from '../../utils';
const {Title} = Typography;

const Home = (props) => {
    const navigate = useNavigate();

    const {getUsername, resetCookies} = useCustomCookies();
    const logout = () => {
        resetCookies();
        navigate('/sign-in');
    }

    return (<>
    <Watermark content="EasyGenerator">
        <div
        style={{
            height: '100vh',
        }}>
            <Row justify="center" style={{backgroundColor: '#fffff'}}>
                <Col xs={24}>
                    <Card style={{backgroundColor: '#fffff'}}>
                        <Title level={4} style={{margin: '5px 10px 5px 10px',textAlign: 'center'}}>Welcome</Title>
                        <Title level={2} style={{margin: '5px 10px 5px 10px', textAlign: 'center'}}>
                            {getUsername()}
                        </Title>
                        <Button type="primary" onClick={logout} style={{margin: '5px 10px 5px 10px', float: 'right'}}>Logout</Button>
                    </Card>
                </Col>
            </Row>
        </div>
  </Watermark>
    </>);
}

export default Home;