import React from "react";
import {
  Card,
  Statistic,
  Row,
  Col,
  Divider,
  Progress,
  Button,
  Table,
} from "antd";
import {
  WalletOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  DollarOutlined,
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/Dashboard.css";

const Dashboard = ({
  userName,
  balance,
  totalIncome,
  totalExpenses,
  savings,
  transactions,
}) => {

    const navigate = useNavigate()
  userName = "Faheem";
  balance = 50000;
  totalIncome = 150000;
  totalExpenses = 50000;
  savings = 25000;
  transactions = [
    {
      title: "Online Shopping",
      description: "Purchase from ABC Store",
      amount: 50.0,
    },
    {
      title: "Restaurant",
      description: "Dinner with friends",
      amount: 30.0,
    },
    {
      title: "Salary",
      description: "Monthly income",
      amount: 2000.0,
    },
    {
      title: "Grocery",
      description: "Weekly grocery shopping",
      amount: 100.0,
    },
  ];
  const incomePercentage = (totalIncome / (totalIncome + totalExpenses)) * 100;
  const expensesPercentage =
    (totalExpenses / (totalIncome + totalExpenses)) * 100;
  const savingsPercentage =
    ((totalIncome - totalExpenses) / (totalIncome + totalExpenses)) * 100;
  const deadline = "2024-12-31";
  const targetAmount = 50000;
  const totalSavedAmount = 25000;

  // Calculate the remaining days until the deadline
  const remainingDays = Math.ceil(
    (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24)
  );

  // Check if enough amount is saved before the deadline
  const isGoalAchieved = totalSavedAmount >= targetAmount && remainingDays >= 0;
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: "center",
      sorter: (a, b) => a.title.localeCompare(b.title),
      filters: [
        { text: "Online Shopping", value: "Online Shopping" },
        { text: "Restaurant", value: "Restaurant" },
        { text: "Salary", value: "Salary" },
        { text: "Grocery", value: "Grocery" },
      ],
      onFilter: (value, record) => record.title.includes(value),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <span>
          <Button
            type="link"
            icon={<DeleteOutlined style={{ color: "#f5222d" }} />}
          />
          <Button type="link" icon={<EditOutlined />} />
        </span>
      ),
    },
  ];

  const {id} = useParams()

  const addNewExpense=()=>{
    navigate(`/user/add-new-expense/${id}`)
  }
  const addNewIncome=()=>{
    navigate(`/user/add-new-income/${id}`)
  }

  return (
    <>
      <Navbar selectedValue="1" />
      <div className="dashboard-container" style={{ marginTop: "15px" }}>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card
              className="dashboard-card"
              style={{ background: "#1890ff", color: "#ffffff" }}
            >
              <Statistic
                title="Current Balance"
                value={balance}
                prefix={<DollarOutlined style={{ fontSize: "24px" }} />}
                valueStyle={{ fontSize: "24px" }}
                titleStyle={{ fontWeight: "bold" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card
              className="dashboard-card"
              style={{ background: "#52c41a", color: "#ffffff" }}
            >
              <Statistic
                title="Total Income"
                value={totalIncome}
                prefix={<ArrowUpOutlined style={{ fontSize: "24px" }} />}
                valueStyle={{ fontSize: "24px" }}
                titleStyle={{ fontWeight: "bold" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card
              className="dashboard-card"
              style={{ background: "#f5222d", color: "#ffffff" }}
            >
              <Statistic
                title="Total Expenses"
                value={totalExpenses}
                prefix={<ArrowDownOutlined style={{ fontSize: "24px" }} />}
                valueStyle={{ fontSize: "24px" }}
                titleStyle={{ fontWeight: "bold" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card
              className="dashboard-card"
              style={{ background: "#faad14", color: "#ffffff" }}
            >
              <Statistic
                title="Savings"
                value={savings}
                prefix={<WalletOutlined style={{ fontSize: "24px" }} />}
                valueStyle={{ fontSize: "24px" }}
                titleStyle={{ fontWeight: "bold" }}
              />
            </Card>
          </Col>
        </Row>
        <Divider orientation="center" style={{ color: "#1890ff" }}>
          Budget Overview
        </Divider>
        <Row gutter={[16, 16]} style={{ height: "100%" }}>
          <Col span={12}>
            <Card className="dashboard-card">
              <h3>Income vs Expenses</h3>
              <Progress
                type="circle"
                percent={incomePercentage}
                format={() => "Income"}
                size={150}
                strokeWidth={10}
                strokeColor="#52c41a"
                trailColor="#f0f0f0"
              />
              <Progress
                type="circle"
                percent={expensesPercentage}
                format={() => "Expenses"}
                style={{ marginLeft: "20px" }}
                size={150}
                strokeWidth={10}
                strokeColor="#f5222d"
                trailColor="#f0f0f0"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card className="dashboard-card" style={{ height: "100%" }}>
              <h3>Saving Goal Progress</h3>
              <Progress
                percent={savingsPercentage}
                status={savingsPercentage >= 100 ? "success" : "normal"}
                strokeWidth={20}
              />
              <p>
                {isGoalAchieved ? (
                  "Congratulations! You've achieved your saving goal."
                ) : (
                  <>
                    You're making progress towards your saving goal. <br />
                    You need to save ${targetAmount - totalSavedAmount} more to
                    achieve your goal by the deadline. <br />
                    You have {remainingDays} days left until the deadline.
                  </>
                )}
              </p>
            </Card>
          </Col>
        </Row>
        <Divider orientation="center" style={{ color: "#1890ff" }}>
          Expenses Details
        </Divider>
        <Row gutter={[16, 16]} justify="center">
          <Col span={24}>
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
            <Table
              columns={columns}
              dataSource={transactions}
              pagination={false}
            />
          </Col>
        </Row>
        <Divider orientation="center" style={{ color: "#1890ff" }}>
          Income Details
        </Divider>
        <Row gutter={[16, 16]} justify="center">
          <Col span={24}>
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
            <Table
              columns={columns}
              dataSource={transactions}
              pagination={false}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
