import React from "react";
import { Form, Input, Button, Row, Col, Select, Divider, message } from "antd";
import Navbar from "./Navbar";
import { NumberOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import "../styles/EditUserDetails.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const AddExpense = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const handleSave = async (values) => {
    console.log("Saved expense data:", values);
    try {
      const response = await axios.post(
        `http://localhost:3001/expense/create-expense/${id}`,
        values
      );
      console.log(response.data);
      if (response.data.error)
        throw new Error(response.data.error)
      message.success("Expense created successfully");
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
        Add Expense
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
                  <Option value="groceries">Groceries</Option>
                  <Option value="entertainment">Entertainment</Option>
                  <Option value="utilities">Utilities</Option>
                  <Option value="transportation">Transportation</Option>
                  <Option value="medical">Medical</Option>
                  <Option value="education">Education</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Expense Date"
                name="expenseDate"
                rules={[
                  { required: true, message: "Please select an expense date!" },
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

export default AddExpense;
