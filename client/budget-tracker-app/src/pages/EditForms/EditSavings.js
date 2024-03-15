import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, Divider, message } from "antd";
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

function EditSavings() {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const { id, savingId } = useParams();
  const navigate = useNavigate();

  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue(savingData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const handleSave = async (values) => {
    console.log("Updated saving data:", values);
    try {
      const response = await axios.put(
        `http://localhost:3001/saving/update-saving/${savingId}`,
        values
      );
      console.log(response);
      if (response.data.error) throw new Error(response.data.error);
      message.success("Saving Updated");
      navigate(`/user/dashboard/${id}`);
    } catch (error) {
      message.error(error.message);
    }
    setIsEditing(false);
    form.resetFields();
  };

  const [savingData, setSavingData] = useState(null);
  useEffect(() => {
    const getSaving = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/saving/get-saving/${savingId}`
        );
        if (response.data.error) throw new Error(response.data.error);
        const { removeId, ...savingData } = response.data.saving;

        setSavingData(savingData);
      } catch (error) {
        message.error(error.message);
      }
    };
    getSaving();
  }, []);

  if (savingData === null) return null;
  return (
    <>
      <Navbar selectedValue="1" />
      <Divider orientation="center" style={{ color: "#1890ff" }}>
        Edit Saving
      </Divider>
      <div
        className="edit-user-details-container"
        style={{ marginTop: "20px" }}
      >
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
                <Input disabled={!isEditing} prefix={<EditOutlined />} />
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
                <Input disabled={!isEditing} prefix={<NumberOutlined />} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Deadline"
                name="deadline"
                rules={[{ required: true, message: "Please select deadline!" }]}
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
                  Edit Saving
                </Button>
              )}
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}

export default EditSavings;
