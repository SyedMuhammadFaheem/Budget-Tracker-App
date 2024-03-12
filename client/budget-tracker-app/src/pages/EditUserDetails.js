import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Select,Divider } from "antd";
import { NumberOutlined,EditOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import "../styles/EditUserDetails.css";
import Navbar from "./Navbar";

const { Option } = Select;

const EditUserDetails = ({ userData }) => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue(userData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const handleSave = (values) => {
    console.log("Updated user data:", values);
    setIsEditing(false);
    form.resetFields();
  };

  return (
    <>
      <Navbar selectedValue="2" />
      <Divider orientation="center" style={{ color: "#1890ff" }}>
          Edit Profile
        </Divider>
      <div className="edit-user-details-container" style={{ marginTop: "20px" }}>
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
                  { type: "email", message: "Please enter a valid email address!" },
                ]}
              >
                <Input disabled={!isEditing} prefix={<EditOutlined />} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please enter a password!" }]}
              >
                <Input.Password disabled={!isEditing} prefix={<EditOutlined />} />
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
