import React, { useEffect } from 'react';
import { Form, Typography, Card, Input, Button, notification, Row, Col, Watermark } from 'antd';
import { connect } from 'react-redux';
import { CookiesProvider, useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom";
import { useCustomCookies } from '../../utils';

import {
    signupApi,
    signupReset
} from '../../actions/signupAction';

const { Title, Link, Text } = Typography;

const Signup = (props) => {
    const navigate = useNavigate();
    const {setTokenAndUsername} = useCustomCookies();

    const {
        signup,
        signupState,
        signupReset,
    } = props;
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        signup(values);
    }

    useEffect(()=>{
        if(signupState.apiState=='success')
        {
            setTokenAndUsername(signupState.data.token, signupState.data.username);
            notification.success({
                message: signupState.message,
            });
            signupReset();
            navigate('/');
        }
        else if(signupState.apiState=='error')
        {
            notification.error({
                message: "Unable to create user",
            });
        }

    },[signupState]);

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
                    <Title level={3}>Create your Acount</Title>
                    <Form
                        form={form}
                        onFinish={handleSubmit}
                        layout='vertical'
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: "Name is required",
                                    }
                                ]
                            }
                        >
                            <Input></Input>
                        </Form.Item>

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
                                    {
                                        min: 8,
                                        message: "Password must be at least 8 characters long",
                                    },
                                    {
                                        pattern: /[a-zA-Z]/,
                                        message: "Password must contain at least one letter",
                                    },
                                    {
                                        pattern: /\d/,
                                        message: "Password must contain at least one number",
                                    },
                                    {
                                        pattern: /[@$!%*?&#]/,
                                        message: "Password must contain at least one special character (@, $, !, %, *, ?, &, #)",
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
                                Create Account
                            </Button>
                        </Form.Item>

                        <Row>
                            <Col>
                                <Text>
                                    Already have account?&nbsp;&nbsp;  
                                    <Link href="/sign-in">
                                        Sign In
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
    signupState: state.signup,
});

const mapDispatchToProps = (dispatch) => ({
    signup: (data) => dispatch(signupApi(data)),
    signupReset: () => dispatch(signupReset()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Signup);