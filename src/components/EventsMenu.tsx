import { Menu, Row } from "antd";
import { Link } from "react-router-dom";

interface EventsMenuProps {
  selectedKey: string;
  onSelect: (key: string) => void;
}

const EventsMenu = ({ selectedKey, onSelect }: EventsMenuProps) => {
    return (
        <Row
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
                onClick={({ key }) => onSelect(key)}
            >
                <Menu.Item key="about" style={{ fontSize: "20px", fontWeight: 600 }}>
                    About
                </Menu.Item>
                <Menu.Item key="weddings" style={{ fontSize: "20px", fontWeight: 600 }}>
                    Weddings
                </Menu.Item>
                <Menu.Item key="specs" style={{ fontSize: "20px", fontWeight: 600 }}>
                   Specs
                </Menu.Item>
            </Menu>
        </Row>
    );
};

export default EventsMenu; 