import { useState } from "react";
import { Drawer, Menu, Button, Grid } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

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
              <Menu.Item key="home" >
                <Link onClick={() => setIsDrawerVisible(false)} to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="calander">
                <Link   onClick={() => setIsDrawerVisible(false)} to="/calendar">Calendar</Link>
              </Menu.Item>
              <Menu.Item key="menu">
                <Link  onClick={() => setIsDrawerVisible(false)} to="/menu">Menu</Link>
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
            minWidth: "300px",
            backgroundColor: "rgb(255, 255, 255, 0)",
          }}
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          className="desktop-menu"
        >
          <Menu.Item key="calender" style={{ fontSize: "18px" }}>
            <Link to="/calendar">Calender</Link>
          </Menu.Item>
          <Menu.Item key="menu" style={{ fontSize: "18px" }}>
            <Link to="/menu">Menu</Link>
          </Menu.Item>
          <Menu.Item key="events" style={{ fontSize: "18px" }}>
            <Link to="/events">Contact</Link>
          </Menu.Item>
        </Menu>
      )}
    </>
  );
};

export default AppMenu;
