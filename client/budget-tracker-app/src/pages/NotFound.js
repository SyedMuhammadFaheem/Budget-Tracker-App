import React from 'react';
import { Result, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { SmileOutlined } from '@ant-design/icons';

const { Title } = Typography;

const NotFound = () => {
  return (
    <Result
      status="404"
      title={
        <Title level={2}>Oops! Page not found</Title>
      }
      subTitle="Sorry, the page you are looking for does not exist."
      extra={
        <Button type="primary">
          <Link to="/">Back to Home</Link>
        </Button>
      }
      icon={<SmileOutlined style={{ fontSize: 48, color: '#1890ff' }} />}
    />
  );
};

export default NotFound;
