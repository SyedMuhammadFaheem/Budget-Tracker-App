import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout, Menu, Avatar } from "antd";
import { HomeOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import avatar from "../images/avatar.jpg";
import Cookies from "js-cookie";
const { Header } = Layout;

const Navbar = ({selectedValue}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const logOut = () => {
    Cookies.remove("user");
    navigate("/user/login");
  };
  const editProfile = (e) => {
    if (e.key === "2") navigate(`/user/edit-user-profile/${id}`);
    else navigate(`/user/dashboard/${id}`);
  };
  

  const user = {
    name: "Muhammad Faheem",
    avatarUrl: avatar, 
  };

  return (
    <Header className="header">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[selectedValue]}
        style={{ float: "left" }}
        onClick={editProfile}
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          Home
        </Menu.Item>

        <Menu.Item key="2" icon={<UserOutlined />}>
          Profile
        </Menu.Item>
      </Menu>
      <div
        style={{
          float: "right",
          marginRight: "24px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar src={user.avatarUrl} style={{ marginRight: "16px" }} />
        <span style={{ color: "#fff", marginRight: "16px" }}>{user.name}</span>
        <LogoutOutlined
          style={{ fontSize: "20px", color: "#fff", cursor: "pointer" }}
          onClick={logOut}
        />
      </div>
    </Header>
  );
};

export default Navbar;
