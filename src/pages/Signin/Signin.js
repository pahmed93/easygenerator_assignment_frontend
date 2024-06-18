import React, { useEffect } from 'react';
import { Form, Card, Typography, Input, Button, notification, Row, Col} from 'antd';
import { connect } from 'react-redux';
import { CookiesProvider, useCookies } from 'react-cookie'
import { useNavigate, useHistory } from "react-router-dom";
import { useCustomCookies } from '../../utils';

import {
    signinApi,
    signinReset,
} from '../../actions/signinAction';

const { Title, Link, Text } = Typography;

const Signin = (props) => {

    const {
        signin,
        signinState,
        signinReset,
    } = props;

    const navigate = useNavigate();
    const {setTokenAndUsername} = useCustomCookies();

    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        signin(values);
    }

    useEffect(()=>{
        if(signinState.apiState=='success')
        {
            setTokenAndUsername(signinState.data.token, signinState.data.username);
            notification.success({
                message: signinState.message,
            });
            signinReset();
            navigate('/');
        }
        else if(signinState.apiState=='error')
        {
            notification.error({
                message: "Unable to create user",
            });
        }

    },[signinState]);

    return (<>
        <Row justify="center" style={{backgroundColor: '#fffff'}}>
            <Col 
                xs={24}
                sm={{span: 12, offset:1}}
                md={{span: 12, offset:1}}
                xl={{span: 5, offset:1}}
            >
                <Card style={{marginTop: '50px'}}>
                    <Title>EasyGenerator</Title>
                    <Title level={4}>Login</Title>
                    <Form
                        form={form}
                        onFinish={handleSubmit}
                        layout="vertical"
                    >
                        <Form.Item
                            label="Email Address"
                            name="email_address"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: "Email address is required",
                                    },
                                    {
                                        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Please enter a valid email address",
                                    },
                                ]
                            }
                        >
                            <Input></Input>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: "Please enter Password",
                                    },
                                ]
                            }
                        >
                            <Input.Password></Input.Password>
                        </Form.Item>

                        <Form.Item>
                            <Button 
                                type="primary"
                                htmlType='submit'
                            >
                                Login
                            </Button>
                        </Form.Item>
                        <Row>
                            <Col>
                                <Text>
                                    Don't have account?&nbsp;&nbsp;  
                                    <Link href="/sign-up">
                                        Sign Up
                                    </Link>
                                </Text>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Col>
        </Row>
    </>);
}

const mapStateToProps = (state) => ({
    signinState: state.signin,
});

const mapDispatchToProps = (dispatch) => ({
    signin: (data) => dispatch(signinApi(data)),
    signinReset: () => dispatch(signinReset()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Signin);