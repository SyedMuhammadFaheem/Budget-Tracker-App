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
      align: "center"
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
        { text: "Regular", value: "regular" },
        { text: "One-time", value: "one-time" },
        { text: "Passive", value: "passive" },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: "Received Date",
      dataIndex: "receivedDate",
      key: "receivedDate",
      align: "center",
      sorter: (a, b) => new Date(a.receivedDate) - new Date(b.receivedDate),
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
                  onClick={() => deleteIncome(record.id)}
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
  const editIncome = (incomeId) => {
      console.log(incomeId);
      navigate(`/user/edit-incomes/${id}/${incomeId}`);
    };
    
    const deleteIncome = async (incomeId) => {
        console.log(incomeId)
        try {
            const response = await axios.delete(`http://localhost:3001/income/delete-income/${incomeId}`)
            console.log(response.data)
            
            message.success("Income deleted")
            window.location.reload()
        } catch (error) {
            message.error("Error in deleting income")
        }
    }

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
