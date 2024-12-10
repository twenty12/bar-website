import { useState } from "react";
import { Drawer, Menu, Button, Grid } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import theme from "../theme.json";

const { useBreakpoint } = Grid;

const AppMenu = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const screens = useBreakpoint();
  const isBelowMd = !screens.md;

  return (
    <>
      {isBelowMd ? (
        <>
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setIsDrawerVisible(true)}
            style={{ fontSize: "20px" }}
          />
          <Drawer
            placement="right"
            onClose={() => setIsDrawerVisible(false)}
            open={isDrawerVisible}
          >
            <Menu mode="vertical" style={{ border: "none" }}>
              <Menu.Item key="home">
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="calander">
                <Link to="/calendar">Calendar</Link>
              </Menu.Item>
              <Menu.Item key="collections">
                <Link to="/collections">Collections</Link>
              </Menu.Item>
              <Menu.Item key="about">
                <Link to="/about">About</Link>
              </Menu.Item>
            </Menu>
          </Drawer>
        </>
      ) : (
        <Menu
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minWidth: "250px",
            backgroundColor: "rgb(255, 255, 255, .01)",
            borderBottom: `1px ${theme.token.colorPrimary} solid`,
          }}
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          className="desktop-menu"
        >
          <Menu.Item key="calander" style={{ fontSize: "16px" }}>
            <Link to="/calander">Calender</Link>
          </Menu.Item>
          <Menu.Item key="menu" style={{ fontSize: "16px" }}>
            <Link to="/menu">Menu</Link>
          </Menu.Item>
          <Menu.Item key="bookings" style={{ fontSize: "16px" }}>
            <Link to="/bookinsg">Private Events</Link>
          </Menu.Item>
        </Menu>
      )}
    </>
  );
};

export default AppMenu;
