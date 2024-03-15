import React, { useEffect, useState } from "react";
import {
  Card,
  Statistic,
  Row,
  Col,
  Divider,
  Progress,
  message,
  Carousel,
} from "antd";
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
import "../styles/Carousel.css";
import IncomeTable from "./Tables/IncomeTable";
import ExpenseTable from "./Tables/ExpenseTable";
import SavingTable from "./Tables/SavingTable";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncomeMonth, setTotalIncomeMonth] = useState(0);
  const [totalExpensesMonth, setTotalExpensesMonth] = useState(0);

  useEffect(() => {
    const getNumbers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/user/get-numbers/${id}`
        );

        if (response.data.error) throw new Error(response.data.error);
        const { numbers } = response.data;
        setUserName(numbers.name);
        setTotalIncome(parseFloat(numbers.income_amount));
        setTotalExpenses(parseFloat(numbers.expense_amount));

        getSaving();
      } catch (error) {
        message.error(error.message);
      }
    };
    getNumbers();
  }, [totalIncome, totalExpenses]);

  const setSavingCarousel = (saving) => {
    const temp = [];

    for (let i = 0; i < saving.length; i++) {
      const goal = {
        name: saving[i].name,
        savingsPercentage: (
          ((totalIncome - totalExpenses) / parseFloat(saving[i].targetAmount)) *
          100
        ).toFixed(0),
        isGoalAchieved:
          totalIncome - totalExpenses >= saving[i].targetAmount &&
          Math.ceil(
            (new Date(saving[i].deadline) - new Date()) / (1000 * 60 * 60 * 24)
          ) >= 0,
        targetAmount: parseFloat(saving[i].targetAmount),
        totalSavedAmount:
          totalIncome - totalExpenses >= 0 ? totalIncome - totalExpenses : 0,
        remainingDays: Math.ceil(
          (new Date(saving[i].deadline) - new Date()) / (1000 * 60 * 60 * 24)
        ),
      };
      temp.push(goal);
    }
    console.log(temp);
    setSavingGoals(temp);
  };

  const [savingGoals, setSavingGoals] = useState(null);
  const getSaving = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/user/get-saving/${id}`
      );
      console.log(response.data);
      if (response.data.error) throw new Error(response.data.error);
      const { saving } = response.data;
      setSavingCarousel(saving);
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    const getNumbersMonth = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/user/get-numbers-month/${id}`
        );

        if (response.data.error) throw new Error(response.data.error);
        const { numbers } = response.data;
        setUserName(numbers.name);
        setTotalIncomeMonth(parseFloat(numbers.income_amount));
        setTotalExpensesMonth(parseFloat(numbers.expense_amount));
      } catch (error) {
        message.error(error.message);
      }
    };
    getNumbersMonth();
  }, []);
  const incomePercentage = (totalIncome / (totalIncome + totalExpenses)) * 100;
  const expensesPercentage =
    (totalExpenses / (totalIncome + totalExpenses)) * 100;

  const { id } = useParams();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  if (savingGoals == null) return;
  return (
    <>
      <Navbar name={userName} selectedValue="1" />
      <div className="dashboard-container" style={{ marginTop: "15px" }}>
        <Divider
          orientation="center"
          style={{ color: "#1890ff", fontSize: "30px" }}
        >
          {monthNames[new Date().getMonth()]}, {new Date().getFullYear()}
        </Divider>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card
              className="dashboard-card"
              style={{ background: "#1890ff", color: "#ffffff" }}
            >
              <Statistic
                title="Current Balance"
                value={totalIncomeMonth}
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
                value={totalIncomeMonth}
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
                value={totalExpensesMonth}
                prefix={<ArrowDownOutlined style={{ fontSize: "24px" }} />}
                valueStyle={{ fontSize: "24px" }}
                titleStyle={{ fontWeight: "bold" }}
              />
            </Card>
          </Col>
        </Row>
        <Divider orientation="center" style={{ color: "#1890ff" }}>
          All Time
        </Divider>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card
              className="dashboard-card"
              style={{ background: "#1890ff", color: "#ffffff" }}
            >
              <Statistic
                title="Current Balance"
                value={totalIncome}
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
                value={totalIncome - totalExpenses}
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
      <Carousel
        autoplay
              dotPosition="bottom" 
        autoplaySpeed={3000}
        style={{ backgroundColor:'white', borderRadius:'10px', paddingLeft: '10px', paddingBottom:'8px' }}
      >
        {savingGoals &&
          savingGoals.map((goal, index) => (
            <div key={index} style={{ height: '100%' }}>
              {/* <Card className="dashboard-card"> */}
                <h3>Saving Goal Progress</h3>
                <h4>{goal.name}</h4>
                <Progress
                  percent={goal.savingsPercentage}
                  status={goal.savingsPercentage >= 100 ? 'success' : 'normal'}
                  strokeWidth={20}
                />
                <p>
                  {goal.isGoalAchieved ? (
                    "Congratulations! You've achieved your saving goal."
                  ) : (
                    <>
                      You're making progress towards your saving goal. <br />
                      You need to save{' '}
                      <Statistic
                        value={goal.targetAmount - goal.totalSavedAmount}
                        prefix={<DollarOutlined style={{ fontSize: '13px' }} />}
                        valueStyle={{ fontSize: '13px' }}
                      />{' '}
                      more to achieve your goal by the deadline. <br />
                      You have {goal.remainingDays} days left until the deadline.
                    </>
                  )}
                </p>
              {/* </Card> */}
            </div>
          ))}
      </Carousel>
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
        <Divider orientation="center" style={{ color: "#1890ff" }}>
          Expenses History
        </Divider>
        <Row gutter={[16, 16]} justify="center">
          <Col span={24}>
            <ExpenseTable />
          </Col>
        </Row>
        <Divider orientation="center" style={{ color: "#1890ff" }}>
          Savings History
        </Divider>
        <Row gutter={[16, 16]} justify="center">
          <Col span={24}>
            <SavingTable />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
