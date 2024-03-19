import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, Select, Divider, message } from "antd";
import {
  NumberOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import "../../styles/EditUserDetails.css";
import axios from "axios";
import Navbar from "../Navbar";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const EditUserDetails = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue(userData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const handleSave = async (values) => {
    console.log("Updated user data:", values);
    try {
      const response = await axios.put(
        `http://localhost:3001/user/update-user-details/${id}`,
        values
      );
      console.log(response);
      if (response.data.error) throw new Error(response.data.error);

      message.success("User Updated");
      navigate(`/user/dashboard/${id}`);
    } catch (error) {
      message.error(error.message);
    }
    setIsEditing(false);
  };

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/user/get-user-details/${id}`
        );
        if (response.data.error) throw new Error(response.data.error);
        const { removeId, ...userData } = response.data.user;

        setUserData(userData);
      } catch (error) {
        message.error(error.message);
      }
    };
    getUserDetails();
  }, []);

  if (userData === null) return null;
  return (
    <>
      <Navbar name={ userData.name} selectedValue="2" />
      <Divider orientation="center" style={{ color: "#1890ff" }}>
        Edit Profile
      </Divider>
      <div
        className="edit-user-details-container"
        style={{ marginTop: "20px" }}
      >
        <Form
          form={form}
          onFinish={handleSave}
          layout="vertical"
          initialValues={userData}
        >
          <Row gutter={[16, 16]} justify="center">
            <Col span={24}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter a name!" }]}
              >
                <Input disabled={!isEditing} prefix={<EditOutlined />} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter an email!" },
                  {
                    type: "email",
                    message: "Please enter a valid email address!",
                  },
                ]}
              >
                <Input disabled={!isEditing} prefix={<EditOutlined />} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: "Please enter a role!" }]}
              >
                <Select disabled={!isEditing}>
                  <Option value="user">User</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Balance"
                name="balance"
                rules={[{ required: true, message: "Please enter a balance!" }]}
              >
                <Input disabled={!isEditing} prefix={<NumberOutlined />} />
              </Form.Item>
            </Col>
            <Col span={24} className="edit-user-details-btn-container">
              {isEditing ? (
                <div className="edit-user-details-btn-group">
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SaveOutlined />}
                  >
                    Save
                  </Button>
                  <Button onClick={handleCancel} icon={<CloseOutlined />}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button type="primary" onClick={handleEdit}>
                  Edit Profile
                </Button>
              )}
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default EditUserDetails;
