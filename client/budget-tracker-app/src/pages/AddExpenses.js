import React from "react";
import { Form, Input, Button, Row, Col, Select, Divider } from "antd";
import Navbar from "./Navbar";
import { NumberOutlined,EditOutlined, SaveOutlined } from "@ant-design/icons";
import "../styles/EditUserDetails.css"; 

const { Option } = Select;

const AddExpense = () => {
  const [form] = Form.useForm();

  const handleSave = (values) => {
    console.log("Saved expense data:", values);
    form.resetFields();
  };

  return (
    <>
    <Navbar selectedValue="1" />
    <Divider orientation="center" style={{ color: "#1890ff" }}>
          Add Expense
        </Divider>
    <div className="edit-user-details-container" style={{ marginTop: "20px" }}>
      <Form
        form={form}
        onFinish={handleSave}
        layout="vertical"
      >
        <Row gutter={[16, 16]} justify="center">
          <Col span={24}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter a name!" }]}
            >
              <Input prefix={<EditOutlined/>}/>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Amount"
              name="amount"
              rules={[{ required: true, message: "Please enter an amount!" }]}
            >
              <Input prefix={<NumberOutlined/>}/>
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
              label="Expense Date"
              name="expenseDate"
              rules={[{ required: true, message: "Please select an expense date!" }]}
            >
              <Input prefix={<EditOutlined/>}/>
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
