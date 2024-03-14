import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Select, Divider } from "antd";
import { NumberOutlined,EditOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import "../styles/EditUserDetails.css";
import Navbar from "./Navbar";

function EditSavings({ savingData }) {
    
    const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue(savingData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const handleSave = (values) => {
    console.log("Updated saving data:", values);
    setIsEditing(false);
    form.resetFields();
  };
    return (
        <>
        <Navbar selectedValue="1" />
        <Divider orientation="center" style={{ color: "#1890ff" }}>
            Edit Saving
          </Divider>
        <div className="edit-user-details-container" style={{ marginTop: "20px" }}>
          <Form
            form={form}
            onFinish={handleSave}
            layout="vertical"
            initialValues={savingData}
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
                  label="Target Amount"
                  name="targetAmount"
                  rules={[{ required: true, message: "Please enter a target amount!" }]}
                >
                  <Input disabled={!isEditing} prefix={<NumberOutlined/>}/>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Deadline"
                  name="deadline"
                  rules={[{ required: true, message: "Please select deadline!" }]}
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
                    Edit Saving
                  </Button>
                )}
              </Col>
            </Row>
          </Form>
        </div>
      </>
  )
}

export default EditSavings