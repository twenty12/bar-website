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
              <Menu.Item key="artists">
                <Link to="/artists">Artists</Link>
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
            backgroundColor: theme.token.headerColor,
            borderBottom: `1px ${theme.token.colorPrimary} solid`,
          }}
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          className="desktop-menu"
        >
          <Menu.Item key="artists" style={{ fontSize: "16px" }}>
            <Link to="/artists">Artists</Link>
          </Menu.Item>
          <Menu.Item key="collections" style={{ fontSize: "16px" }}>
            <Link to="/collections">Collections</Link>
          </Menu.Item>
          <Menu.Item key="about" style={{ fontSize: "16px" }}>
            <Link to="/about">About</Link>
          </Menu.Item>
        </Menu>
      )}
    </>
  );
};

export default AppMenu;
