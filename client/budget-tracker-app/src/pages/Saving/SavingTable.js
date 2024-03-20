import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";

function SavingTable() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    const getSaving = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/user/get-saving/${id}`
        );
          console.log(response.data);
          if (response.data.error)
        throw new Error(response.data.error)
        const { saving } = response.data;
        setData(saving);
      } catch (error) {
        message.error(error.message);
      }
    };
    getSaving();
  },[]);
  const savingColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Target Amount",
      dataIndex: "targetAmount",
      key: "targetAmount",
      align: "center",
      sorter: (a, b) => a.targetAmount - b.targetAmount,
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
      align: "center",
      sorter: (a, b) => new Date(a.deadline) - new Date(b.deadline),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <span>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => deleteSaving(record.id)}
          />
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => editSaving(record.id)}
          />
        </span>
      ),
    },
  ];

  const addNewSaving = () => {
    navigate(`/user/add-new-saving/${id}`);
  };

  const editSaving = (savingId) => {
    console.log(savingId);
    navigate(`/user/edit-savings/${id}/${savingId}`);
  };

  const deleteSaving = async (savingId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/saving/delete-saving/${savingId}`
        );
        console.log(response.data)
        if (response.data.error)
        throw new Error(response.data.error)
      message.success("Saving deleted");
      window.location.reload();
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <>
      <Button
        type="primary"
        size="large"
        icon={<PlusOutlined />}
        onClick={addNewSaving}
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          margin: "8px 0 8px 8px",
          borderRadius: "4px",
          width: "fit-content",
          padding: "0 12px",
        }}
      >
        Add New Saving
      </Button>
      <Table columns={savingColumns} dataSource={data} pagination={false} />
    </>
  );
}

export default SavingTable;
