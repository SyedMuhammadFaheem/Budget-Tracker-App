import React from "react";
import { Form, Input, Button, Row, Col, Divider, message } from "antd";
import { NumberOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import axios from "axios";
import Navbar from "./Navbar";
import "../styles/EditUserDetails.css";
import { useNavigate, useParams } from "react-router-dom";

function AddSaving() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const handleSave = async (values) => {
    console.log("Saved saving data:", values);
    try {
      const response = await axios.post(
        `http://localhost:3001/saving/create-saving/${id}`,
        values
      );
        console.log(response.data);
        if (response.data.error)
        throw new Error(response.data.error)
      message.success("Saving created successfully");
      navigate(`/user/dashboard/${id}`);
    } catch (error) {
      message.error(error.message);
    }
    form.resetFields();
  };

  return (
    <>
      <Navbar selectedValue="1" />
      <Divider orientation="center" style={{ color: "#1890ff" }}>
        Add Saving
      </Divider>
      <div
        className="edit-user-details-container"
        style={{ marginTop: "20px" }}
      >
        <Form form={form} onFinish={handleSave} layout="vertical">
          <Row gutter={[16, 16]} justify="center">
            <Col span={24}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter a name!" }]}
              >
                <Input prefix={<EditOutlined />} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Target Amount"
                name="targetAmount"
                rules={[
                  { required: true, message: "Please enter a target amount!" },
                ]}
              >
                <Input prefix={<NumberOutlined />} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Deadline"
                name="deadline"
                rules={[
                  { required: true, message: "Please select a deadline!" },
                ]}
              >
                <Input type="date" prefix={<EditOutlined />} />
              </Form.Item>
            </Col>

            <Col span={24} className="edit-user-details-btn-container">
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}

export default AddSaving;
