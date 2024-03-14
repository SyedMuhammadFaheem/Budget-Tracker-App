import React, { useEffect, useState } from "react";
import { Card, Statistic, Row, Col, Divider, Progress, message } from "antd";
import {
  WalletOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import "../styles/Dashboard.css";
import IncomeTable from "./IncomeTable";
import ExpenseTable from "./ExpenseTable";

const Dashboard = ({ transactions }) => {
  const [userName, setUserName] = useState("");
  const [balance, setBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    const getNumbers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/user/get-numbers/${id}`
        );
        const { numbers } = response.data;
        setUserName(numbers.name);
        setBalance(parseFloat(numbers.balance));
        setTotalIncome(parseFloat(numbers.income_amount));
        setTotalExpenses(parseFloat(numbers.expense_amount));
        setSavings(parseFloat(numbers.saving_amount));
      } catch (error) {
        message.error("Error fecthing numbers data");
      }
    };
    getNumbers();
  }, [balance, totalIncome, totalExpenses, savings]);

  const incomePercentage = (totalIncome / (totalIncome + totalExpenses)) * 100;
  const expensesPercentage =
    (totalExpenses / (totalIncome + totalExpenses)) * 100;
  const savingsPercentage = (
    ((totalIncome - totalExpenses) / (totalIncome + totalExpenses)) *
    100
  ).toFixed(0);
  const deadline = "2024-12-31";
  const targetAmount = savings;
  const totalSavedAmount =
    totalIncome - totalExpenses >= 0 ? totalIncome - totalExpenses : 0;
  console.log(totalSavedAmount);

  // Calculate the remaining days until the deadline
  const remainingDays = Math.ceil(
    (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24)
  );

  // Check if enough amount is saved before the deadline
  const isGoalAchieved = totalSavedAmount >= targetAmount && remainingDays >= 0;

  const { id } = useParams();

  return (
    <>
      <Navbar name={userName} selectedValue="1" />
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
          Expenses History
        </Divider>
        <Row gutter={[16, 16]} justify="center">
          <Col span={24}>
            <ExpenseTable />
          </Col>
        </Row>
        <Divider orientation="center" style={{ color: "#1890ff" }}>
          Income History
        </Divider>
        <Row gutter={[16, 16]} justify="center">
          <Col span={24}>
            <IncomeTable />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
