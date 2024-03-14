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
        const { saving } = response.data;
        setData(saving);
      } catch (error) {
        message.error("Error fetching savings!");
      }
    };
    getSaving();
  }, []);
  const savingColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      sorter: (a, b) => a.id - b.id,
      filters: null,
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
            icon={<DeleteOutlined style={{ color: "#f5222d" }} />}
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
    navigate(`/user/add-new-expense/${id}`);
  };

  const editSaving = (id) => {
    console.log(id);
    navigate(`/user/edit-savings/${id}`);
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
        Add New Expense
      </Button>
      <Table columns={savingColumns} dataSource={data} pagination={false} />
    </>
  );
}

export default SavingTable;