import { React, useEffect } from "react";
import { Button, Form, Grid, Input, theme, Typography, message } from "antd";
import {
  LockOutlined,
  MailOutlined,
  UserAddOutlined,
  LockFilled,
  GoogleOutlined,
} from "@ant-design/icons";
import { GoogleLogin } from "react-google-login";
import logo from "../images/logo.png";
import axios from "axios";
import auth from "../components/auth";
import backgroundImage from "../images/background.png";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

function Signup() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const [form] = Form.useForm();

  useEffect(() => {
    auth();
  }, []);

  const responseGoogleSuccess = async (response) => {
    console.log(response.wt.Ad); //name
    console.log(response.wt.NT); //id
    console.log(response.wt.cu); //email
    const values = {
      username: response.wt.Ad,
      email: response.wt.cu,
      password: response.wt.NT,
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/user/oauth/register",
        values
      );
      console.log(response.data);
      message.success("Signup Success!");
      form.resetFields();
    } catch (error) {
      message.error(error);
    }
  };
  const responseGoogleFailure = (response) => {
    console.log(response);
  };

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    if (values.confirmPassword !== values.password) {
      message.error("Password and Confirm Password don't match!");
      form.resetFields();
      return;
    }
    const { confirmPassword, ...data } = values;
    try {
      const response = await axios.post(
        "http://localhost:3001/user/signup",
        data
      );
      console.log(response.data);
      message.success("Signup Success!");
    } catch (error) {
      message.error(error);
    }
  };

  const styles = {
    section: {
      display: "flex",
      minHeight: "100vh",
      backgroundImage:
        "linear-gradient(45deg, hsl(240, 46%, 95%) 0%, hsl(304, 30%, 94%) 10%, hsl(347, 49%, 95%) 20%, hsl(11, 49%, 95%) 30%, hsl(30, 35%, 94%) 40%, hsl(60, 16%, 94%) 50%, hsl(41, 19%, 94%) 60%, hsl(29, 19%, 94%) 70%, hsl(20, 15%, 94%) 80%, hsl(11, 10%, 93%) 90%, hsl(0, 6%, 93%) 100%)",
    },
    formContainer: {
      flex: 1,
      padding: "50px",
      backgroundImage:
        "linear-gradient(45deg, hsl(240, 46%, 95%) 0%, hsl(304, 30%, 94%) 10%, hsl(347, 49%, 95%) 20%, hsl(11, 49%, 95%) 30%, hsl(30, 35%, 94%) 40%, hsl(60, 16%, 94%) 50%, hsl(41, 19%, 94%) 60%, hsl(29, 19%, 94%) 70%, hsl(20, 15%, 94%) 80%, hsl(11, 10%, 93%) 90%, hsl(0, 6%, 93%) 100%)",
      borderRadius: "18px",
    },
    imageContainer: {
      flex: 1,
      backgroundColor:
        "linear-gradient(45deg, hsl(240, 46%, 95%) 0%, hsl(304, 30%, 94%) 10%, hsl(347, 49%, 95%) 20%, hsl(11, 49%, 95%) 30%, hsl(30, 35%, 94%) 40%, hsl(60, 16%, 94%) 50%, hsl(41, 19%, 94%) 60%, hsl(29, 19%, 94%) 70%, hsl(20, 15%, 94%) 80%, hsl(11, 10%, 93%) 90%, hsl(0, 6%, 93%) 100%)",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "18px",
    },
    form: {
      maxWidth: "400px",
      margin: "0 auto",
    },
    header: {
      marginBottom: token.marginXL,
      textAlign: "center",
    },
    text: {
      color: "black",
    },
    title: {
      color: "black",
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
  };

  return (
    <section style={styles.section}>
      <style>{`
                .place-holder input::placeholder {
                color: #787676; /* Placeholder text color */
                opacity: 1; /* Placeholder text opacity */
                }
                `}</style>
      <div style={styles.formContainer}>
        <div style={styles.form}>
          <div style={styles.header}>
            <img
              src={logo}
              alt="logo"
              style={{ width: "140px", height: "140px" }}
            />
            <Title level={2} style={styles.title}>
              Sign Up
            </Title>
            <Text style={styles.text}>
              Welcome back to Budget Tracker App! Please enter your details
              below to sign up.
            </Text>
          </div>
          <Form
            form={form}
            name="signup"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            layout="vertical"
            requiredMark="optional"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username properly!",
                },
              ]}
            >
              <Input
                prefix={
                  <UserAddOutlined style={{ color: "rgba(0,0,0,.80)" }} />
                }
                type="name"
                placeholder="John Doe"
                style={{ borderColor: "#4D4B4B" }}
                className="place-holder"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please input your email properly!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined style={{ color: "rgba(0,0,0,.80)" }} />}
                placeholder="johndoe123@example.com"
                style={{ borderColor: "#4D4B4B" }}
                className="place-holder"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.80)" }} />}
                type="password"
                placeholder="Password"
                style={{ borderColor: "#4D4B4B" }}
                className="place-holder"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your Password Confirmation!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockFilled style={{ color: "rgba(0,0,0,.80)" }} />}
                type="password"
                placeholder="Confirm Password"
                style={{ borderColor: "#4D4B4B" }}
                className="place-holder"
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: "0px" }}>
              <Button block type="primary" htmlType="submit">
                Signup
              </Button>
              <GoogleLogin
                clientId="637568304248-85h5n2gvvjahf6ajralrnn0ab1kcofap.apps.googleusercontent.com"
                onSuccess={responseGoogleSuccess}
                onFailure={responseGoogleFailure}
                cookiePolicy={"single_host_origin"}
                render={(renderProps) => (
                  <Button
                    block
                    type="primary"
                    icon={<GoogleOutlined />}
                    style={{ marginTop: "5px" }}
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    Login with Google
                  </Button>
                )}
              />
              <div style={{ marginTop: "16px", textAlign: "center" }}>
                <Text>Already have an account? </Text>
                <Link href="/login">Sign in now</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div style={styles.imageContainer}></div>
    </section>
  );
}

export default Signup;
