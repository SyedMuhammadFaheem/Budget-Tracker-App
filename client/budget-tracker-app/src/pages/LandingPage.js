import React from 'react';
import { Typography, Button, Row, Col, Card } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import cover from '../images/cover-photo.jpg'

const { Title, Paragraph } = Typography;

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="hero-section">
        <Row justify="center" align="middle">
          <Col xs={24} md={12}>
            <img src={cover} alt="Budget Tracker" className="hero-image" height="400px" width="700px" />
          </Col>
          <Col xs={24} md={12}>
            <div className="hero-content">
              <Title level={1}>Track Your Budget Effortlessly</Title>
              <Paragraph>
                Simplify your financial management with our intuitive budget tracker app.
              </Paragraph>
              <Button type="primary" size="large" shape="round" icon={<ArrowRightOutlined />} href="/user/signup">
                Get Started
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <div className="features-section">
        <Title level={2} className="section-title">Key Features</Title>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card title="Expense Tracking" className="feature-card">
              Easily track your expenses and stay within your budget.
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card title="Income Management" className="feature-card">
              Efficiently manage your income sources and plan for the future.
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card title="Goal Setting" className="feature-card">
              Set savings goals and track your progress over time.
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card title="Custom Reports" className="feature-card">
              Generate insightful reports to analyze your financial habits.
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LandingPage;
