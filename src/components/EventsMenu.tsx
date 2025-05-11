import { Menu, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../icons/icon";

const iconContainerStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
};

const iconStyle = {
  paddingRight: "15px",
  margin: '15px'
};

interface EventsMenuProps {
  selectedKey: string;
  onSelect: (key: string) => void;
}

const EventsMenu: React.FC<EventsMenuProps> = ({ selectedKey, onSelect }) => {
  const navigate = useNavigate();

  const handleMenuClick = (key: string) => {
    onSelect(key);
    navigate(`/events?section=${key}`, { replace: true });
  };

  return (
    <> <Row
      style={{
        width: "100%",
        borderBottom: "1px solid black"
      }}
    >
      <Menu
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minWidth: "300px",
          backgroundColor: "rgb(255, 255, 255, 0)",
        }}
        mode="horizontal"
        selectedKeys={[selectedKey]}
        onClick={({ key }) => handleMenuClick(key)}
        items={[
          {
            key: 'about',
            label: 'About',
            style: { fontSize: "20px", fontWeight: 600 }
          },
          {
            key: 'weddings',
            label: 'Weddings',
            style: { fontSize: "20px", fontWeight: 600 }
          },
          {
            key: 'specs',
            label: 'Specs',
            style: { fontSize: "20px", fontWeight: 600 }
          },
        ]}
      />
    </Row>
      <div style={iconContainerStyle}>
        <div
          onClick={() => navigate('/events?section=about')}
          style={iconStyle}
        >
          <Icon maxWidth={75} />
        </div>
      </div>
    </>
  );
};

export default EventsMenu; 