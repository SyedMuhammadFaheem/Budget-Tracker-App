import React, {useEffect, useState} from "react";
import { Table, Button, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import axios from 'axios'
function IncomeTable() {
  const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState()

    useEffect(() => {
        const getIncome = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/user/get-income/${id}`)
                console.log(response.data)
                const { income } = response.data
                setData(income)
            } catch (error) {
                message.error('Error fetching incomes!')
            }
        }
        getIncome()
    },[])
    
  const incomeColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      sorter: (a, b) => a.id - b.id,
      filters: null,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      sorter: (a, b) => a.name.localeCompare(b.name),
      filters: [
        { text: "Salary", value: "Salary" },
        { text: "Grocery", value: "Grocery" },
        // Add more filters as needed
      ],
      onFilter: (value, record) => record.name === value,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "center",
      sorter: (a, b) => a.amount - b.amount,
      filters: [
        { text: "Less than $50", value: "lt50" },
        { text: "$50 - $100", value: "50to100" },
        { text: "More than $100", value: "gt100" },
      ],
      onFilter: (value, record) => {
        switch (value) {
          case "lt50":
            return record.amount < 50;
          case "50to100":
            return record.amount >= 50 && record.amount <= 100;
          case "gt100":
            return record.amount > 100;
          default:
            return false;
        }
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      align: "center",
      filters: [
        { text: "Regular", value: "regular" },
        { text: "One-time", value: "one-time" },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: "Received Date",
      dataIndex: "receivedDate",
      key: "receivedDate",
      align: "center",
      filters: [
        { text: "Today", value: "today" },
        { text: "Yesterday", value: "yesterday" },
      ],
      onFilter: (value, record) => {
        const today = new Date();
        const recordDate = new Date(record.receivedDate);
        switch (value) {
          case "today":
            return (
              recordDate.getDate() === today.getDate() &&
              recordDate.getMonth() === today.getMonth() &&
              recordDate.getFullYear() === today.getFullYear()
            );
          case "yesterday":
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            return (
              recordDate.getDate() === yesterday.getDate() &&
              recordDate.getMonth() === yesterday.getMonth() &&
              recordDate.getFullYear() === yesterday.getFullYear()
            );
          default:
            return false;
        }
      },
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
            onClick={() => editIncome(record.id)}
          />
        </span>
      ),
    },
  ];

  const addNewIncome = () => {
    navigate(`/user/add-new-income/${id}`);
  };
  const editIncome = (id) => {
    console.log(id);
  };

  return (
    <>
      <Button
        type="primary"
        size="large"
        icon={<PlusOutlined />}
        onClick={addNewIncome}
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
        Add New Income
      </Button>
      <Table columns={incomeColumns} dataSource={data} pagination={false} />
    </>
  );
}

export default IncomeTable;
