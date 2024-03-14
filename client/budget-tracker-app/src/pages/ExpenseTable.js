import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";

function ExpenseTable() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    const getExpense = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/user/get-expense/${id}`
        );
        console.log(response.data);
        const { expense } = response.data;
        setData(expense);
      } catch (error) {
        message.error("Error fetching expenses!");
      }
    };
    getExpense();
  }, []);
  const expenseColumns = [
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
        { text: "Online Shopping", value: "Online Shopping" },
        { text: "Restaurant", value: "Restaurant" },
        { text: "Salary", value: "Salary" },
        { text: "Grocery", value: "Grocery" },
      ],
      onFilter: (value, record) => record.name.includes(value),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "center",
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      align: "center",
      sorter: (a, b) => a.type.localeCompare(b.type),
      // filters: Object.values(ExpenseType).map((value) => ({ text: value, value })),
      // onFilter: (value, record) => record.type === value,
    },
    {
      title: "Expense Date",
      dataIndex: "expenseDate",
      key: "expenseDate",
      align: "center",
      sorter: (a, b) => new Date(a.expenseDate) - new Date(b.expenseDate),
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
            onClick={() => editExpense(record.id)}
          />
        </span>
      ),
    },
  ];

  const addNewExpense = () => {
    navigate(`/user/add-new-expense/${id}`);
  };

  const editExpense = (id) => {
      console.log(id);
      navigate(`/user/edit-expenses/${id}`)
  };

  return (
    <>
      <Button
        type="primary"
        size="large"
        icon={<PlusOutlined />}
        onClick={addNewExpense}
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
      <Table columns={expenseColumns} dataSource={data} pagination={false} />
    </>
  );
}

export default ExpenseTable;
