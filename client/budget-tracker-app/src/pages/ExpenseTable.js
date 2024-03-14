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
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
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
      filters: [
        { text: "Groceries", value: "groceries" },
        { text: "Entertainment", value: "entertainment" },
        { text: "Utilities", value: "utilities" },
        { text: "Transportation", value: "transportation" },
        { text: "Medical", value: "medical" },
        { text: "Education", value: "education" },
        { text: "Other", value: "other" },
        ],
        
      onFilter: (value, record) => record.type === value,
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
                  icon={<DeleteOutlined />}
                  onClick={() => deleteExpense(record.id)}
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

  const editExpense = (expenseId) => {
      console.log(expenseId);
      navigate(`/user/edit-expenses/${id}/${expenseId}`);
    };
    
    const deleteExpense = async (expenseId) => {
        try {
            const response = await axios.delete(`http://localhost:3001/expense/delete-expense/${expenseId}`)
            console.log(response.data)
            message.success("Expense deleted")
            window.location.reload()
        } catch (error) {
            message.error("Error in deleting expense")
        }
    }

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
