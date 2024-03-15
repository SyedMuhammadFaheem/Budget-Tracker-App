import React, { useState, useEffect } from "react";
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

function EditIncomes() {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const { id, incomeId } = useParams();
  const navigate = useNavigate();

  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue(incomeData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const handleSave = async (values) => {
    console.log("Updated income data:", values);
    try {
      const response = await axios.put(
        `http://localhost:3001/income/update-income/${incomeId}`,
        values
      );
      console.log(response);
      if (response.data.error) throw new Error(response.data.error);
      message.success("Income Updated");
      navigate(`/user/dashboard/${id}`);
    } catch (error) {
      message.error(error.message);
    }
    setIsEditing(false);
    form.resetFields();
  };

  const [incomeData, setIncomeData] = useState(null);
  useEffect(() => {
    const getIncome = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/income/get-income/${incomeId}`
        );
        if (response.data.error) throw new Error(response.data.error);
        const { removeId, ...incomeData } = response.data.income;

        setIncomeData(incomeData);
      } catch (error) {
        message.error(error.message);
      }
    };
    getIncome();
  }, []);
  if (incomeData === null) return null;
  return (
    <>
      <Navbar selectedValue="1" />
      <Divider orientation="center" style={{ color: "#1890ff" }}>
        Edit Income
      </Divider>
      <div
        className="edit-user-details-container"
        style={{ marginTop: "20px" }}
      >
        <Form
          form={form}
          onFinish={handleSave}
          layout="vertical"
          initialValues={incomeData}
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
                  Edit Income
                </Button>
              )}
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}

export default EditIncomes;
