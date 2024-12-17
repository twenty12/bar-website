import React, { useState } from "react";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import logo_black from "../assets/images/logo_black.png";

const { Title } = Typography;

const Links: React.FC = () => {
  const data: any = [
    {
      text: "Calendar",
      link: "/calendar",
    }, 
    {
      text: "Private Events",
      link: "/events",
    },
    {
      text: "Menu",
      link: "/menu",
    }

  ];

  const navigate = useNavigate(); // React Router's navigation hook

  const baseButtonStyle = {
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    fontSize: "18px",
    margin: "15px",
    border: "1px solid black",
    borderRadius: "4px",
    padding: "18px",
    background: "rgba(255, 255, 255, 0.8)",
    transition: "background 0.3s ease",
  };

  return (
    <div
      className="shifting-gradient"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100vh",
        width: "100vw",
        paddingTop: "20px",
      }}
    >
      <img
        src={logo_black}
        alt="Logo"
        style={{
          width: "200px",
          marginBottom: "20px",
        }}
      />
      {data.map((item: any) => {
        const [isHovered, setIsHovered] = useState(false);

        return (
          <div
            key={item.text}
            onClick={() => navigate(item.link)} // Navigate to the specified link
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              ...baseButtonStyle,
              cursor: "pointer",
              background: isHovered ? "white" : baseButtonStyle.background,
            }}
          >
            {item.text}
          </div>
        );
      })}
    </div>
  );
};

export default Links;