import React from "react";
import { Form, Input, Button, Row, Col, Select, Divider, message } from "antd";
import { NumberOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import axios from "axios";
import Navbar from "../Others/Navbar";
import "../../styles/EditUserDetails.css";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const AddIncome = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSave = async (values) => {
    console.log("Saved income data:", values);
    console.log(id);
    try {
      const response = await axios.post(
        `http://localhost:3001/income/create-income/${id}`,
        values
      );
      console.log(response.data);
      if (response.data.error) throw new Error(response.data.error);
      message.success("Income created successfully");
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
        Add Income
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
                label="Amount"
                name="amount"
                rules={[{ required: true, message: "Please enter an amount!" }]}
              >
                <Input prefix={<NumberOutlined />} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Type"
                name="type"
                rules={[{ required: true, message: "Please select a type!" }]}
              >
                <Select>
                  <Option value="regular">Regular</Option>
                  <Option value="one-time">One-Time</Option>
                  <Option value="passive">Passive</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Received Date"
                name="receivedDate"
                rules={[
                  { required: true, message: "Please select a received date!" },
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
};

export default AddIncome;
