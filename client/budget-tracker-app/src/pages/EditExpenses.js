import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, Select, Divider,message } from "antd";
import {
  NumberOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import "../styles/EditUserDetails.css";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const EditExpenses = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const { id, expenseId } = useParams();
  const navigate = useNavigate();
  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue(expenseData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const handleSave = async (values) => {
    console.log("Updated expense data:", values);
    try {
      const response = await axios.put(
        `http://localhost:3001/expense/update-expense/${expenseId}`,
        values
      );
      console.log(response);
      if (response.data.error)
        throw new Error(response.data.error)
      message.success("Expense Updated");
      navigate(`/user/dashboard/${id}`);
    } catch (error) {
      message.error(error.message);
    }
    setIsEditing(false);
    form.resetFields();
  };

  const [expenseData, setExpenseData] = useState(null)
  useEffect(() => {
    const getExpense = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/expense/get-expense/${expenseId}`
        );
        if (response.data.error)
        throw new Error(response.data.error)
        const { removeId, ...expenseData } = response.data.expense;

        setExpenseData(expenseData);
      } catch (error) {
          message.error(error.message);
      }
    };
    getExpense();
  },[]);
  if (expenseData === null) return null;
  return (
    <>
      <Navbar selectedValue="1" />
      <Divider orientation="center" style={{ color: "#1890ff" }}>
        Edit Expense
      </Divider>
      <div
        className="edit-user-details-container"
        style={{ marginTop: "20px" }}
      >
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
                <Input disabled={!isEditing} prefix={<EditOutlined />} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Amount"
                name="amount"
                rules={[{ required: true, message: "Please enter an amount!" }]}
              >
                <Input disabled={!isEditing} prefix={<NumberOutlined />} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Type"
                name="type"
                rules={[{ required: true, message: "Please select a type!" }]}
              >
                <Select disabled={!isEditing}>
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
                <Input
                  type="date"
                  disabled={!isEditing}
                  prefix={<EditOutlined />}
                />
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
