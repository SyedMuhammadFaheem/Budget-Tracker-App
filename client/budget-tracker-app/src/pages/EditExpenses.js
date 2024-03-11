import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Select } from "antd";
import { NumberOutlined,EditOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import "../styles/EditUserDetails.css";
import Navbar from "./Navbar";

const { Option } = Select;

const EditExpenses = ({ expenseData }) => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue(expenseData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const handleSave = (values) => {
    console.log("Updated expense data:", values);
    setIsEditing(false);
    form.resetFields();
  };

  return (
    <>
      <Navbar selectedValue="1" />
      <div className="edit-user-details-container" style={{ marginTop: "20px" }}>
        <Form
          form={form}
          onFinish={handleSave}
          layout="vertical"
          initialValues={expenseData}
        >
          <Row gutter={[16, 16]} justify="center">
            <Col span={24}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter a name!" }]}
              >
                <Input disabled={!isEditing} prefix={<EditOutlined/>}/>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Amount"
                name="amount"
                rules={[{ required: true, message: "Please enter an amount!" }]}
              >
                <Input disabled={!isEditing} prefix={<NumberOutlined/>}/>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Type"
                name="type"
                rules={[{ required: true, message: "Please select a type!" }]}
              >
                <Select disabled={!isEditing}>
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
                <Input type="date" disabled={!isEditing} prefix={<EditOutlined/>}/>
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
                  Edit Expense
                </Button>
              )}
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default EditExpenses;
